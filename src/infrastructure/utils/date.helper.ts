export class DateHelper {
  public static getYesterday(): Date {
    const today = new Date();
    const yesterday = new Date(today);

    yesterday.setDate(yesterday.getDate() - 1);

    return yesterday;
  }

  public static get60DaysAgo(): Date {
    const today = new Date();
    const yesterday = new Date(today);

    yesterday.setDate(yesterday.getDate() - 60);

    return yesterday;
  }
  public static secToDateTime(secs) {
    return new Date(secs * 1000);
  }
}
