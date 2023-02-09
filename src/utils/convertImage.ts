import axios from 'axios';
import DatauriParser from 'datauri/parser';
const parser = new DatauriParser();

export const getBase64Image = async (url: string) => {
  const response = await axios.get(url, { responseType: 'arraybuffer' });
  const buffer = Buffer.from(response.data, 'utf-8');
  return parser.format('.png', buffer).content;
};
