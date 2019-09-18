import { Injectable } from '@angular/core';
import { CanActivate} from '@angular/router';
import { Observable } from 'rxjs';
import { ServiceService } from './service.service';

@Injectable()
// export class AuthGuard implements CanActivate, CanActivateChild, CanLoad
export class AuthGuard implements CanActivate {
  constructor(private service: ServiceService) {}
  canActivate() {
    console.log('AlwaysAuthGuard');
    // return false;
    if (this.service.isAuthenticated()) {
      return true;
    } else {
      window.alert('You dont have permission to view this page');
      return false;
    }
  }
  // canActivateChild(
  //   next: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   return true;
  // }
  // canLoad(
  //   route: Route,
  //   segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
  //   return true;
  // }
}
