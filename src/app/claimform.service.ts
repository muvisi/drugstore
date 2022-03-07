import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpBackend } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

import { endpoint } from './service.service';
import { dataReady } from '@syncfusion/ej2-schedule';
@Injectable({
  providedIn: 'root'
})
export class ClaimformService {
  constructor(private http: HttpClient,public backend: HttpBackend) {}
  updateAARForm(data){
    return this.http.post(endpoint+"api/aarform/",data).pipe(map((res)=>{return res}))
  }
  getAARForm(no){
    return this.http.get(endpoint+"api/aarform-details/"+no+"/").pipe(map((res)=>{return res}))
  }
  signatureAARForm(data){
    return this.http.post(endpoint+"api/aarform-signature/",data).pipe(map((res)=>{return res}))
  }

}