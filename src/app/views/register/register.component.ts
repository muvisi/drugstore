import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { data } from 'jquery';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from '../../service.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: 'register.component.html'
})
export class RegisterComponent {
  // form: FormGroup;
  data: any = {};
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private service:ServiceService,
    private toastr: ToastrService
    // private accountService: AccountService,
    // private alertService: AlertService
) { }
ngOnInit() {
  // this.form = this.formBuilder.group({
  //     email: ['', Validators.required],
  //     role: ['', Validators.required],
  //     password1: ['', Validators.required, Validators.minLength(6)],
  //     password2: ['', [Validators.required, Validators.minLength(6)]]
  // });
}
  // convenience getter for easy access to form fields
  // get f() { return this.form.controls; }

RegisterClient(){

  // let pass=this.data.password1
  // var pass2=this.data.password2
  console.log("THIS IS DATA",this.data)
  if(this.data.password1 !=this.data.password2){
    this.toastr.warning("Sorry","Check Password does not match!")


  }
  this.service.registerpatient(this.data).subscribe(
    res => {
      this.toastr.success('success','Room Created Successfully ')
      this.router.navigateByUrl('login');
    }, (err) => {
      console.log(err);
      this.loading = false;
      // sessionStorage.removeItem('Token');     
      
      this.toastr.error('user already Exist');
      });
}

}
