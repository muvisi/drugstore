import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
export const endpoint='http://localhost:8000/';
// export const endpoint = 'https://kapc.healthixsolutions.com:7000/';
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

  getTreatments() {
    return this.http.get(endpoint + 'patients/patient_treatments/').pipe(
      map(this.extractData));

  }
  getTriage(data): Observable<any> {
    return this.http.post(endpoint + 'triage/get_triage/',data).pipe(
      map(this.extractData));
  }
  getEvents(): Observable<any> {
    return this.http.get(endpoint + 'appointments/appointment_list/?limit=1000').pipe(
      map(this.extractData));
  }
  getAppointments(): Observable<any> {
    return this.http.get(endpoint + 'appointments/all/?limit=1000').pipe(
      map(this.extractData));
  }
  getAppointmentsRevenues(): Observable<any> {
    return this.http.get(endpoint + 'appointments/all/?status=complete').pipe(
      map(this.extractData));
  }
  getAppointmentsRevenuesByCounselor(id): Observable<any> {
    return this.http.get(endpoint + 'appointments/all/?counselor='+id+'&status=complete').pipe(
      map(this.extractData));
  }
  getBilling(): Observable<any> {
    return this.http.get(endpoint + 'appointments/payments/').pipe(
      map(this.extractData));
  }
  searchBilling(id): Observable<any> {
    return this.http.get(endpoint + 'appointments/payments/?search='+id).pipe(
      map(this.extractData));
  }
  searchAppointments(id): Observable<any> {
    return this.http.get(endpoint + 'appointments/all/?search='+id+'&limit=1000').pipe(
      map(this.extractData));
  }
  deleteAppointment(id): Observable<any> {
    return this.http.put(endpoint + 'appointments/'+id+'/delete/',{}).pipe(
      map(this.extractData));
    } 
  updateAppointments(data): Observable<any> {
    return this.http.post(endpoint + 'appointments/update/',data).pipe(
      map(this.extractData));
  }
  appointmentServie(data): Observable<any> {
    return this.http.post(endpoint + 'appointments/service/',data).pipe(
      map(this.extractData));
  }
  appointmentSupervison(data): Observable<any> {
    return this.http.post(endpoint + 'appointments/supervision/',data).pipe(
      map(this.extractData));
  }
  getSupervisons(id): Observable<any> {
    return this.http.post(endpoint + 'appointments/get_supervisions/',{id:id}).pipe(
      map(this.extractData));
  }

  deleteServices(id): Observable<any> {
    return this.http.delete(endpoint + 'appointments/services/'+id+'/').pipe(
      map(this.extractData));
  }
  addNote(data): Observable<any> {
    return this.http.post(endpoint + 'appointments/add_note/',data).pipe(
      map(this.extractData));
  }
  addStatus(data): Observable<any> {
    return this.http.post(endpoint + 'appointments/add_status/',data).pipe(
      map(this.extractData));
  }
  addSpouse(id,data): Observable<any> {
    return this.http.post(endpoint + 'appointments/'+id+'/addspouse/',data).pipe(
      map(this.extractData));
  }
  getSpouse(id): Observable<any> {
    return this.http.get(endpoint + 'appointments/'+id+'/spouse/').pipe(
      map(this.extractData));
  }
  getAppointment(id): Observable<any> {
    return this.http.get(endpoint + 'appointments/'+id+'/').pipe(
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
  clientPayments(data): Observable<any> {
    return this.http.post(endpoint + 'payments/client_payments/', data ).pipe(
      map(this.extractData));
  }
  cashPayments(data): Observable<any> {
    return this.http.post(endpoint + 'payments/cash_payments/', data ).pipe(
      map(this.extractData));
  }
  ncbaPayments(data): Observable<any> {
    return this.http.post(endpoint + 'payments/ncba_payments/', data ).pipe(
      map(this.extractData));
  }
  mpesaPayments(data): Observable<any> {
    return this.http.post(endpoint + 'payments/mpesa_payments/', data).pipe(
      map(this.extractData));
  }
  mpesaStk(data): Observable<any> {
    return this.http.post(endpoint + 'payments/request/',data).pipe(
      map(this.extractData));
  }
  ncbaAllPayments(): Observable<any> {
    return this.http.get(endpoint + 'payments/ncba/?limit=100').pipe(
      map(this.extractData));
  }

  searchncbaPaymentsByPhone(id): Observable<any> {
    return this.http.get(endpoint + 'payments/ncba/?search='+id).pipe(
      map(this.extractData));
  }
  searchncbaPaymentsByStatus(text): Observable<any> {
    return this.http.get(endpoint + 'payments/ncba/?type='+text).pipe(
      map(this.extractData));
  }

  searchncbaPaymentsByDate(id): Observable<any> {
    return this.http.post(endpoint + 'payments/ncba_range_payments/',{date:id}).pipe(
      map(this.extractData));
  }

  cashList(data): Observable<any> {
    return this.http.get(endpoint + 'payments/cash_list/?appointment='+data).pipe(
      map(this.extractData));
  }

allCashPayments(): Observable<any> {
    return this.http.get(endpoint + 'payments/cash_list/').pipe(
      map(this.extractData));
}
cashPaymentsBydate(date): Observable<any> {
  return this.http.post(endpoint + 'payments/cash_range_payments/',{date:date}).pipe(
    map(this.extractData));
} 

cashPaymentsByPhone(text): Observable<any> {
  return this.http.get(endpoint + 'payments/cash_list/?search='+text).pipe(
    map(this.extractData));
} 

mpesa(): Observable<any> {
    return this.http.get(endpoint + 'payments/mpesa_list/').pipe(
      map(this.extractData));
}
mpesaList(): Observable<any> {
  return this.http.get(endpoint + 'payments/mpesa_list/?status=0').pipe(
    map(this.extractData));
}
mpesaMobileSearch(data): Observable<any> {
  return this.http.get(endpoint + 'payments/mpesa_list/?phone_number='+data).pipe(
    map(this.extractData));
}
mpesaAppointmentPayment(data): Observable<any> {
  return this.http.get(endpoint + 'payments/mpesa_list/?search='+data+'&status=0').pipe(
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
  updateNote(id,data): Observable<any> {
    return this.http.put(endpoint + 'treatment/delete_note/'+id+'/',data).pipe(
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
    return this.http.get(endpoint + 'data/icdcode/?search=' + data).pipe(
      map(this.extractData));
  }
  getSearchedMembers(): Observable<any> {
    return this.http.get(endpoint + 'insurecheck/view_searched_members/').pipe(
      map(this.extractData));

  }
  getClaims(): Observable<any> {
    return this.http.get(endpoint + 'claims/claims/?complete=1&&processing_status=NEW').pipe(
      map(this.extractData));
  }
  getClaimChecking(): Observable<any> {
    return this.http.get(endpoint + 'claims/claims/?complete=0&&processing_status=NEW').pipe(
      map(this.extractData));
  }
  getCashierClaimChecking(visit): Observable<any> {
    return this.http.get(endpoint + 'claims/cashier/?complete=0&&processing_status=NEW&visit_type='+visit).pipe(
      map(this.extractData));
  }
  cashierClaimCheckingSearch(text,visit): Observable<any> {
    return this.http.get(endpoint + 'claims/cashier/?complete=0&&processing_status=NEW&search='+text+'&visit_type='+visit).pipe(
      map(this.extractData));
  }
  searchClaimChecking(text): Observable<any> {
    return this.http.get(endpoint + 'claims/claims/?complete=0&&processing_status=NEW&search='+text).pipe(
      map(this.extractData));
  }
  getClaimStatus(status): Observable<any> {
    return this.http.get(endpoint + 'claims/claims/?processing_status='+status).pipe(
      map(this.extractData));
  }
  getCahierClaimStatus(status,visit): Observable<any> {
    return this.http.get(endpoint + 'claims/cashier/?processing_status='+status+'&visit_type='+visit).pipe(
      map(this.extractData));
  }
  searchClaimStatus(status,text): Observable<any> {
    return this.http.get(endpoint + 'claims/claims/?processing_status='+status+'&search='+text).pipe(
      map(this.extractData));
  }
  getCompleted(): Observable<any> {
    return this.http.get(endpoint + 'claims/claims/?complete=1').pipe(
      map(this.extractData));
  }

  getCashierCompleted(type): Observable<any> {
    return this.http.get(endpoint + 'claims/cashier/?complete=1&visit_type='+type).pipe(
      map(this.extractData));
  }
  getClaimErrors(id): Observable<any> {
    return this.http.get(endpoint + 'claims/claim_errors/?claim='+id).pipe(
      map(this.extractData));
  }

  claimsChecking(data) {
    return this.http.post(endpoint + 'claims/claim_errors_cheking/', data).pipe(
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
  addRoomType(data) {
    return this.http.post(endpoint + 'booking/room_type/',data).pipe(
      map(this.extractData));
  }
  addFloor(data) {
    return this.http.post(endpoint + 'booking/floor/',data).pipe(
      map(this.extractData));
  }
  getFloors() {
    return this.http.get(endpoint + 'booking/floor/').pipe(
      map(this.extractData));
  }
  roomTypes() {
    return this.http.get(endpoint + 'booking/room_type/').pipe(
      map(this.extractData));
  }
  addRoom(data){
    return this.http.post(endpoint + 'booking/room/',data).pipe(
      map(this.extractData));
  }
  deleteRoom(id){
    return this.http.delete(endpoint + 'booking/room/'+id+'/').pipe(
      map(this.extractData));
  }
  getRoom(id){
    return this.http.get(endpoint + 'booking/room/'+id+'/').pipe(
      map(this.extractData));
  }
  updateRoom(data){
    console.log(data);
    return this.http.put(endpoint + 'booking/room/'+data.id+'/',data).pipe(
    map(this.extractData));
  }
  getRooms(){
    return this.http.get(endpoint + 'booking/room/').pipe(
      map(this.extractData));
  }
  reservation(data){
    return this.http.post(endpoint + 'booking/counsellor/',data).pipe(
      map(this.extractData));
  }

  reservationList(){
    return this.http.get(endpoint + 'booking/reservation/').pipe(
      map(this.extractData));
  }
  getReservation(id){
    return this.http.get(endpoint + 'booking/reservation/'+id+'/').pipe(
      map(this.extractData));
  }
  updateReservation(id,data){
    return this.http.put(endpoint + 'booking/reservation/'+id+'/',data).pipe(
      map(this.extractData));
  }
  startReservation(id){
    return this.http.put(endpoint + 'booking/reservation/'+id+'/start/',{}).pipe(
      map(this.extractData));
  }
  endReservation(id){
    return this.http.put(endpoint + 'booking/reservation/'+id+'/end/',{}).pipe(
      map(this.extractData));
  }
  cancelReservation(id){
    return this.http.put(endpoint + 'booking/reservation/'+id+'/cancel/',{}).pipe(
      map(this.extractData));
  }
  reservationListSearch(data){
    return this.http.get(endpoint + 'booking/reservation/?search='+data).pipe(
      map(this.extractData));
  }
  roomRevenues(){
    return this.http.get(endpoint + 'booking/room_revenue/').pipe(
      map(this.extractData));
  }
  roomDateRevenues(data){
    return this.http.post(endpoint + 'booking/room_date_revenue/',data).pipe(
      map(this.extractData));
  }
  reservationByStaff(data){
    return this.http.get(endpoint+'booking/reservation/?staff='+data).pipe(
      map(this.extractData));
  }
  searchRooms(data){
    return this.http.get(endpoint + 'booking/room/?search='+data).pipe(
      map(this.extractData));
  }
  createAuthletter(data) {
    return this.http.post(endpoint + 'authletters/create_auth/',data ).pipe(
      map(this.extractData));
  }
  generateBill(id) {
    return this.http.post(endpoint + 'payments/generate-bill/',id).pipe(
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
  updateClient(data) {
      return this.http.put(endpoint + 'patients/patient/'+data.id+'/', data ).pipe(
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
  patientListing(): Observable<any> {
    return this.http.get(endpoint + 'patients/listing/').pipe(
      map(this.extractData));

  }

  patientRecords(): Observable<any> {
    return this.http.get(endpoint + 'patients/patient/').pipe(
      map(this.extractData));
  }
  getPatient(id): Observable<any> {
    return this.http.get(endpoint + 'patients/patient/'+id+'/').pipe(
      map(this.extractData));
  }

  SearchPatientRecords(data): Observable<any> {
    return this.http.get(endpoint + 'patients/patient/?search='+data).pipe(
      map(this.extractData));

  }
  appointmentList(): Observable<any> {
    return this.http.get(endpoint + 'patients/appointment_list/').pipe(
      map(this.extractData));

  }
  todayAppointmentList(): Observable<any> {
    return this.http.get(endpoint + 'patients/today_appointment/').pipe(
      map(this.extractData));

  }
  createAppointment(data): Observable<any>{
    return this.http.post(endpoint + 'patients/appointment/',data).pipe(
      map(this.extractData));
  }
  createReappointment(data): Observable<any>{
    return this.http.post(endpoint + 'patients/reappointment/',data).pipe(
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
  updateUser(data): Observable<{}> {
    return this.http.post<{}>(endpoint + 'users/update_user/', data ).pipe(
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
  getUser(id): Observable<{}> {
    return this.http.get(endpoint + 'users/user/'+id+'/').pipe(
      map(this.extractData
      ));
  }
  getcounsellors(){
    return this.http.get(endpoint + 'users/counsellors/').pipe(
      map(this.extractData
      ));
  }

  getAppointmentUsers(){
    return this.http.get(endpoint + 'users/user/?role=counselor').pipe(
      map(this.extractData
      ));
  }

  rescheduleAppointment(data){
    return this.http.post(endpoint + 'appointments/reschedule/',data).pipe(
      map(this.extractData
      ));
  }
  appointmentFee(data){
    return this.http.get(endpoint + 'appointments/fee/?appointment='+data).pipe(
      map(this.extractData
      ));
  }
  appointmentRefund(data){
    return this.http.post(endpoint + 'appointments/refund/',data).pipe(
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

  historyDiagnosis(data): Observable<any> {
    return this.http.post(endpoint + 'history/diagnosis/', data ).pipe(
      map(this.extractData
    ));
  }
getPayers(): Observable<any> {
    return this.http.get(endpoint + 'services/payers/', ).pipe(
    map(this.extractData));

  }

  createBranchPayers(data): Observable<any> {
    return this.http.post(endpoint + 'services/branch_payers/',data).pipe(
    map(this.extractData));

  }

  getBranchPayers(): Observable<any> {
    return this.http.get(endpoint + 'services/branch_payers/').pipe(
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
  updateHospital(data): Observable<any> {
    return this.http.put(endpoint + 'hospitals/' + data.id + '/',data ).pipe(
      map(this.extractData));
  }
  deleteHospital(id): Observable<any> {
    return this.http.delete(endpoint + 'hospitals/' + id + '/', ).pipe(
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
  getProviderServicesQuery(text): Observable<any> {
    return this.http.get(endpoint + 'services/services/?search='+text).pipe(
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
  updateService(id,data): Observable<any> {
    return this.http.put(endpoint + 'services/service/' + id + '/',data).pipe(
      map(this.extractData));

  }
}
