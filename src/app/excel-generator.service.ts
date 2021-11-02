import { Injectable } from '@angular/core';

import * as Excel from "exceljs/dist/exceljs.min.js";
import * as ExcelProper from "exceljs";
import * as fs from 'file-saver';

import { DatePipe } from '@angular/common';



@Injectable({
  providedIn: 'root'
})
export class ExcelGeneratorService {

  constructor(public datepipe: DatePipe) { }

  generate(title,header,data){
    let workbook = new Excel.Workbook();
    let worksheet = workbook.addWorksheet('One');
    
    worksheet.pageSetup.horizontalCentered=true;
    worksheet.pageSetup.verticalCentered=true;

    let titleRow = worksheet.addRow([title]);

    worksheet.mergeCells('A1:G1');
    worksheet.getCell('A1').alignment = { vertical: 'middle', horizontal: 'center' };
    // Set font, size and style in title row.
    titleRow.font = { name: 'Candara', family: 4, size: 16, underline: 'single', bold: true, align:'center' };
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
  worksheet.columns.forEach(function (column, i) {
  
        var maxLength = 0;
        column["eachCell"]({ includeEmpty: true }, function (cell) {
            var columnLength = cell.value ? (cell.value.toString().length)/2 : 10;
            if (columnLength > maxLength ) {
                maxLength = columnLength;
            }
        });
        column.width = maxLength < 10 ? 10 : maxLength;
    
});
  workbook.xlsx.writeBuffer().then((data) => {
    let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    fs.saveAs(blob, title+'.xlsx');
});


  }
}
