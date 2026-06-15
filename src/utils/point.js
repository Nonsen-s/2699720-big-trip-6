import dayjs from 'dayjs';

function formatDate(date) {
  return dayjs(date).format('MMM D').toUpperCase();
}

function formatTime(date) {
  return dayjs(date).format('HH:mm');
}

function formatEditDate(date) {
  return dayjs(date).format('DD/MM/YY HH:mm');
}

function formatDuration(dateFrom, dateTo) {
  const totalMinutes = dayjs(dateTo).diff(dayjs(dateFrom), 'minute');
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
