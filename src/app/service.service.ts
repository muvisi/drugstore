import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
export const endpoint = 'http://localhost:8000/';
// export const endpoint = 'http://134.209.199.123:4000/';
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
      return of(result as T);
    };
  }
  public isAuthenticated(): boolean {
  
    return true;
  }

  getTreatments(): Observable<any> {
    return this.http.get(endpoint + 'patients/patient_treatments/').pipe(
      map(this.extractData));

  }
  getEvents(): Observable<any> {
    return this.http.get(endpoint + 'appointments/appointment_list/').pipe(
      map(this.extractData));

  }
  recordList(): Observable<any> {
    return this.http.get(endpoint + 'patients/record_list/?limit=500').pipe(
      map(this.extractData));

  }

  getMembers(): Observable<any> {
    return this.http.get(endpoint + 'patients/patient_treatments/').pipe(
      map(this.extractData));

  }
  reverseBill(data): Observable<any> {
    return this.http.post(endpoint + 'payments/reverse_bills/', data ).pipe(
      map(this.extractData));

  }
  pay(data): Observable<any> {
    return this.http.post(endpoint + 'payments/pay/', data ).pipe(
      map(this.extractData));

  }
  updateDiagnosis(data): Observable<any> {
    return this.http.post(endpoint + 'treatment/update_diagnosis/',data).pipe(
      map(this.extractData));

  }
  addObservation(data): Observable<any> {
    return this.http.post(endpoint + 'treatment/create_observation/',data).pipe(
      map(this.extractData));

  }
  addMedicalObservation(data): Observable<any> {
    return this.http.post(endpoint + 'treatment/medical_observation/',data).pipe(
      map(this.extractData));

  }
  deleteDiagnosis(id): Observable<any> {
    return this.http.delete(endpoint + 'treatment/delete_diagnosis/'+id+'/').pipe(
      map(this.extractData));

  }
  deleteNote(id): Observable<any> {
    return this.http.delete(endpoint + 'treatment/delete_note/'+id+'/').pipe(
      map(this.extractData));

  }
  searchPatient(data): Observable<any> {
    return this.http.get(endpoint + 'patients/patient-visits/?search='+data).pipe(
      map(this.extractData));

  }
  getServices(): Observable<any> {
    return this.http.get(endpoint + 'data/service/').pipe(
      map(this.extractData));

  }
  serviceSearch(data): Observable<any> {
    return this.http.get(endpoint + 'data/service/?search='+ data).pipe(
      map(this.extractData));
  }
  getXray(): Observable<any> {
    return this.http.get(endpoint + 'data/service/?search=X-RAY'+'&limit=100').pipe(
      map(this.extractData));

  }
  getCtscan(): Observable<any> {
    return this.http.get(endpoint + 'data/service/?search=CT SCAN'+'&limit=100').pipe(
      map(this.extractData));

  }
  getTests(): Observable<any> {
    return this.http.get(endpoint + 'data/service/?department=Laboratory').pipe(
      map(this.extractData));

  }
  searchTest(data): Observable<any> {
    return this.http.get(endpoint + 'data/service/?department=Laboratory' + '&search=' + data).pipe(
      map(this.extractData));

  }
  getProcedures(): Observable<any> {
    return this.http.get(endpoint + 'data/service/?department=Procedures').pipe(
      map(this.extractData));

  }
  patientPrescription(data): Observable<any>{
    return this.http.post(endpoint + 'treatment/patient_prescription/', data).pipe(
      map(this.extractData));

  }
  createRecord(data): Observable<any>{
    return this.http.post(endpoint + 'patients/create_record/', data).pipe(
      map(this.extractData));

  }
searchProcedure(data): Observable<any> {
    return this.http.get(endpoint + 'data/service/?department=Procedures' + '&search=' + data).pipe(
      map(this.extractData));

  }
  searchService(data): Observable<any> {
    return this.http.get(endpoint + 'data/service/?search='+data).pipe(
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
  searchClaims(data): Observable<any>{
    return this.http.get(endpoint + 'claims/claims/?search='+ data).pipe(
      map(this.extractData));
  }
  triageList(): Observable<any> {
    return this.http.get(endpoint + 'patients/triage_list/').pipe(
      map(this.extractData));

  }
  observationList(): Observable<any>{
    return this.http.get(endpoint + 'data/observations/').pipe(
      map(this.extractData));

  }
  schemes(id) {
    return this.http.post(endpoint + 'covers/schemes/', id).pipe(
      map(this.extractData));
  }
  closeClaim(id) {
    return this.http.post(endpoint + 'patients/close_claim/', id).pipe(
      map(this.extractData));
  }
  createAuthletter(data) {
    return this.http.post(endpoint + 'authletters/create_auth/',data ).pipe(
      map(this.extractData));
  }
  generateBill(id) {
    return this.http.post(endpoint + 'payments/generate-bill/', id , ).pipe(
      map(this.extractData));
  }
  labRequest(data) {
    return this.http.post(endpoint + 'elab/create_lab-request/', data ).pipe(
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
  reports(): Observable<any>{
    return this.http.get(endpoint + 'payments/reports/');
  }
  sendBatch(data) {
    return this.http.post(endpoint + 'claims/send_batch_to_insurance/', data ).pipe(
      map(this.extractData));
  }
  labTests() {
    return this.http.get(endpoint + 'elab/orders/').pipe(
      map(this.extractData));
  }
  insuranceBill(id) {
    return this.http.post(endpoint + 'payments/insurance/', id).pipe(
      map(this.extractData));
  }
  revisit(data) {
    return this.http.post(endpoint + 'patients/patient_revisit/', data ).pipe(
      map(this.extractData));
  }
  saveClaim(data) {
    return this.http.post(endpoint + 'claims/save_claim/', data ).pipe(
      map(this.extractData));
  }
  payBill(data) {
    return this.http.post(endpoint + 'payments/pay_bills/', data ).pipe(
      map(this.extractData));
  }
  insureCheck(data) {
    return this.http.post(endpoint + 'insurecheck/insure_check/',data).pipe(
      map(this.extractData));
  }
  insure_details(data) {
    return this.http.post(endpoint + 'insurecheck/insure_details/', data ).pipe(
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
  deleteBatch(id) {
    return this.http.delete(endpoint + 'claims/delete-batch/'+id+'/').pipe(
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
    return this.http.get(endpoint + 'members/pending_members/', ).pipe(
      map(this.extractData));

  }
getBills(): Observable<any>{
  return this.http.get(endpoint + 'payments/invoice/', ).pipe(
    map(this.extractData));
}
searchInvoice(data): Observable<any>{
  return this.http.get(endpoint + 'payments/invoice/?search='+data).pipe(
    map(this.extractData));
}
searchBills(data): Observable<any>{
  return this.http.get(endpoint + 'payments/bill/?search='+ data ).pipe(
    map(this.extractData));
}
  patientVisit(): Observable<any> {
    return this.http.get(endpoint + 'patients/patient-visits/').pipe(
      map(this.extractData));

  }

  patientRecords(): Observable<any> {
    return this.http.get(endpoint + 'patients/patient-records/').pipe(
      map(this.extractData));

  }
  updatePatient(data): Observable<any>{
    return this.http.post(endpoint + 'patients/update_patient/',data).pipe(
      map(this.extractData));
  }
  getDoctors(): Observable<any> {
    return this.http.get(endpoint + 'users/doctors/').pipe(
      map(this.extractData));

    }
    loadDrug(data): Observable<any> {
      return this.http.post(endpoint + 'pharmacy/load_drug/',data).pipe(
        map(this.extractData));

      }


  getLabRequests() {
    return this.http.get(endpoint + 'elab/lab_requests/').pipe(
      map(this.extractData));
  }

  triageDetail(data): Observable<any> {
    return this.http.post<any>(endpoint + 'triage/save-triage/', JSON.stringify(data), ).pipe(
    map(this.extractData
    ));
  }
  registerPatient(data): Observable<any> {
    return this.http.post(endpoint + 'patients/create-patient/',data).pipe(
      map(this.extractData
      ));
  }
  createHospitalBranch(data): Observable<any> {
    return this.http.post<any>(endpoint + 'hospitals/create_branch/', data).pipe(
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
    return this.http.post<{}>(endpoint + 'users/create-user/', data ).pipe(
      map(this.extractData
      ));
  }
  reset(data): Observable<{}> {
    return this.http.post<{}>(endpoint + 'users/reset/', data ).pipe(
      map(this.extractData
      ));
  }
  deactivateUser(data,id): Observable<{}> {
    return this.http.put(endpoint + 'users/user/'+id+'/', data ).pipe(
      map(this.extractData
      ));
  }

  addAllergy(data): Observable<any> {
    return this.http.post<{}>(endpoint + 'treatment/add_allergy/', data ).pipe(
      map(this.extractData
      ));
  }
  saveHistory(data): Observable<any> {
    return this.http.post<{}>(endpoint + 'treatment/history/', data ).pipe(
      map(this.extractData
    ));
  }
getPayers(): Observable<any> {
    return this.http.get(endpoint + 'services/payers/', ).pipe(
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
    return this.http.get(endpoint + 'hospitals/' + id + '/', ).pipe(
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
    return this.http.post(endpoint + 'hospitals/provider/', data ).pipe(
      map(this.extractData));

  }

  saveDrugs(data): Observable<any> {
    return this.http.post(endpoint + 'pharmacy/drugs/', data ).pipe(
      map(this.extractData));

  }

  createBatch(data): Observable<any> {
    return this.http.post(endpoint + 'claims/claim_batching/', data ).pipe(
      map(this.extractData));

  }
  saveServices(data): Observable<any> {
    return this.http.post(endpoint + 'services/save_services/', data).pipe(
      map(this.extractData));

  }

  setHours(data): Observable<any> {
    return this.http.post(endpoint + 'hospitals/working_hours/', data).pipe(
      map(this.extractData));
  }
  patientBills(data): Observable<any> {
    return this.http.post(endpoint + 'payments/get_bills/', data).pipe(
      map(this.extractData));

  }
  saveDiagnosis(data): Observable<any> {
    return this.http.post(endpoint + 'treatment/add_diagnosis/', data ).pipe(
      map(this.extractData));

  }
  savePrescription(data): Observable<any> {
    return this.http.post(endpoint + 'treatment/add_prescription/', data ).pipe(
      map(this.extractData));

  }

  createDepartment(data): Observable<any> {
    return this.http.post(endpoint + 'hospitals/create_department/', data ).pipe(
      map(this.extractData));

  }
  changePassword(data): Observable<any> {
    return this.http.post(endpoint + 'users/change_password/', data ).pipe(
      map(this.extractData));

  }
  deleteDepartment(id): Observable<any> {
    return this.http.delete(endpoint + 'hospitals/department/'+id+'/').pipe(
      map(this.extractData));

  }
  editDepartment(id,data): Observable<any> {
    return this.http.put(endpoint + 'hospitals/department/'+id+'/',data).pipe(
      map(this.extractData));

  }
  getDrugs(): Observable<any> {
    return this.http.get(endpoint + 'pharmacy/drugs_list/').pipe(
      map(this.extractData));

  }
  getProviderDrugs(): Observable<any> {
    return this.http.get(endpoint + 'data/prescription/').pipe(
      map(this.extractData));

  }
   
  searchDrugs(data): Observable<any> {
    return this.http.get(endpoint + 'data/prescription/?search='+data).pipe(
      map(this.extractData));

  }

  searchHospitalDrugs(data): Observable<any> {
    return this.http.get(endpoint + 'pharmacy/drugs_list/?search='+data).pipe(
      map(this.extractData));

  }

  getDosage(): Observable<any> {
    return this.http.get(endpoint + 'data/dosage/').pipe(
      map(this.extractData));

  }
  getProviderServices(): Observable<any> {
    return this.http.get(endpoint + 'services/services/').pipe(
      map(this.extractData));

  }
  deleteDrug(id): Observable<any> {
    return this.http.delete(endpoint + 'pharmacy/drug/' + id + '/', ).pipe(
      map(this.extractData));

  }
  deleteBillItem(id): Observable<any> {
    return this.http.delete(endpoint + 'payments/delete_bill/' + id + '/', ).pipe(
      map(this.extractData));

  }
  deleteService(id): Observable<any> {
    return this.http.delete(endpoint + 'services/service/' + id + '/', ).pipe(
      map(this.extractData));

  }
}
