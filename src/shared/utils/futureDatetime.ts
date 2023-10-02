import moment from "moment-timezone";

export const futureDatetime = (duration: number) => {
  const timeZone = "Asia/Singapore";
  const timeZoneOffsetMinutes = 8 * 60;
  const startdate = moment.tz(timeZone);

  const enddate = startdate.clone().add(duration, "minutes");
  enddate.subtract(timeZoneOffsetMinutes, "minutes");

  return enddate;
};

export const futureByDatetime = (duration: Date) => {
  const timeZone = "Asia/Singapore";
  const startdate = moment.tz(timeZone);

  // Convert the duration to minutes and add it to the startdate while considering the timezone offset
  const enddate = startdate
    .clone()
    .add(duration.getMinutes() - 8 * 60, "minutes");

  return enddate;
};
