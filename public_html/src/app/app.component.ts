import {MediaMatcher} from '@angular/cdk/layout';
import { Subscription } from "rxjs";
import { ChangeDetectorRef, Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/loginservice.service';
import { ServerService } from 'src/app/services/server.service';
import {formatDate} from '@angular/common';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { MessageBox, MessageBoxButton, MessageBoxStyle } from "./_shared/message-box";
import { MessageService } from "./_shared/message.service";

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'subastamericana';
  public loading: boolean;

  mobileQuery: MediaQueryList;

  message;
  information;
  button;
  style;
  allow_outside_click;
  width;
  buttons = [
    {value: MessageBoxButton.Ok, display: "Ok"},
    {value: MessageBoxButton.OkCancel, display: "Ok/Cancel"},
    {value: MessageBoxButton.YesNo, display: "Yes/No"},
    {value: MessageBoxButton.AcceptReject, display: "Accept/Reject"},
  ];
  style_full = MessageBoxStyle.Full;
  style_simple = MessageBoxStyle.Simple;
  subscriber: Subscription;

  fillerNav = Array.from({length: 5}, (_, i) => `Nav Item ${i + 1}`);

  fillerContent = Array.from({length: 5}, () =>
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
       labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
       laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
       voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
       cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`);

  private _mobileQueryListener: () => void;

  animal: string;
  name: string;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private ServerService: ServerService, private LoginService: LoginService,
    private router:Router,
    public dialog: MatDialog,
    private messageService: MessageService
    ) {
      this.loading = false;
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.message ='Autocerrar sesión con servicio';
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  //shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));
  shouldRun = true;
  ngOnInit() {
  }

  checkUserLogin(){
    let userlogin = JSON.parse(localStorage.getItem('SubastAmUser'));
    if(localStorage.getItem('SubastAmUser')){
      let nowdate = formatDate(new Date(),'yyyy-MM-dd HH:mm:ss','en',userlogin.time_zone);
      if(nowdate > userlogin.expires_at){
        // lineas para autocerrado de sesiòn
        //this.onSendService();
        //this.show(this.dialog,'Inicie sesión nuevamente');
        //this.logOut();
        return false;
      }else{
        return true;
      }
    }else{
      return false;
    }
  }
  logOut(){

    this.LoginService.sendLogout().subscribe((data) => {
      console.log(data);
      localStorage.removeItem('SubastAmUser');
      this.router.navigate(["/"]);
    }, (error) =>{
      console.log(error);
    });

  }

  show(dialog: MatDialog, message, title = "Alert",                    
  information = "Sesión Expirada", button = 0, 
  allow_outside_click = false, 
  style = 0, width = "200px") {
const dialogRef = dialog.open( DialogComponent, {        
data: {
      title: title || "Alert",
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

  onShowClick() {
    this.width = (this.width !== undefined && this.width !== "px") ? this.width + "px" : "350px";
    MessageBox.show(this.dialog, this.message, this.title, this.information,
      this.button,this.allow_outside_click, this.style, this.width).subscribe( result => {
        const respone = (result === undefined) ? "none" : result.result;
        MessageBox.show(this.dialog, `User response : ${respone}`);
    });
    this.width = this.width.replace("px", "");
  }
  onSendService() {
    this.messageService.sendMessage(this.message);
  }

  /*token(){
    let subastamUser = localStorage.getItem('SubastAmUser');
    if(!subastamUser){
      this.router.navigate(['/login'],{queryParams:{urlRequest:this.state.url, mustLogin:true}});
    }
    let userJson = JSON.parse(subastamUser);
    return userJson["token_type"] + " " + userJson["access_token"];
  }*/

  /*openDialog(): void {
    const dialogRef = this.dialog.open(LoginDialogComponent, {});

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }*/
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog {

  constructor(
    //public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    //@Inject(MAT_DIALOG_DATA) public data: DialogData
    ) {}

  onNoClick(): void {
    //this.dialogRef.close();
  }

}
