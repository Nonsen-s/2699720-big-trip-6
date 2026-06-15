const DateFormat = {
  DATE: { month: 'short', day: 'numeric' },
  TIME: { hour: '2-digit', minute: '2-digit' },
};

function formatDate(date) {
  return new Intl.DateTimeFormat('en-US', DateFormat.DATE)
    .format(new Date(date))
    .toUpperCase();
}

function formatTime(date) {
  return new Intl.DateTimeFormat('en-GB', DateFormat.TIME).format(new Date(date));
}

function formatEditDate(date) {
  const parsedDate = new Date(date);
  const day = String(parsedDate.getDate()).padStart(2, '0');
  const month = String(parsedDate.getMonth() + 1).padStart(2, '0');
  const year = String(parsedDate.getFullYear()).slice(-2);
  const hours = String(parsedDate.getHours()).padStart(2, '0');
  const minutes = String(parsedDate.getMinutes()).padStart(2, '0');

  return `${day}/${month}/${year} ${hours}:${minutes}`;
}

function formatDuration(dateFrom, dateTo) {
  const duration = new Date(dateTo) - new Date(dateFrom);
  const totalMinutes = Math.floor(duration / 60000);
  const days = Math.floor(totalMinutes / 1440);
  const hours = Math.floor((totalMinutes % 1440) / 60);
  const minutes = totalMinutes % 60;

  if (days > 0) {
    return `${String(days).padStart(2, '0')}D ${String(hours).padStart(2, '0')}H ${String(minutes).padStart(2, '0')}M`;
  }

  if (hours > 0) {
    return `${String(hours).padStart(2, '0')}H ${String(minutes).padStart(2, '0')}M`;
  }

  return `${String(minutes).padStart(2, '0')}M`;
}

export { formatDate, formatTime, formatEditDate, formatDuration };
