import { Response } from 'express';
import PDFDocument from 'pdfkit';
import { getFullFormat } from '../utils/getTime';

export const exportPDF = (data: string[], res: Response) => {
  const pdfFileName = `warning-excel-${getFullFormat(new Date(), 'HH:mm:ss_DD-MM-YYYY')}.pdf`;
  const doc = new PDFDocument({ bufferPages: true, font: 'Courier' });
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename=${pdfFileName}`);
  doc.pipe(res);
  data.forEach((item) => doc.fontSize(12).text(item));
  doc.end();
};
