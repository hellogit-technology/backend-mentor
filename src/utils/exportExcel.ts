import XLSX, { WritingOptions } from 'xlsx';
import { Response } from 'express';
import moment from 'moment-timezone';

export const exportExcel = (res: Response, data: any[], workSheetColumnNames: [], workSheetName: string, fileName: string) => {
  const workBook = XLSX.utils.book_new();
  const workSheetData = [workSheetColumnNames, ...data];
  const workSheet = XLSX.utils.aoa_to_sheet(workSheetData);
  XLSX.utils.book_append_sheet(workBook, workSheet, workSheetName);
  const buffer: Buffer = XLSX.write(workBook, { type: 'buffer' });

  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.setHeader('Content-Disposition', `attachment; filename=${fileName}_${moment(Date.now()).tz('Asia/Ho_Chi_Minh').format('YYYYMMDDHHmmss')}.xlsx`);
  res.send(buffer);
};
