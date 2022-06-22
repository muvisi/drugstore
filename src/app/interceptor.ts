import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
@Injectable({
    providedIn: 'root'
  })
export class TokenInterceptor implements HttpInterceptor {
  constructor() {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token: string = sessionStorage.getItem('Token');
    if(request.url.toString().indexOf("booking.healthixsolutions.com/payment")>-1){
      request = request.clone({ headers: request.headers.set('Authorization','Basic ' + btoa('healthix.admin@gmail.com:admin')) });
    }
    else if (token) {
        request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
    }

    if (!request.headers.has('Content-Type')) {
        request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
    }

    request = request.clone({ headers: request.headers.set('Accept', 'application/json') });

    return next.handle(request).pipe(
        map((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
                // console.log('event--->>>', event);
            }
            return event;
        }));
}
}
