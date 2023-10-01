function humanizeTimeDifference(targetDate: Date | string): string {
  const currentDate = new Date();
  const targetDateTime =
    typeof targetDate === "string" ? new Date(targetDate) : targetDate;

  if (isNaN(targetDateTime.getTime())) {
    return "Invalid date";
  }

  const timeDifference = targetDateTime.getTime() - currentDate.getTime();

  if (timeDifference < 0) {
    return "In the past";
  }

  const totalSeconds = Math.floor(timeDifference / 1000);
  const seconds = totalSeconds % 60;
  const totalMinutes = Math.floor(totalSeconds / 60);
  const minutes = totalMinutes % 60;
  const totalHours = Math.floor(totalMinutes / 60);
  const hours = totalHours % 24;
  const days = Math.floor(totalHours / 24);

  const timeParts = [];

  if (days > 0) {
    timeParts.push(`${days} day${days === 1 ? "" : "s"}`);
  }
  if (hours > 0) {
    timeParts.push(`${hours} hour${hours === 1 ? "" : "s"}`);
  }
  if (minutes > 0) {
    timeParts.push(`${minutes} minute${minutes === 1 ? "" : "s"}`);
  }
  if (seconds > 0) {
    timeParts.push(`${seconds} second${seconds === 1 ? "" : "s"}`);
  }

  if (timeParts.length === 0) {
    return "Just now";
  }

  return timeParts.join(", ");
}

export { humanizeTimeDifference };
