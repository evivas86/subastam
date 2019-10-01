import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from "@angular/material/dialog";

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {

  style: number;
  title: string;
  message: string;
  information: string;
  button: number;
  allow_outside_click: boolean;
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
    this.style = data.style || 0;
    this.title = data.title;
    this.message = data.message;
    this.information = data.information;
    this.button = data.button;
    this.dialogRef.disableClose = !data.allow_outside_click || false;
    
  }
  onOk() {
    this.dialogRef.close({result: "ok"});
  }
  onCancel() {
    this.dialogRef.close({result: "cancel"});
  }
  onYes() {
    this.dialogRef.close({result: "yes"});
  }
  onNo() {
    this.dialogRef.close({result: "no"});
  }
  onAccept() {
    this.dialogRef.close({result: "accept"});
  }
  onReject() {
    this.dialogRef.close({result: "reject"});
  }


}
