import { FilterType } from '../const.js';

function isPointFuture(point) {
  return new Date(point.dateFrom) > new Date();
}

function isPointPresent(point) {
  const now = new Date();

  return new Date(point.dateFrom) <= now && new Date(point.dateTo) >= now;
}

function isPointPast(point) {
  return new Date(point.dateTo) < new Date();
}

function generateFilters(points) {
  return [
    {
      type: FilterType.EVERYTHING,
      name: 'Everything',
      isChecked: true,
      isDisabled: points.length === 0,
    },
    {
      type: FilterType.FUTURE,
      name: 'Future',
      isChecked: false,
      isDisabled: !points.some(isPointFuture),
    },
    {
      type: FilterType.PRESENT,
      name: 'Present',
      isChecked: false,
      isDisabled: !points.some(isPointPresent),
    },
    {
      type: FilterType.PAST,
      name: 'Past',
      isChecked: false,
      isDisabled: !points.some(isPointPast),
    },
  ];
}

export { generateFilters };
