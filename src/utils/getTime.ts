import moment from 'moment-timezone';

export const getMonth = () => {
  const date = new Date();
  const month = date.getMonth() + 1;
  return month;
};

export const getFullFormat = (value?: string | Date, format: string = 'DD/MM/YYYY', tz: string = 'Asia/Ho_Chi_Minh') => {
  if (!value) {
    return '';
  }
  const data = moment(value);
  if (!data.isValid()) {
    return value;
  }
  data.tz(tz);
  return data.format(format);
};
