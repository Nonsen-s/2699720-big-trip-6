import { FilterType } from '../const.js';

const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter(isPointFuture),
  [FilterType.PRESENT]: (points) => points.filter(isPointPresent),
  [FilterType.PAST]: (points) => points.filter(isPointPast),
};

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

function generateFilters(points, currentFilterType) {
  return [
    {
      type: FilterType.EVERYTHING,
      name: 'Everything',
      isChecked: currentFilterType === FilterType.EVERYTHING,
      isDisabled: points.length === 0,
    },
    {
      type: FilterType.FUTURE,
      name: 'Future',
      isChecked: currentFilterType === FilterType.FUTURE,
      isDisabled: !points.some(isPointFuture),
    },
    {
      type: FilterType.PRESENT,
      name: 'Present',
      isChecked: currentFilterType === FilterType.PRESENT,
      isDisabled: !points.some(isPointPresent),
    },
    {
      type: FilterType.PAST,
      name: 'Past',
      isChecked: currentFilterType === FilterType.PAST,
      isDisabled: !points.some(isPointPast),
    },
  ];
}

export { filter, generateFilters };
