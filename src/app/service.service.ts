import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse, HttpBackend } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';



const httpOptions_payments = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'Basic ' + btoa('technical@healthix.co.ke:Hr9j4cX7dK5mof')
  })
};


// export const endpoint='http://localhost:8000/';
// export const endpoint='http://localhost:8888/';
// export const endpoint='http://134.209.199.123:8787/';
// export const endpoint='https://booking.healthixsolutions.com/';
// export const endpoint = 'https://booking.healthixsolutions.com/';
// export const endpoint='http://134.209.199.123:8080/';
// export const endpoint='http://192.168.12.15:7778/';
// export const endpoint='https://bookings.aarhospital.com/';
export const endpoint='https://booking.healthixsolutions.com/';
// export const endpoint = 'https://booking.healthixsolutions.com/';
// export const endpoint='http://134.209.199.123:8888/';
// export const endpoint='http://197.248.31.237:8548/';
export const SOCKET_URL="wss://booking.healthixsolutions.com/api/";
export const SIGNATURE_URL="https://booking.healthixsolutions.com/";
export const payment_url='https://payments.healthixsolutions.com/payments/';

// export const HEALTHIX_BACKEND_URL_AAR ='http://134.209.199.123:7777/'
export const HEALTHIX_BACKEND_URL_AAR ='https://aarclaims.healthixsolutions.com/';
// export const HEALTHIX_BACKEND_URL_AAR ='http://localhost:8000/'
@Injectable({
  providedIn: 'root'
})

export class ServiceService {
  private customHttpClient: HttpClient;





  constructor(private http: HttpClient,public backend: HttpBackend) {
  }
  getendpoint(){
    return endpoint;
  }
  getSignatureUrl(){
    return SIGNATURE_URL+"signature/"
  }
  private extractData(res) {
    const  body = res;
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
  getInsuranceCompany(): Observable<any> {
    return this.http.get(HEALTHIX_BACKEND_URL_AAR+ 'services/payers/?limit=1000').pipe(
      map(this.extractData));
  }
 
  updatePaymentDetails(id,data): Observable<any> {
    return this.http.post(endpoint+ 'api/booking-payment-update/'+id+'/',data).pipe(
      map(this.extractData));
  }
  feedbackmaternity(): Observable<any> {
    return this.http.get(endpoint+ 'api/maternityfeedback/').pipe(
      map(this.extractData));
  }
  allfeedbacks(): Observable<any> {
    return this.http.get(endpoint+ 'api/allfeedbacklist/').pipe(
      map(this.extractData));
  }
  
  mpesaPayment(phone): Observable<any> {
    return this.http.get('https://payments.healthixsolutions.com/payments/?phone_number='+phone).pipe(
      map(this.extractData));
  }

  requestStkPush(data): Observable<any> {
    return this.http.post("https://payments.healthixsolutions.com/payments/pay/",data).pipe(
      map(this.extractData));
  }

  addMaternityMpesaPayment(data): Observable<any> {
    return this.http.post(endpoint+ 'api/maternity-mpesa-payment/',data).pipe(
      map(this.extractData));
  }
  getMaternityMpesaPayment(id): Observable<any> {
    return this.http.get(endpoint+ 'api/maternity-mpesa-payment/'+id+'/').pipe(
      map(this.extractData));
  }
 
  getFootWalkData() {
    return this.http.get(endpoint + 'api/foot-walk/').pipe(
      map(this.extractData));
  }
  getFeedbcakResponses() {
    return this.http.get(endpoint + 'api/feedback-responses/').pipe(
      map(this.extractData));
  }
  getFeedbcakAges() {
    return this.http.get(endpoint + 'api/feedback-ages/').pipe(
      map(this.extractData));
  }
  reset(data): Observable<{}> {
    return this.http.post<{}>(endpoint + 'users/reset/', data ).pipe(
      map(this.extractData
      ));
  }
  



  getVisitNumbers() {
    return this.http.get(endpoint + 'api/visit_numbers/').pipe(
      map(this.extractData));
  }

  getPayments() {
    return this.http.get(endpoint + 'api/mpesa-payments/').pipe(
      map(this.extractData));
  }
  
  getInsuranceDoctors() {
    return this.http.get(endpoint + 'api/get-insurance-visit-doctor/').pipe(
      map(this.extractData));
  }

  getUtilizePayments() {
    return this.http.get(endpoint + 'api/utilized-payments/').pipe(
      map(this.extractData));
  }
  getUtilizePaymentsDownloadUrl() {
    return  endpoint + 'api/utilized-payments-download/';
  }
  getNotUtilizePaymentsDownloadUrl() {
    return  endpoint + 'api/not-utilized-payments-download/';
  }
  getdatedNotUtilizePaymentsDownloadUrl(data) {
    return  endpoint + 'api/datednot-utilized-payments-download/?start={{this.data2.start_date}}&&end={{data2.end_date}}';
  }
  getNotUtilizePayments() {
    return this.http.get(endpoint + 'api/not-utilized-payments/').pipe(
      map(this.extractData));
  }
  paymentsDateFilter(data) {
    return this.http.post(endpoint + 'api/mpesa-payments-date/',data).pipe(
      map(this.extractData));
  }
  paymentsDateFilterUtilized(data) {
    return this.http.post(endpoint + 'api/utilized-date/',data).pipe(
      map(this.extractData));
  }
  paymentsDateFilterNotUtilized(data) {
    return this.http.post(endpoint + 'api/not-utilized-date/',data).pipe(
      map(this.extractData));
  }
  utilizePayment(data) {
    return this.http.post(endpoint + 'api/patient-utilize/',data).pipe(
      map(this.extractData));
  }
  searchPayments(text) {
    return this.http.get(endpoint + 'api/mpesa-payments/?search='+text).pipe(
      map(this.extractData));
    
  }
  refreshPayments() {
    return this.http.get(endpoint + 'api/mpesa-payments-refresh/').pipe(
      map(this.extractData));
    
  }
  searchPaymentsUtilized(text) {
    return this.http.get(endpoint + 'api/utilized-payments/?search='+text).pipe(
      map(this.extractData));
    
  }
  searchPaymentsNotUtilized(text) {
    return this.http.get(endpoint + 'api/not-utilized-payments/?search='+text).pipe(
      map(this.extractData));
    
  }
  geMaternityDownloadUrl() {
    return  endpoint + 'api/maternity-download/';
  }
  getMaternityBookingList() {
    return this.http.get(endpoint + 'api/maternity/').pipe(
      map(this.extractData));
    
  }
  getMaternityBookingDetail(id) {
    return this.http.get(endpoint + 'api/maternity-details/'+id+'/').pipe(
      map(this.extractData));
    
  }
  searchMaternityBooking(text) {
    return this.http.get(endpoint + 'api/maternity/?search='+text).pipe(
      map(this.extractData));
    
  }



  // getPayments() {
  //   this.customHttpClient = new HttpClient(this.backend);
  //   return this.customHttpClient.get(payment_url).pipe(
  //     map(this.extractData));
  // }
  // searchPayments(text) {
  //   this.customHttpClient = new HttpClient(this.backend);
  //   return this.customHttpClient.get(payment_url+'?search='+text).pipe(
  //     map(this.extractData));
  // }
  getTriage(data): Observable<any> {
    return this.http.post(endpoint + 'triage/get_triage/',data).pipe(
      map(this.extractData));
  }

  getRegistrationLink(data): Observable<any> {
    return this.http.post(endpoint + 'api/registration-link/',data).pipe(
      map(this.extractData));
  }
  getFeedbackLink(data): Observable<any> {
    return this.http.post(endpoint + 'api/feedback-link/',data).pipe(
      map(this.extractData));
  }
  getEvents(): Observable<any> {
    return this.http.get(endpoint + 'appointments/appointment_list/?limit=100').pipe(
      map(this.extractData));
  }
  getAppointments(): Observable<any> {
    return this.http.get(endpoint + 'api/appointment/?limit=100').pipe(
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
  getPatientInfo(): Observable<any> {
    return this.http.get(endpoint + 'api/insurance_details/').pipe(
      map(this.extractData));
  }
  getTodaysInsuranceDetails(): Observable<any> {
    return this.http.get(endpoint + 'api/insurance_details-todays/').pipe(
      map(this.extractData));
  }
  getInsurance(id): Observable<any> {
    return this.http.get(endpoint + 'api/insurance_details/'+id+'/').pipe(
      map(this.extractData));
  }
 savefile(blob): Observable<any> {
    return this.http.post(endpoint + 'api/savefile/',blob).pipe(
      map(this.extractData));
  }
  getBookingInsuranceDetails(id): Observable<any> {
    return this.http.get(endpoint + 'api/insurance_detail_booking/'+id+'/').pipe(
      map(this.extractData));
  }
  getMaternityInsuranceDetails(id): Observable<any> {
    return this.http.get(endpoint + 'api/insurance_detail_maternity/'+id+'/').pipe(
      map(this.extractData));
  }
  getInsuranceVisitSearch(s): Observable<any> {
    return this.http.get(endpoint + 'api/insurance_details/'+s).pipe(
      map(this.extractData));
  }
  getTodayInsuranceVisitSearch(s): Observable<any> {
    return this.http.get(endpoint + 'api/insurance_details-todays/'+s).pipe(
      map(this.extractData));
  }
  getRequestEncounter(no): Observable<any> {
    return this.http.get(endpoint + 'api/individual-form/'+no+'/').pipe(
      map(this.extractData));
  }
  getInsurancePatientData(id): Observable<any> {
    return this.http.get(endpoint + 'api/insurance_patientdetails/'+id+'/').pipe(
      map(this.extractData));
  }
  getbookingDetails(id): Observable<any> {
    return this.http.get(endpoint + 'api/booking/'+id+'/').pipe(
      map(this.extractData));
  }
  searchBilling(id): Observable<any> {
    return this.http.get(endpoint + 'appointments/payments/?search='+id).pipe(
      map(this.extractData));
  }
  searchAppointments(id): Observable<any> {
    return this.http.get(endpoint + 'api/appointment/?search='+id+'&limit=100  6').pipe(
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
    return this.http.get(endpoint + 'api/appointment/'+id+'/').pipe(
      map(this.extractData));
  }
  getTestingAppointment(id): Observable<any> {
    return this.http.get(endpoint + 'api/covid_testing/'+id+'/').pipe(
      map(this.extractData));
  }
  postTriage(data): Observable<any> {
    return this.http.post(endpoint + 'api/triage/',data).pipe(
      map(this.extractData));
  }
  postTestingTriage(data): Observable<any> {
    return this.http.post(endpoint + 'api/testing_triage/',data).pipe(
      map(this.extractData));
  }
  getClientMonthlyTotal(): Observable<any> {
    return this.http.get(endpoint + 'appointments/clients_monthly_total/').pipe(
      map(this.extractData));
  }
  getSessionPerPlatform(): Observable<any> {
    return this.http.get(endpoint + 'appointments/sessions_per_platform/').pipe(
      map(this.extractData));
  }
  getRevenuePerConsellor(): Observable<any> {
    return this.http.get(endpoint + 'appointments/revenue_per_counsellor/').pipe(
      map(this.extractData));
  }
  getAppointmentPerStatus(): Observable<any> {
    return this.http.get(endpoint + 'appointments/appointments_per_status/').pipe(
      map(this.extractData));
  }
  postAppointmentIssuesTests(id,data): Observable<any> {
    return this.http.post(endpoint + 'appointments/'+id+'/issues_tests/',data).pipe(
      map(this.extractData));
  }
  getAppointmentIssuesTests(id): Observable<any> {
    return this.http.get(endpoint + 'appointments/'+id+'/issues_tests/').pipe(
      map(this.extractData));
  }
  deleteAppointmentIssuesTests(id,data): Observable<any> {
    return this.http.put(endpoint + 'appointments/'+id+'/issues_tests/',data).pipe(
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
  mpesapay(data): Observable<any> {
    // console.log(httpOptions_payments)
    return this.http.post(payment_url + 'pay/', data).pipe(
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
  getAlltesting(): Observable<any> {
    return this.http.get(endpoint + 'api/covidtestingapi/').pipe(
      map(this.extractData));

  }
  getAlltestingcomplete(): Observable<any> {
    return this.http.get(endpoint + 'api/covidcompleted/').pipe(
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
  getdatedtesting(dated): Observable<any> {
    return this.http.post(endpoint + 'api/datedcovidtesting/',dated).pipe(
      map(this.extractData));

  }
  g
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
  getRevenuePerInsurance(): Observable<any>{
    return this.http.get(endpoint + 'claims/revenue_per_insurance/?').pipe(
      map(this.extractData));
  }
  getClaimsPerInsurance(): Observable<any>{
    return this.http.get(endpoint + 'claims/claims_per_insurance/').pipe(
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
  getRevenuePerRoom(): Observable<any>{
    return this.http.get(endpoint + 'booking/revenue_per_room/').pipe(
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
  getAppointmentreports(urlparams): Observable<any>{
    return this.http.get(endpoint + 'api/reports/?'+urlparams);
  }


downloadAppointmentreports(urlparams): Observable<any>{
  return this.http.get(endpoint + 'api/reports_download/?'+urlparams);
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
      return this.http.put(endpoint + 'api/patient/'+data.id+'/', data ).pipe(
        map(this.extractData));
  }
  addVaccine(data) {
    return this.http.post(endpoint + 'api/vaccine/',data).pipe(
      map(this.extractData));
  }
  getVaccine() {
    return this.http.get(endpoint + 'api/vaccine/').pipe(
      map(this.extractData));
  }
  deleteVaccine(id) {
    return this.http.delete(endpoint + 'api/vaccine/'+id+'/').pipe(
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
    return this.http.get(endpoint + 'api/patient/').pipe(
      map(this.extractData));
  }
  getPatient(id): Observable<any> {
    return this.http.get(endpoint + 'api/patient/'+id+'/').pipe(
      map(this.extractData));
  }

  updateNextofKinData(data): Observable<any> {
    return this.http.post(endpoint + 'api/nextofkin-update/'+data.id+'/',data).pipe(
      map(this.extractData));
  }
  SearchPatientRecords(data): Observable<any> {
    return this.http.get(endpoint + 'api/patient/?search='+data).pipe(
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
    return this.http.post(endpoint + 'api/appointment/',data).pipe(
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
  console.log('dddd',data);
  return this.http.post(endpoint + 'users/login/',data).pipe(
    map(this.extractData
    ));
  }

  createUser(data): Observable<{}> {
    return this.http.post<{}>(endpoint + 'users/create-user/', data ).pipe(
      map(this.extractData
      ));
  }
  resetUser(data): Observable<{}> {
    return this.http.post<{}>(endpoint + 'users/reset-user/', data ).pipe(
      map(this.extractData
      ));
  }
  getUsers(): Observable<[]> {
    return this.http.get(endpoint + 'users/',  ).pipe(
      map(this.extractData
      ));
  }
  updateUser(data): Observable<{}> {
    return this.http.post<{}>(endpoint + 'users/update_user/', data ).pipe(
      map(this.extractData
      ));
  }
  userReset(data): Observable<{}> {
    return this.http.post<{}>(endpoint + 'users/reset_password/', data ).pipe(
      map(this.extractData
      ));
  }
  adminReset(data): Observable<{}> {
    return this.http.post<{}>(endpoint + 'users/admin/reset/', data ).pipe(
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

  completeAppointment(data){
    return this.http.post(endpoint + 'api/appointment_finish/',data).pipe(
      map(this.extractData
      ));
  } 


  completeCovidTesting(data){
    return this.http.post(endpoint + 'api/covid_testing_finish/',data).pipe(
      map(this.extractData
      ));
  } 
  feedbacks(s): Observable<any> {
    return this.http.get(endpoint + 'api/feedbacks/'+s).pipe(
      map(this.extractData));
    }
    feedbackscallpatient(id): Observable<any> {
      return this.http.get(endpoint + 'api/feedbacks/'+id).pipe(
        map(this.extractData));
      }
    callpatient(phone): Observable<any> {
      return this.http.post(endpoint + 'api/callpatient/',phone).pipe(
        map(this.extractData));
      }
    feedbacksgraph():Observable<any>{
      return this.http.get(endpoint + 'api/graphicalviewcount').pipe(
        map(this.extractData));

    }
    Bookingsvsfeedbackgraph():Observable<any>{
      return this.http.get(endpoint + 'api/averagefeedbackpiechart').pipe(
        map(this.extractData));

    }
    feedbacksgraphoutpatientpositive():Observable<any>{
      return this.http.get(endpoint + 'api/feedbackratingoutpatientpositive').pipe(
        map(this.extractData));

    }
    feedbacksgraphinpatientpositive():Observable<any>{
      return this.http.get(endpoint + 'api/feedbackratinginpatientpositive').pipe(
        map(this.extractData));

    }
    feedbacksgrapinpatient():Observable<any>{
      return this.http.get(endpoint + 'api/feedbackratinginpatient').pipe(
        map(this.extractData));

    }
    feedbacksgraphoutpatient():Observable<any>{
      return this.http.get(endpoint + 'api/feedbackratingoutpatient').pipe(
        map(this.extractData));

    }
    feedbacksgraphaverage():Observable<any>{
      return this.http.get(endpoint + 'api/graphicalview').pipe(
        map(this.extractData));
       

    }
    Allerespondents():Observable<any>{
      return this.http.get(endpoint + 'api/graphicalviewrespondents').pipe(
        map(this.extractData));
       

    }
    surgerygraphaverage():Observable<any>{
      return this.http.get(endpoint + 'api/surgeryaveragefeedbacks').pipe(
        map(this.extractData));
       

    }
    outpatientgraphaverage():Observable<any>{
      return this.http.get(endpoint + 'api/outpatientaveragefeedbacks').pipe(
        map(this.extractData));
       

    }
    inpatientgraphaverage():Observable<any>{
      return this.http.get(endpoint + 'api/inpatientaveragefeedbacks').pipe(
        map(this.extractData));
       

    }
    feedbacksgraphoutpatientnegative():Observable<any>{
      return this.http.get(endpoint + 'api/feedbackratingoutpatientnegative').pipe(
        map(this.extractData));
        // feedbackratinginpatientnegative

    }
    feedbacksgraphinpatientnegative():Observable<any>{
      return this.http.get(endpoint + 'api/feedbackratinginpatientnegative').pipe(
        map(this.extractData));
        // feedbackratinginpatientnegative

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

list():Observable<any>  {
  return this.http.get(endpoint+'api/bookings/');
}
registrations():Observable<any>  {
  return this.http.get(endpoint+'api/registrations/');
}
transit():Observable<any>  {
  return this.http.get(endpoint+'api/transit/');
}
left():Observable<any>  {
  return this.http.get(endpoint+'api/exited/');
}
within():Observable<any>  {
  return this.http.get(endpoint+'api/within/');
}


alllist():Observable<any>  {
return this.http.get(endpoint+'api/patients');
}

queuelist():Observable<any>  {
return this.http.get(endpoint+'api/queuenumber');
}


searchFor(phone): Observable<any> {
  return this.http.get(endpoint + 'api/filtering/?search='+ phone).pipe(
    map(this.extractData));
}
searchbooking(phone): Observable<any> {
  return this.http.get(endpoint + 'api/searchbooking/?search='+ phone).pipe(
    map(this.extractData));
}
searchregistrations(phone): Observable<any> {
  return this.http.get(endpoint + 'api/searchregistrations/?search='+ phone).pipe(
    map(this.extractData));
}

searchpatient(phone): Observable<any> {
  return this.http.get(endpoint + 'api/searchpatient/?search='+ phone).pipe(
    map(this.extractData));
}
searchtest(phone): Observable<any> {
  return this.http.get(endpoint + 'api/searchtest/?search='+ phone).pipe(
    map(this.extractData));
}
searchcode(code): Observable<any> {
  return this.http.get(endpoint + 'api/searchcode/?search='+ code).pipe(
    map(this.extractData));
}
searchmoney(phone): Observable<any> {
  return this.http.get(endpoint + 'api/searchRevenues/?search='+ phone).pipe(
    map(this.extractData));
}
timeslot(data): Observable<any> {
  return this.http.post(endpoint + 'api/calendar/slots/',data).pipe(
    map(this.extractData));
}
clinicsetup(data): Observable<any> {
  return this.http.post(endpoint + 'api/specialty/clinic-setup/',data).pipe(
    map(this.extractData));
}
Singleclinicsetup(data): Observable<any> {
  return this.http.post(endpoint + 'api/singleclinic/',data).pipe(
    map(this.extractData));
}
getslots() {
  return this.http.get(endpoint + 'api/slots').pipe(
    map(this.extractData));
  }
  getClinics() {
    return this.http.get(endpoint + 'api/clinicdata/').pipe(
      map(this.extractData));
    }
    getsingleClinics() {
      return this.http.get(endpoint + 'api/singleclinicdata/').pipe(
        map(this.extractData));
      }
getdepartment() {
    return this.http.get(endpoint + 'api/specialty/').pipe(
      map(this.extractData));
    }
filtercalendar(speciality) {
      return this.http.post(endpoint + 'api/specialtyfilter/',speciality).pipe(
        map(this.extractData));
      }
filtercalendarr() {
        return this.http.get(endpoint + 'api/calendar/').pipe(
          map(this.extractData));
        }
    getAllUsers(){
      return this.http.get(endpoint + 'users/staffs/').pipe(
        map(this.extractData));

    }
    getAllArchivedUsers(){
      return this.http.get(endpoint + 'users/archived/').pipe(
        map(this.extractData));

    }
  getRevenues() {
    return this.http.get(endpoint + 'payment/payments/').pipe(
      map(this.extractData));
    }
    getApadata() {
      return this.http.get(endpoint + 'api/APADATA').pipe(
        map(this.extractData));
      }
  deleteslot(id) {
    return this.http.delete(endpoint + 'api/slots/'+id+'/').pipe(
      map(this.extractData));
  }
  deleteclinic(id) {
    return this.http.delete(endpoint + 'api/deleteclinic/'+id+'/').pipe(
      map(this.extractData));
  }
  getPatientData_Hospserver(): Observable<any> {
    return this.http.get(HEALTHIX_BACKEND_URL_AAR+ 'claims/patient_experiencedata/').pipe(
      map(this.extractData));
}
getSinglePatientData_Hospserver(id): Observable<any> {
  return this.http.get(HEALTHIX_BACKEND_URL_AAR+ 'claims/patientexperience_personaldata/'+id+'/').pipe(
    map(this.extractData));
}
updateuser(data): Observable<{}> {
    return this.http.post<{}>(endpoint + 'users/update_user/', data ).pipe(
      map(this.extractData
      ));
  }
  deleteUSER(data) {
    return this.http.post(endpoint + 'users/archiveuser/',data).pipe(
      map(this.extractData));

}
restoreUSER(data) {
  return this.http.post(endpoint + 'users/restoreuser/',data).pipe(
    map(this.extractData));

}
CalendarData(specialty): Observable<any> {
  return this.http.get(endpoint + 'api/calendar/',specialty).pipe(
    map(this.extractData));
}



submitFeedbackCategory(data): Observable<any> {
  return this.http.post(endpoint+ 'api/feedback-category/',data).pipe(
    map(this.extractData));
}
submitFeedbackSubCategory(data): Observable<any> {
  return this.http.post(endpoint+ 'api/feedback-subcategory/',data).pipe(
    map(this.extractData));
}
submitFeedbackQuestion(data): Observable<any> {
  return this.http.post(endpoint+ 'api/feedback-question/',data).pipe(
    map(this.extractData));
}
updateFeedbackQuestion(id,data): Observable<any> {
  return this.http.put(endpoint+ 'api/feedback-question/'+id+"/",data).pipe(
    map(this.extractData));
}

submitFeedbackCompliment(data): Observable<any> {
  return this.http.post(endpoint+ 'api/feedback-compliment/',data).pipe(
    map(this.extractData));
}
submitFeedbackIssue(data): Observable<any> {
  return this.http.post(endpoint+ 'api/feedback-issue/',data).pipe(
    map(this.extractData));
}

getFeedbackCategory(): Observable<any> {
  return this.http.get(endpoint+ 'api/feedback-category/').pipe(
    map(this.extractData));
}
getFeedbackSubCategory(): Observable<any> {
  return this.http.get(endpoint+ 'api/feedback-subcategory/').pipe(
    map(this.extractData));
}
getFeedbackQuestion(): Observable<any> {
  return this.http.get(endpoint+ 'api/feedback-question/').pipe(
    map(this.extractData));
}
filterFeedbackQuestion(query): Observable<any> {
  return this.http.get(endpoint+ 'api/feedback-question/?search='+query).pipe(
    map(this.extractData));
}

getFeedbackCompliments(): Observable<any> {
  return this.http.get(endpoint+ 'api/feedback-compliment/').pipe(
    map(this.extractData));
}
getFeedbackIssues(): Observable<any> {
  return this.http.get(endpoint+ 'api/feedback-issue/').pipe(
    map(this.extractData));
}
deleteQuestion(data): Observable<any> {
  return this.http.post(endpoint+ 'api/feedback-question-delete/',data).pipe(
    map(this.extractData));
}

}
