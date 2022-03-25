
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../../service.service';
import { ToastrService } from 'ngx-toastr';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { CookieService } from  'ngx-cookie-service'
@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit  {
  data: any = {};
  loading;
  resetData:any={};
  @ViewChild('staticModal', { static: false }) staticModal: ModalDirective;
  constructor(private router: Router, private User: ServiceService,
  private toastr: ToastrService,private cookieService:CookieService) {
  }

  ngOnInit() {
  localStorage.clear();
  }
  login() {
      this.loading = true;
      localStorage.clear();
      this.cookieService.deleteAll();
      this.User.logIn(this.data).subscribe((res) => {
      sessionStorage.setItem('Token', res.token);
      sessionStorage.setItem('user', JSON.stringify(res));
      this.router.navigateByUrl('dashboard');
      this.loading = false;
      this.toastr.success('Login Success');
      }, (err) => {
      console.log(err);
      this.loading = false;
      sessionStorage.removeItem('Token');     
      
      this.toastr.error('Wrong Credentials');
      });
  }
  reset(){
    this.loading = true;
    // if(this.resetData.pass1!= this.resetData.pass2){
    //   this.toastr.error('Non matching password');
    // }
    this.User.userReset(this.resetData).subscribe((res)=>{
      this.loading = false;
      this.toastr.success('Password Reset Success,Kindly check Your Email');
      
      this.staticModal.hide();
    }, (err) => {
      console.log(err);
      this.loading = false;
         
      
      this.toastr.error('Wrong Email Address');
    })
  }
 }
