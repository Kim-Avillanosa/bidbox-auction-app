export function humanizeTimeDifference(expirationDate: Date): string {
  const now = new Date();

  if (now > expirationDate) {
    return "Expired";
  }

  const timeDifference = expirationDate.getTime() - now.getTime();
  const minutesRemaining = Math.floor(timeDifference / (1000 * 60));
  const hoursRemaining = Math.floor(minutesRemaining / 60);
  const daysRemaining = Math.floor(hoursRemaining / 24);

  if (daysRemaining > 0) {
    return `${daysRemaining}d`;
  } else if (hoursRemaining > 0) {
    return `${hoursRemaining}h`;
  } else {
    return `${minutesRemaining}m`;
  }
}
