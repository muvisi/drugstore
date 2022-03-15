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



  updateUapOutpatient(data){
    return this.http.post(endpoint+"api/uapoutpatientform/",data).pipe(map((res)=>{return res}))
  }
  getUapOutpatient(no){
    return this.http.get(endpoint+"api/uapoutpatientform-details/"+no+"/").pipe(map((res)=>{return res}))
  }
  signatureUapOutpatient(data){
    return this.http.post(endpoint+"api/uapoutpatientform-signature/",data).pipe(map((res)=>{return res}))
  }



 
  updateMinetOutpatient(data){
    return this.http.post(endpoint+"api/minetoutpatientform/",data).pipe(map((res)=>{return res}))
  }
  getMinetOutpatient(no){
    return this.http.get(endpoint+"api/minetoutpatientform-details/"+no+"/").pipe(map((res)=>{return res}))
  }
  signatureMinetOutpatient(data){
    return this.http.post(endpoint+"api/minetoutpatientform-signature/",data).pipe(map((res)=>{return res}))
  }



  updateFirstInsurance(data){
    return this.http.post(endpoint+"api/firstassurancepatientform/",data).pipe(map((res)=>{return res}))
  }
  getFirstInsurance(no){
    return this.http.get(endpoint+"api/firstassurancepatientform-details/"+no+"/").pipe(map((res)=>{return res}))
  }
  signatureFirstInsurance(data){
    return this.http.post(endpoint+"api/firstassurancepatientform-signature/",data).pipe(map((res)=>{return res}))
  }


  updateApaInsurance(data){
    return this.http.post(endpoint+"api/apaform/",data).pipe(map((res)=>{return res}))
  }
  getApaInsurance(no){
    return this.http.get(endpoint+"api/apaform-details/"+no+"/").pipe(map((res)=>{return res}))
  }
  signatureApaInsurance(data){
    return this.http.post(endpoint+"api/apaform-signature/",data).pipe(map((res)=>{return res}))
  }



  updateHeritageInsurance(data){
    return this.http.post(endpoint+"api/heritage/",data).pipe(map((res)=>{return res}))
  }
  getHeritageInsurance(no){
    return this.http.get(endpoint+"api/heritage-details/"+no+"/").pipe(map((res)=>{return res}))
  }
  signatureHeritageInsurance(data){
    return this.http.post(endpoint+"api/heritage-signature/",data).pipe(map((res)=>{return res}))
  }
}