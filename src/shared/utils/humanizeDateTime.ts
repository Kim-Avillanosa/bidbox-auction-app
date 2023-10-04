export function humanizeTimeLeft(dateTime: Date): string {
  // Check if dateTime is a valid Date object
  if (!(dateTime instanceof Date) || isNaN(dateTime.getTime())) {
    return "Invalid date";
  }

  const now = new Date();
  const timeDifference = dateTime.getTime() - now.getTime();
  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 1) {
    return `${days} days`;
  } else if (days === 1) {
    return "1 day";
  } else if (hours > 1) {
    return `${hours} hours`;
  } else if (hours === 1) {
    return "1 hour";
  } else if (minutes > 1) {
    return `${minutes} minutes`;
  } else if (minutes === 1) {
    return "1 minute";
  } else if (seconds > 10) {
    return `${seconds} seconds`;
  } else {
    return "Less than 10 seconds";
  }
}
