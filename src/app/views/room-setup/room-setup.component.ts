import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from '../../service.service';

@Component({
  selector: 'app-room-setup',
  templateUrl: './room-setup.component.html',
  styleUrls: ['./room-setup.component.scss']
})
export class RoomSetupComponent implements OnInit {
  AditionalDataForm:FormGroup;

  constructor(private formBuilder:FormBuilder,private route: ActivatedRoute, private service:ServiceService,private toast:ToastrService) { }


  ngOnInit() {
    this.AditionalDataForm = this.formBuilder.group({
      room_block: ['',Validators.required],
      room_number: ['',Validators.required],
      room_price: ['',Validators.required],
      room_package:['',Validators.required],
      // boarding_package:['',Validators.required],
     
  });
  }
SetUpRoom(){
  // let data=Object.assign(this.AditionalDataForm.value)
let data={
  date:"09/09/34"
}
  console.log(this.AditionalDataForm.value)
  this.service.setuprooms(this.AditionalDataForm.value).subscribe(
    res => {
      this.toast.success('success','Room Created Successfully ')
      this.AditionalDataForm.reset()
      console.log('data',res)
      
     
          
    
      
    },
   
   
  );



}

}
