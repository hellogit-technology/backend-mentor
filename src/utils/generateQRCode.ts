import QRCode from 'qrcode';
import { createCanvas, loadImage } from 'canvas';

export const generate = async (dataForQRcode: string, center_image: string | Buffer, qrcodeWidth: number = 1000, width: number = 1000, cwidth: number = 260) => {
  const canvas = createCanvas(width, width);
  QRCode.toCanvas(canvas, dataForQRcode, {
    errorCorrectionLevel: 'H',
    margin: 1,
    width: qrcodeWidth,
    color: {
      dark: '#000000',
      light: '#ffffff'
    }
  });

  const ctx = canvas.getContext('2d');
  const img = await loadImage(center_image);
  const center = (width - cwidth) / 2;
  ctx.drawImage(img, center, center, cwidth, cwidth);
  return canvas.toDataURL('image/png');
  //   fs.writeFileSync('./Test/test.png', buffer)
};
