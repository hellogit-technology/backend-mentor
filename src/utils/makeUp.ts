import chalk from 'chalk';

export const printErrorLog = (log: unknown) => {
  if (process.env.NODE_ENV === 'development') {
    return console.log(chalk.red.bold(String(log)));
  }
  console.error(log);
};

export const printLog = (log: unknown) => {
  if (process.env.NODE_ENV === 'development') {
    return console.log(chalk.green.bold(String(log)));
  }
  console.log(log);
};
