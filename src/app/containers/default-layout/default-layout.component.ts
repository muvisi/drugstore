import { Component, OnDestroy, Inject, ViewChild } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { navItems } from '../../_nav';
import {  docNavItems } from '../../_doctor';
import {  insuranceItems } from '../../_insurance';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from '../../service.service';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnDestroy {
  public navItems = navItems;
  public docNavItems = docNavItems;
  public insuranceItems = insuranceItems;
  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement;
  data: any ={};
  user = JSON.parse(sessionStorage.getItem('user'));
  @ViewChild('staticModal', { static: false }) staticModal: ModalDirective;
  constructor(private router: Router,public service:ServiceService,public toastr: ToastrService,@Inject(DOCUMENT) _document?: any) {

    this.changes = new MutationObserver((mutations) => {
      this.sidebarMinimized = _document.body.classList.contains('sidebar-minimized');
    });
    this.element = _document.body;
    this.changes.observe(<Element>this.element, {
      attributes: true,
      attributeFilter: ['class']
    });
  }
  logout() {
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigateByUrl('login');
    // location.href = '/login';
    console.clear();
    console.log('logged out');
  }
  submit(){
    if(this.data.password1 != this.data.password2 ){
      this.toastr.error("New Password Didn't Match");
      return;
    }
    this.service.changePassword(this.data).subscribe((res)=>{
      this.toastr.success("Successfully changed password");
      this.staticModal.hide();
      this.data ={};
    },()=>{
      this.toastr.error("Password Change Failed");
    });
  }

  ngOnDestroy(): void {
    this.changes.disconnect();
  }
}
