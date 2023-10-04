export function humanizeDateTime(dateTime: Date): string {
  const now = new Date();
  const timeDifference = now.getTime() - dateTime.getTime();
  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    if (days === 1) {
      return "1 day ago";
    } else {
      return `${days} days ago`;
    }
  } else if (hours > 0) {
    if (hours === 1) {
      return "1 hour ago";
    } else {
      return `${hours} hours ago`;
    }
  } else if (minutes > 0) {
    if (minutes === 1) {
      return "1 minute ago";
    } else {
      return `${minutes} minutes ago`;
    }
  } else if (seconds >= 0) {
    if (seconds < 10) {
      return "just now";
    } else {
      return `${seconds} seconds ago`;
    }
  } else {
    return "Invalid date";
  }
}
