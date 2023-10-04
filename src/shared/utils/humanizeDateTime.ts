import moment from "moment";

export const getEndDate = (milliseconds: number) => {
  const now = moment();
  const endDate = moment(now).add(milliseconds, "milliseconds");

  return endDate.format("YYYY-MM-DD hh:mm A").toString();
};

export function humanizeTimeLeftByDuration(milliseconds: number): string {
  const now = moment();
  const endDate = moment(now).add(milliseconds, "milliseconds");

  if (now.isAfter(endDate)) {
    return "Time has already passed.";
  }

  const duration = moment.duration(endDate.diff(now));
  const days = duration.days();
  const hours = duration.hours();
  const minutes = duration.minutes();

  const timeComponents: string[] = [];

  if (days > 0) {
    timeComponents.push(`${days} day${days > 1 ? "s" : ""}`);
  }

  if (hours > 0) {
    timeComponents.push(`${hours} hour${hours > 1 ? "s" : ""}`);
  }

  if (minutes > 0) {
    timeComponents.push(`${minutes} minute${minutes > 1 ? "s" : ""}`);
  }

  // Handle the case when there are no days but some hours and minutes
  if (days === 0 && timeComponents.length > 1) {
    return (
      timeComponents.slice(0, -1).join(", ") +
      " and " +
      timeComponents.slice(-1)
    );
  }

  return endDate.format("YYYY-MM-DD hh:mm A");
}

export function humanizeTimeLeft(targetDate: Date): string {
  const now = moment();
  const endDate = moment(targetDate);

  if (now.isAfter(endDate)) {
    return "Time has already passed.";
  }

  const duration = moment.duration(endDate.diff(now));
  const days = duration.days();
  const hours = duration.hours();
  const minutes = duration.minutes();

  const timeComponents: string[] = [];

  if (days > 0) {
    timeComponents.push(`${days} day${days > 1 ? "s" : ""}`);
  }

  if (hours > 0) {
    timeComponents.push(`${hours} hour${hours > 1 ? "s" : ""}`);
  }

  if (minutes > 0) {
    timeComponents.push(`${minutes} minute${minutes > 1 ? "s" : ""}`);
  }

  // Handle the case when there are no days but some hours and minutes
  if (days === 0 && timeComponents.length > 1) {
    return (
      timeComponents.slice(0, -1).join(", ") +
      " and " +
      timeComponents.slice(-1)
    );
  }

  return timeComponents.join(", ");
}
