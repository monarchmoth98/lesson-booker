export class DateHelper {
  public findWeekStartDate(date: Date): Date {
    let weekStartDate: Date = date;
    const dayOfWeek: number = date.getDay();

    if (dayOfWeek != 1) {
      const difference: number = 1 - dayOfWeek;
      weekStartDate = new Date(weekStartDate.setDate(weekStartDate.getDate() + difference));
    }

    return weekStartDate;
  }
}
