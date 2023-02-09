export const getMonth = () => {
  const date = new Date();
  const month = date.getMonth() + 1;
  return month;
};
