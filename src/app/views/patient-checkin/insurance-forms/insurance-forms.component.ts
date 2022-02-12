import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { endpoint, ServiceService } from '../../../service.service';
import { SignatureService } from '../../../signature.service';
@Component({
  selector: 'app-insurance-forms',
  templateUrl: './insurance-forms.component.html',
  styleUrls: ['./insurance-forms.component.scss']
})
export class InsuranceFormsComponent implements OnInit {
  patient:any={}
  hospital='AAR HOSPITAL'
  image_src;
  show_signature_patient=false;
  constructor(private route: ActivatedRoute,public service:ServiceService,private signatureService: SignatureService) { }

  ngOnInit() {
    this.signatureService.api.subscribe((res)=>{
      console.log(res);
      this.image_src=this.service.getSignatureUrl()+res;
      this.show_signature_patient=true;
    },
    (err) => {
      console.log("ws",err);
    }
    );
    this.service.getInsurance(this.route.snapshot.params.id).subscribe((res)=>{
      console.log(res);
      this.patient = res;
    })
  }

  printPage() {
    window.print();
  }

  signatureClicked(){

  }
}
