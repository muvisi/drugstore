


import {Component, Inject,OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
// import { ServiceService } from 'src/app/services/service.service';
import { interval, Subscription } from 'rxjs';
import { ElementFinder } from 'protractor';
import { ServiceService } from '../../service.service';


export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-maternityupgrade-modal',
  templateUrl: './maternityupgrade-modal.component.html',
  styleUrls: ['./maternityupgrade-modal.component.scss']
})
export class MaternityupgradeModalComponent implements OnInit {
  packagetype: string;
  id: string;
  loading;
  PAYMENT_AMOUNT=1;
  request_count;
  PAYMENT_CODE;
  transaction_code: any;
  payer_name;
  payment_amount;
  mpesa_paid: boolean;
  paid: boolean;
  transaction_date: any;
  payer_phone: any;
  verify_payment_show: boolean;
  constructor(
    public dialogRef: MatDialogRef<MaternityupgradeModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {package_type:string,id:string},public service : ServiceService,public toast:ToastrService
  ) {
    this.packagetype=this.data.package_type;
    this.id=this.data.id;
  }

  ngOnInit() {
    this.payment_amount=5000;
  }
  cancelPayment(): void {
    this.dialogRef.close({event:"CANCEL"});
  }

  
  close(){
    this.dialogRef.close({event:"PAY",data:{transaction_code:this.transaction_code}});
  }


sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async check_paid(phone,amount,count){
  this.sleep(2000);
  if(count>=100){
    this.loading=false;
    this.toast.error("Payment Failed"); 
    this.mpesa_paid=false;;
      return;
  }
 this.service.mpesaPayment(phone).subscribe((res)=>{
    
    for(var i=0;i<res.length;i++){
      if(amount==res[i].Amount){
        this.loading=false;
        this.mpesa_paid=true;
        this.verify_payment_show=false
        this.transaction_code=res[i].MpesaReceiptNumber
        this.payment_amount=res[i].Amount
        this.payer_name=res[i].Name
        this.payer_phone=phone;
        this.transaction_date=res[i].TransactionDate
        
        count=11;
       return;
      }
    }


     
    this.check_paid(phone,amount,count+1);
    
    },(err)=>{
      this.mpesa_paid=false;
      this.loading=false;
      console.log(err);
      this.toast.error(err.error.message);       
    });
  }

  



  UpgradeRoomPrivate(){

  let data={
    id:this.id,
    package:this.packagetype,
   
  }
  console.log("dialog-data",data)
  this.service.UpgradeRoomPackage(data).subscribe(res=>{
    this.toast.success("Successfully Upgraded Room package");
    this.dialogRef.close()
    
  },err=>{
    this.toast.success("Failed to upgrade Room package");
  })
  
}
}

