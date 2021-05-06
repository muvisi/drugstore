import { Injectable , Inject } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { DatePipe } from '@angular/common';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
@Injectable({
  providedIn: 'root'
}
)

export class ExcelService {
constructor(private datePipe: DatePipe) { }
public exportAsExcelFile(json: any[], excelFileName: string): void {
  const title = 'Cash Paymrnts Report';
  
  json.forEach(element => {
    delete element['id']
    element['Charge Date'] = this.datePipe.transform(element['created'],'yyyy-MM-dd'),
    delete element['created'],
    element['Receipt No'] = element['no']
    delete element['no']
    element['Client'] = element.patient.first_name + ' '+element.patient.last_name,
    delete element['patient']
  });

  
  const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);

  const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };

  const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  this.saveAsExcelFile(excelBuffer, excelFileName);
}
private saveAsExcelFile(buffer: any, fileName: string): void {
   const data: Blob = new Blob([buffer], {type: EXCEL_TYPE});
   FileSaver.saveAs(data, fileName + '-' + new  Date() + EXCEL_EXTENSION);
}
}