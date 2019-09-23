import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse } from '@angular/common/http';
// import { Response } from '@angular/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
const endpoint = 'http://134.209.199.123/';
// const endpoint = 'http://localhost:8000/';
const token = sessionStorage.getItem('Token');
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'Bearer ' + token
  })
};
@Injectable({
  providedIn: 'root'
})

export class ServiceService {

  constructor(private http: HttpClient) {
  }
  private extractData(res) {
    const  body = res;
    console.log('service response', res);
    return body || { };
  }
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);

// tslint:disable-next-line: deprecation
      return of(result as T);
    };
  }
  public isAuthenticated(): boolean {
    // const token = localStorage.getItem('Token');
    // console.log('ssds', this.jwtHelper.isTokenExpired(token));
    // return !this.jwtHelper.isTokenExpired(token);
    return true;
  }

  getTreatments(): Observable<any> {
    return this.http.get(endpoint + 'patients/patient_treatments/').pipe(
      map(this.extractData));

  }

  getMembers(): Observable<any> {
    return this.http.get(endpoint + 'patients/patient_treatments/').pipe(
      map(this.extractData));

  }
  reverseBill(data): Observable<any> {
    return this.http.post(endpoint + 'payments/reverse_bills/', data, httpOptions).pipe(
      map(this.extractData));

  }
  getServices(): Observable<any> {
    return this.http.get(endpoint + 'data/service/').pipe(
      map(this.extractData));

  }
  getTests(): Observable<any> {
    return this.http.get(endpoint + 'data/service/?category=LABORATORY').pipe(
      map(this.extractData));

  }
  searchTest(data): Observable<any> {
    return this.http.get(endpoint + 'data/service/?category=LABORATORY' + '&search=' + data).pipe(
      map(this.extractData));

  }
  getProcedures(): Observable<any> {
    return this.http.get(endpoint + 'data/service/?category=PROCEDURES').pipe(
      map(this.extractData));

  }
searchProcedure(data): Observable<any> {
    return this.http.get(endpoint + 'data/service/?category=PROCEDURES' + '&search=' + data).pipe(
      map(this.extractData));

  }
  searchService(data): Observable<any> {
    return this.http.get(endpoint + 'data/service/?search=' + data).pipe(
      map(this.extractData));

  }
  getAllergy(): Observable<any> {
    return this.http.get(endpoint + 'data/allergy/').pipe(
      map(this.extractData));

  }
  allDiagnoses(): Observable<any> {
    return this.http.get(endpoint + 'data/diagnosis/').pipe(
      map(this.extractData));

  }
  searchDiagnosis(data): Observable<any> {
    return this.http.get(endpoint + 'data/icdDescription/?search=' + data).pipe(
      map(this.extractData));

  }
  getSearchedMembers(): Observable<any> {
    return this.http.get(endpoint + 'insurecheck/view_searched_members/').pipe(
      map(this.extractData));

  }
  getClaims(): Observable<any> {
    return this.http.get(endpoint + 'claims/claims/').pipe(
      map(this.extractData));

  }
  triageList(): Observable<any> {
    return this.http.get(endpoint + 'patients/triage_list/').pipe(
      map(this.extractData));

  }
  schemes(id) {
    return this.http.post(endpoint + 'covers/schemes/', id, httpOptions).pipe(
      map(this.extractData));
  }
  closeClaim(id) {
    return this.http.post(endpoint + 'patients/close_claim/', id, httpOptions).pipe(
      map(this.extractData));
  }
  generateBill(id) {
    return this.http.post(endpoint + 'payments/generate-bill/', id , httpOptions).pipe(
      map(this.extractData));
  }
  labRequest(data) {
    return this.http.post(endpoint + 'elab/create_lab-request/', data, httpOptions).pipe(
      map(this.extractData));
  }
  labOrders(data): Observable<any> {
    return this.http.get(endpoint + 'elab/samples/?status=' + data);
  }
  labOrderItems(data): Observable<any> {
    return this.http.get(endpoint + 'elab/order/' + data + '/');
  }
  labReport(): Observable<any> {
    return this.http.get(endpoint + 'elab/samples_report/');
  }
  sendBatch(data) {
    return this.http.post(endpoint + 'claims/send_batch_to_insurance/', data, httpOptions).pipe(
      map(this.extractData));
  }
  labTests() {
    return this.http.get(endpoint + 'elab/orders/').pipe(
      map(this.extractData));
  }
  insuranceBill(id) {
    return this.http.post(endpoint + 'payments/insurance/', id, httpOptions).pipe(
      map(this.extractData));
  }
  revisit(data) {
    return this.http.post(endpoint + 'patients/patient_revisit/', data, httpOptions).pipe(
      map(this.extractData));
  }
  saveClaim(data) {
    return this.http.post(endpoint + 'claims/save_claim/', data, httpOptions).pipe(
      map(this.extractData));
  }
  payBill(data) {
    return this.http.post(endpoint + 'payments/pay_bills/', data, httpOptions).pipe(
      map(this.extractData));
  }
  insureCheck(data) {
    return this.http.post(endpoint + 'insurecheck/insure_check/', data, httpOptions).pipe(
      map(this.extractData));
  }
  insure_details(data) {
    return this.http.post(endpoint + 'insurecheck/insure_details/', data, httpOptions).pipe(
      map(this.extractData));
  }
  getVisit(data) {
    return this.http.post(endpoint + 'patients/get_visit/', data).pipe(
      map(this.extractData));
  }
  updateClaim(data) {
    return this.http.post(endpoint + 'claims/claim_update/', data).pipe(
      map(this.extractData));
  }
  createSingleClaim(data) {
    return this.http.post(endpoint + 'claims/create_single_claim/', data).pipe(
      map(this.extractData));
  }
  members(id) {
    return this.http.get(endpoint + 'members/scheme_members/' + id + '/').pipe(
      map(this.extractData));
  }
  benefitsListing() {
    return this.http.get(endpoint + 'covers/benefits_list/?limit=100').pipe(
      map(this.extractData));
  }
  claimDetails(id) {
    return this.http.get(endpoint + 'claims/detail/' + id + '/').pipe(
      map(this.extractData));
  }
  getpendingMembers(): Observable<any> {
    return this.http.get(endpoint + 'members/pending_members/', httpOptions).pipe(
      map(this.extractData));

  }

  patientVisit(): Observable<any> {
    return this.http.get(endpoint + 'patients/patient-visits/').pipe(
      map(this.extractData));

  }
  getDoctors(): Observable<any> {
    return this.http.get(endpoint + 'users/doctors/').pipe(
      map(this.extractData));

    }
  getLabRequests() {
    return this.http.get(endpoint + 'elab/lab_requests/').pipe(
      map(this.extractData));
  }

  triageDetail(data): Observable<any> {
    return this.http.post<any>(endpoint + 'triage/save-triage/', JSON.stringify(data), httpOptions).pipe(
    map(this.extractData
    ));
  }
  registerPatient(data): Observable<any> {
    return this.http.post<any>(endpoint + 'patients/create-patient/', JSON.stringify(data), httpOptions).pipe(
      map(this.extractData
      ));
  }

  logIn(data): Observable<any> {
  console.log(data);
  return this.http.post(endpoint + 'users/login/', data).pipe(
    map(this.extractData
    ));
  }

  createUser(data): Observable<{}> {
    return this.http.post<{}>(endpoint + 'users/create-user/', data, httpOptions).pipe(
      map(this.extractData
      ));
  }
  addAllergy(data): Observable<any> {
    return this.http.post<{}>(endpoint + 'treatment/add_allergy/', data, httpOptions).pipe(
      map(this.extractData
      ));
  }
getPayers(): Observable<any> {
    return this.http.get(endpoint + 'services/payers/', httpOptions).pipe(
    map(this.extractData));

  }
  patientsList(): Observable<any> {
    return this.http.get(endpoint + 'patients/patient/').pipe(
      map(this.extractData));

  }
getSchemes(payerId): Observable<any> {
      return this.http.get(endpoint + 'covers/schemes/?payer=' + payerId).pipe(
      map(this.extractData));
}
searchScheme(payer, searchTerm): Observable<any> {
    return this.http.get(endpoint + 'covers/schemes/?payers=' + payer + '&scheme=' + searchTerm).pipe(
      map(this.extractData));
}

  searchMember(schemeId, searchTerm): Observable<any> {
    return this.http.get(endpoint + 'members/members/?plan__scheme=' + schemeId + '&search=' + searchTerm).pipe(
      map(this.extractData));
  }
  searchPayers(data): Observable<any> {
    return this.http.get(endpoint + 'services/payers/?search=' + data).pipe(
      map(this.extractData));

  }
  getHospital(id): Observable<any> {
    return this.http.get(endpoint + 'hospitals/' + id + '/', httpOptions).pipe(
      map(this.extractData));

  }
  prescriptions(): Observable<any> {
    return this.http.get(endpoint + 'data/prescription/').pipe(
      map(this.extractData));

  }
  searchPrescriptions(data): Observable<any> {
    return this.http.get(endpoint + 'data/prescription/?search=' + data).pipe(
      map(this.extractData));

  }
  batches(): Observable<any> {
    return this.http.get(endpoint + 'claims/batchonly/').pipe(
      map(this.extractData));

  }
  batchDetails(id): Observable<any> {
    return this.http.get(endpoint + 'claims/batch/' + id + '/').pipe(
      map(this.extractData));

  }
  providerDetails(id): Observable<any> {
    const data = {
      'id': id
    };
    return this.http.post(endpoint + 'hospitals/provider/', data, httpOptions).pipe(
      map(this.extractData));

  }

  saveDrugs(data): Observable<any> {
    return this.http.post(endpoint + 'services/save_drugs/', data, httpOptions).pipe(
      map(this.extractData));

  }

  createBatch(data): Observable<any> {
    return this.http.post(endpoint + 'claims/claim_batching/', data, httpOptions).pipe(
      map(this.extractData));

  }
  saveServices(data): Observable<any> {
    return this.http.post(endpoint + 'services/save_services/', data).pipe(
      map(this.extractData));

  }

  patientBills(data): Observable<any> {
    return this.http.post(endpoint + 'payments/get_bills/', data).pipe(
      map(this.extractData));

  }
  saveDiagnosis(data): Observable<any> {
    return this.http.post(endpoint + 'treatment/add_diagnosis/', data, httpOptions).pipe(
      map(this.extractData));

  }
  savePrescription(data): Observable<any> {
    return this.http.post(endpoint + 'treatment/add_prescription/', data, httpOptions).pipe(
      map(this.extractData));

  }
  getProviderDrugs(id): Observable<any> {
    return this.http.get(endpoint + 'services/provider/' + id + '/', httpOptions).pipe(
      map(this.extractData));

  }

  getDosage(): Observable<any> {
    return this.http.get(endpoint + 'data/dosage/').pipe(
      map(this.extractData));

  }
  getProviderServices(id): Observable<any> {
    return this.http.get(endpoint + 'services/provider_services/' + id + '/', httpOptions).pipe(
      map(this.extractData));

  }
  deletePrescription(id): Observable<any> {
    return this.http.delete(endpoint + 'services/prescription/' + id + '/', httpOptions).pipe(
      map(this.extractData));

  }
  deleteBillItem(id): Observable<any> {
    return this.http.delete(endpoint + 'payments/delete_bill/' + id + '/', httpOptions).pipe(
      map(this.extractData));

  }
  deleteService(id): Observable<any> {
    return this.http.delete(endpoint + 'services/service/' + id + '/', httpOptions).pipe(
      map(this.extractData));

  }
}
