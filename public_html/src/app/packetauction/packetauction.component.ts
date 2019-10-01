import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Packetdetail } from '../interfaces/packetdetail';
import { PacketdetailService } from '../services/packetdetail.service';
import { PacketdetailComponent } from './packetdetail/packetdetail.component';
import { PacketAuction } from '../interfaces/packet-auction';
import { PacketAuctionService } from '../services/packet-auction.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-packetauction',
  templateUrl: './packetauction.component.html',
  styleUrls: ['./packetauction.component.css']
})
export class packetAuctionComponent implements OnInit {
  PacketAuctions : any;
  data : any;

  PacketAuction:PacketAuction = {
    title: null,
    quantity: null,
    min: null,
    max: null,
    prize_id: null,
    user_id: null,
    start_date: null,
    end_date: null
  };

  constructor(private PacketAuctionService: PacketAuctionService, private PacketdetailService: PacketdetailService, public dialog: MatDialog, public router: Router) { 
  }

  ngOnInit() {
    this.PacketAuctionService.getAll().subscribe((data) => {
      console.log(data);
      this.PacketAuctions = data;
    }, (error) =>{
      console.log(error);
    });
  }

  showDetail(id: number) {
    /*const dialogRef = this.dialog.open(PacketdetailComponent, {  
      width: '55%',      
      data: {
            id: id
      }});
    return dialogRef.afterClosed();*/
    this.router.navigate(['/packetdetail', id]);
  }

}
