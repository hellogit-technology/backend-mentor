import QRCode from 'qrcode';
import { createCanvas, loadImage } from 'canvas';

export const generate = async (dataForQRcode: string, center_image: string | Buffer, width: number, cwidth: number) => {
  const canvas = createCanvas(width, width);
  QRCode.toCanvas(canvas, dataForQRcode, {
    errorCorrectionLevel: 'H',
    margin: 1,
    width: 2000,
    color: {
      dark: '#000000',
      light: '#ffffff'
    }
  });

  const ctx = canvas.getContext('2d');
  const img = await loadImage(center_image);
  const center = (width - cwidth) / 2;
  ctx.drawImage(img, center, center, cwidth, cwidth);
  return canvas.toBuffer('image/png');
  //   fs.writeFileSync('./Test/test.png', buffer)
};

// async function main() {
//   const qrCode = await create(
//     "https://www.facebook.com/HelloGIT/",
//     "https://scontent.fsgn5-10.fna.fbcdn.net/v/t1.6435-9/174778230_108505938033932_7081346593915929970_n.png?_nc_cat=110&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=dgrD0FaqVgYAX9w-v7u&_nc_ht=scontent.fsgn5-10.fna&oh=00_AT8oCY_Dl6Y0pK3vNSBt8fNvCgv3jHEmmymViNocSGYKmA&oe=62FD1B1B",
//     2000,
//     800
//   );
// }

// main();
