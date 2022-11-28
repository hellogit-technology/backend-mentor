import cron from 'node-cron';

class TashSchedule {
  // Validate pattern
  checkPattern(pattern: string) {
    return cron.validate(pattern);
  }

  // Cronjob task
  makeTask(pattern: string, nameTask: string, execute: () => void, timezone: string = 'Asia/Ho_Chi_Minh') {
    if (this.checkPattern(pattern) === true) {
      return cron.schedule(pattern, execute, {
        scheduled: true,
        timezone: timezone
      });
    }
    throw new Error(`Pattern cronjob ${nameTask} is wrong.`);
  }
}

export default new TashSchedule();
