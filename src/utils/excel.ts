import FileDownload from 'js-file-download';
import * as Excel from 'exceljs';

export function formatDate(date: string): string {
  let monthString = '';
  let dayString = '';
  const d = new Date(date);
  const month = d.getMonth() + 1;
  if (month < 10) {
    monthString = `0${month}`;
  } else {
    monthString = `${month}`;
  }
  const day = d.getDate();
  if (day < 10) {
    dayString = `0${day}`;
  } else {
    dayString = `${day}`;
  }
  const year = d.getFullYear();
  return `${monthString}/${dayString}/${year}`;
}

export function getHeaders(arr: object[]): object[] {
  let headerAccumulator: string[] = [];
  arr.forEach(el => {
    const rowHeaders = Object.keys(el);
    headerAccumulator = [...new Set([...rowHeaders, ...headerAccumulator])];
  });
  headerAccumulator.sort();
  return headerAccumulator.map(el => {
    return {
      header: el,
      key: el,
    };
  });
}

export function createNewExcelFile(data: object[], headers: object[]): void {
  // A new Excel Work Book
  const workbook = new Excel.Workbook();
  workbook.creator = 'Marhub Dashboard';
  workbook.lastModifiedBy = '';
  workbook.created = new Date();
  workbook.modified = new Date();
  workbook.lastPrinted = new Date();

  const sheet = workbook.addWorksheet('Data');
  sheet.columns = headers;
  sheet.addRows(data);
  const buffer = workbook.xlsx.writeBuffer();
  buffer.then(res => {
    FileDownload(res, 'data.xlsx');
  });
}
