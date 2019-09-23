// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { ServiceService } from '../../service.service';
// import { ToastrService } from 'ngx-toastr';
// @Component({
//   selector: 'app-dashboard',
//   templateUrl: 'login.component.html'
// })
// export class LoginComponent implements OnInit  {
//   Users: any = [];
//   data: any = {};
//   loading;
//   dat;
//   constructor(private router: Router, private service: ServiceService,
//   private toastr: ToastrService) {
//   }

//   ngOnInit() {
//   }
//   login() {
//     this.loading = true;
//     this.service.logIn(this.data).subscribe((res) => {
//      localStorage.setItem('Token', res.access);
//      localStorage.setItem('Refresh', res.refresh);

//     this.service.userDetails().subscribe((res1) => {
//       localStorage.setItem('username', res1.username);
//       localStorage.setItem('role', res1.role);
//     });
//       this.router.navigate(['dashboard']);
//       this.loading = false;
//       this.toastr.success('Login Success');
//     }, (err) => {
//       console.log(err);
//       this.loading = false;
//         localStorage.removeItem('Token');
//       this.toastr.error('Wrong Credentials');
//       });
//   }
//  }
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../../service.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit  {
  Users: any = [];
  data: any = {};
  loading;
  dat;
  constructor(private router: Router, private User: ServiceService,
  private toastr: ToastrService) {
  }

  ngOnInit() {
  localStorage.clear();
  }
  login() {
      this.loading = true;
      localStorage.clear();
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
 }
