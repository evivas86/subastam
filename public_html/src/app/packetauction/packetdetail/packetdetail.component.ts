import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from "@angular/material/dialog";
import { PacketdetailService } from '../../services/packetdetail.service';
import { DialogComponent } from '../../dialog/dialog.component';
import { MessageBox, MessageBoxButton, MessageBoxStyle } from "../../_shared/message-box";
import { MessageService } from "../../_shared/message.service";
import { map, filter } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Router,NavigationStart  } from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import {DOCUMENT} from '@angular/platform-browser';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';

export interface Transaction {
  item: string;
  cost: number;
}

declare let paypal: any;

@Component({
  selector: 'app-packetdetail',
  templateUrl: './packetdetail.component.html',
  styleUrls: ['./packetdetail.component.css']
})
export class PacketdetailComponent implements OnInit {

  getid: string;
  id:number;
  PacketDetails: any;
  AuctionDetails: any;
  auctionBg: any;
  packetToggleGroup:any;
  group: any;
  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  StepOne = true;
  StepTwo = false;
  StepThree = false;
  StepFour = false;
  packetCost : any;
  packetGroupLen : any;
  totalPrice : any;
  packetsimbol : any;
  packetObj: any;

  displayedColumns: string[] = ['item', 'cost'];
  transactions: Transaction[] = [
    {item: 'Beach ball', cost: 4},
  ];

  addScript: boolean = false;
  paypalLoad: boolean = true;
  

  paypalConfig: any;

  public payPalConfig?: IPayPalConfig;
  showSuccess: any;

  selectedPayMethod: string;
  payMethod: string[] = ['Paypal', 'Vippo', 'Zelle'];

  TheStepper : any;
  

  private state$: Observable<object>;

  constructor(/*public dialogRef: MatDialogRef<PacketdetailComponent>, @Inject(MAT_DIALOG_DATA) public data: any,*/@Inject(DOCUMENT) private document: Document,private _formBuilder: FormBuilder, public activatedRoute: ActivatedRoute, private PacketdetailService: PacketdetailService, private messageService: MessageService,public dialog: MatDialog, public router: Router) {
    //this.id = data.id;
    
   }

  ngOnInit() {

    /*this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });*/

    this.initConfig();

    this.getid = this.activatedRoute.snapshot.paramMap.get('id');
    this.id = +this.getid;
 
    this.PacketdetailService.getDeatilbyId(this.id).subscribe((data) => {
      this.PacketDetails = data['packetObj'];
      this.AuctionDetails = data['auctionObj'][0];
      let serverurl = document.location.protocol +'//'+ document.location.hostname + ':4200';
      this.auctionBg = 'background-image: url("' + serverurl + '/' + this.AuctionDetails.type_img + '"); background-size: cover;';
      console.log(this.auctionBg);
    }, (error) =>{
      console.log(error);
    });


   
    /*this.paypalConfig = {
      env: 'sandbox',
      client: {
        sandbox: 'AcGVvWJb8SiZm2LWsvt7NxPW3cpAS8HdFyu6UqO9D7id7QiNYPMnipXt5Y6bqlPMK29E5353EVXaxkM_',
        production: '<your-production-key here>'
      },
      commit: true,
      payment: (data, actions) => {
        return actions.payment.create({
          payment: {
            transactions: [
              { amount: { total: this.totalPrice, currency: 'USD' } }
            ]
          }
        });
      },
      onAuthorize: (data, actions) => {
        return actions.payment.execute().then((payment) => {
          //Do something when payment is successful.
          console.log('payment');
          console.log(payment);
          console.log('data');
          console.log(data);
        })
      }
    };*/
  }

  onNoClick(): void {
    //this.dialogRef.close();
  }

  validateNext(groupValue, stepper: MatStepper) {
    if(groupValue.length > 0){
      this.show(this.dialog,"¿Esta seguro de su selección?",'','',2).subscribe((data) => {
        if(data.result == 'yes'){
          this.packetCost = this.AuctionDetails.packet_cost;
          this.packetsimbol = this.AuctionDetails.simbol;
          this.packetGroupLen = groupValue.length;
          this.packetObj = groupValue
          this.StepOne = false;
          this.StepTwo = true;

          this.transactions = [
            {item: this.packetGroupLen, cost: this.packetCost},
          ];
          stepper.next();
        }
      });
    }else{
      this.show(this.dialog,"Por favor seleccione al menos un sobre para continuar");
    }
  }

  backtoPacketAuction(){
    this.router.navigate(['/packetauction']);
   }

  getBackS1(stepper: MatStepper){
    stepper.previous();
    this.packetCost = null;
    this.packetGroupLen = null;
    this.totalPrice = null;
    this.StepOne = true;
    this.StepTwo = false;
  }
  getBackS2(stepper: MatStepper){
    stepper.previous();
    this.StepOne = false;
    this.StepTwo = true;
    this.StepThree = false;
  }

  buyPacket(groupValue) {
    if(groupValue.length > 0){
      this.PacketdetailService.buyPacket(groupValue).subscribe((data) => {
        this.show(this.dialog,data);
      }, (error) =>{
        console.log(error);
      });
    }else{
      this.show(this.dialog,"Por favor seleccione un Sobre para continuar");
    }
  }

  show(dialog: MatDialog, message, title = "", information = "", button = 0, allow_outside_click = false, style = 0, width = "350px") {
    const dialogRef = dialog.open( DialogComponent, {        
      data: {
        title: title || "",
        message: message,
        information: information,
        button: button || 0,
        style: style || 0,
        allow_outside_click: allow_outside_click || false
      },
      width: width
    });   
    return dialogRef.afterClosed();     
  }

  getTotalCost() {
    return this.totalPrice = this.packetCost * this.packetGroupLen;
  }

  confirmBuy(stepper: MatStepper) {
    //Aqui debo bloquear los sobres que selecciono el usuario para que no sea comprado por otra persona por un tiempo finito
    stepper.next();
    this.StepOne = false;
    this.StepTwo = false;
    this.StepThree = true;
    this.TheStepper = stepper;
    
  }

  finish(){
    this.router.navigate(['/packetauction']);
  }

  /*ngAfterViewChecked(): void {
    if (!this.addScript) {
      this.addPaypalScript().then(() => {
        paypal.Button.render(this.paypalConfig, '#paypal-checkout-btn');
        this.paypalLoad = false;
      })
    }
  }*/
  
  /*addPaypalScript() {
    this.addScript = true;
    return new Promise((resolve, reject) => {
      let scripttagElement = document.createElement('script');    
      scripttagElement.src = 'https://www.paypalobjects.com/api/checkout.js';
      scripttagElement.onload = resolve;
      document.body.appendChild(scripttagElement);
    })
  }*/

  private initConfig(): void {
    this.payPalConfig = {
    currency: 'USD',
    clientId: 'sb',
    createOrderOnClient: (data) => <ICreateOrderRequest>{
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'USD',
            value: this.totalPrice,
            breakdown: {
              item_total: {
                currency_code: 'USD',
                value: this.totalPrice
              }
            }
          },
          items: [
            {
              name: 'Enterprise Subscription',
              quantity: '1',
              category: 'DIGITAL_GOODS',
              unit_amount: {
                currency_code: 'USD',
                value: this.totalPrice,
              },
            }
          ]
        }
      ]
    },
    advanced: {
      commit: 'true'
    },
    style: {
      label: 'paypal',
      layout: 'vertical'
    },
    onApprove: (data, actions) => {
      //console.log('onApprove - transaction was approved, but not authorized', data, actions);
      actions.order.get().then(details => {

        //asegun aqui es donde es exitoso el pago
        console.log('onApprove - you can get full order details inside onApprove: ', details);
        this.PacketdetailService.buyPacket(this.packetObj).subscribe((data) => {
          //this.show(this.dialog,data);
          this.TheStepper.next();
          this.StepOne = false;
          this.StepTwo = false;
          this.StepThree = false;
          this.StepFour = true;
        }, (error) =>{
          console.log(error);
        });
      });
    },
    onClientAuthorization: (data) => {
      //console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
      this.showSuccess = true;
    },
    onCancel: (data, actions) => {
      //console.log('OnCancel', data, actions);
    },
    onError: err => {
      console.log('OnError', err);
    },
    onClick: (data, actions) => {
      //console.log('onClick', data, actions);
    },
  };
  }

}
