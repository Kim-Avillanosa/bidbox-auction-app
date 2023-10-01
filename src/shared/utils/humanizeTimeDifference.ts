import * as moment from "moment-timezone";

export function convertToDesiredTimezone(inputDate: string): string {
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const convertedDate = moment.tz(inputDate, "UTC+08").tz(tz);
  return convertedDate.format("YYYY-MM-DD HH:mm:ss");
}

export function calculateDurationRemaining(targetDatetime: string): string {
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const targetDatetimeMoment = moment.tz(targetDatetime, "UTC+08");
  const currentDatetimeMoment = moment.tz(targetDatetime);

  if (currentDatetimeMoment.isAfter(targetDatetimeMoment)) {
    return "The target datetime has already passed."; // Output when the target datetime has passed
  }

  const duration = moment.duration(
    targetDatetimeMoment.diff(currentDatetimeMoment)
  );
  const days = duration.days();
  const hours = duration.hours();
  const minutes = duration.minutes();

  return `${days}d ${hours}h ${minutes}s`; // Output when there's time remaining
}
