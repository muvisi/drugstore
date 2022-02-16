import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from '../../../service.service';

@Component({
  selector: 'app-registration-link',
  templateUrl: './registration-link.component.html',
  styleUrls: ['./registration-link.component.scss']
})
export class RegistrationLinkComponent implements OnInit {
  patientMobileForm: FormGroup;
  loading;
  constructor(private formBuilder: FormBuilder,private service:ServiceService,private toast: ToastrService) {
  
   }

  ngOnInit() {
    this.patientMobileForm=this.formBuilder.group({
      phone:[''],
    })
  }
  submitPhone(){
    this.loading=true;
    this.service.getRegistrationLink(this.patientMobileForm.value).subscribe((res)=>{
      this.loading=false
      if(res.status){
        this.toast.success("Successfully sent");
      }else{
        this.toast.warning("System error")
      }
    },(err)=>{
      this.loading=false;
      this.toast.warning("Network error")
    })

  }

}
