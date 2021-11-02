import { Injectable } from '@angular/core';

import { Workbook } from 'exceljs';

import * as fs from 'file-saver';
import { DatePipe } from '@angular/common';



@Injectable({
  providedIn: 'root'
})
export class ExcelGeneratorService {

  constructor(public datepipe: DatePipe) { }

  generate(title,header,data){
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('One');
    let titleRow = worksheet.addRow([title]);
    // Set font, size and style in title row.
    titleRow.font = { name: 'Comic Sans MS', family: 4, size: 16, underline: 'double', bold: true };
    // Blank Row
    worksheet.addRow([]);
    //Add row with current date
    let subTitleRow = worksheet.addRow(['Date : ' + this.datepipe.transform(new Date(), 'medium')]);
    //Add Header Row
  let headerRow = worksheet.addRow(header);
  // Cell Style : Fill and Border
  headerRow.eachCell((cell, number) => {
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFFFFF00' },
      bgColor: { argb: 'FF0000FF' }
    }
    cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
  });
  worksheet.addRows(data);
  workbook.xlsx.writeBuffer().then((data) => {
    let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    fs.saveAs(blob, title+'.xlsx');
});


  }
}
