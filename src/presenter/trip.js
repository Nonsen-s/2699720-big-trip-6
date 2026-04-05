import { render, RenderPosition } from '../render.js';
import TripInfo from '../view/trip-info.js';
import Filter from '../view/filter.js';
import Sort from '../view/sort.js';
import PointList from '../view/point-list.js';
import Point from '../view/point.js';
import EditPoint from '../view/edit-point.js';

const MOCK_POINTS = [
  {
    type: 'taxi',
    icon: 'taxi',
    title: 'Taxi Amsterdam',
    dateISO: '2019-03-18',
    dateLabel: 'MAR 18',
    startISO: '2019-03-18T10:30',
    startTime: '10:30',
    endISO: '2019-03-18T11:00',
    endTime: '11:00',
    duration: '30M',
    price: 20,
    offers: [{ title: 'Order Uber', price: 20 }],
    isFavorite: true,
  },
  {
    type: 'flight',
    icon: 'flight',
    title: 'Flight Chamonix',
    dateISO: '2019-03-18',
    dateLabel: 'MAR 18',
    startISO: '2019-03-18T12:25',
    startTime: '12:25',
    endISO: '2019-03-18T13:35',
    endTime: '13:35',
    duration: '01H 10M',
    price: 160,
    offers: [
      { title: 'Add luggage', price: 50 },
      { title: 'Switch to comfort', price: 80 },
    ],
    isFavorite: false,
  },
  {
    type: 'drive',
    icon: 'drive',
    title: 'Drive Chamonix',
    dateISO: '2019-03-18',
    dateLabel: 'MAR 18',
    startISO: '2019-03-18T14:30',
    startTime: '14:30',
    endISO: '2019-03-18T16:05',
    endTime: '16:05',
    duration: '01H 35M',
    price: 160,
    offers: [{ title: 'Rent a car', price: 200 }],
    isFavorite: true,
  },
  {
    type: 'check-in',
    icon: 'check-in',
    title: 'Check-in Chamonix',
    dateISO: '2019-03-18',
    dateLabel: 'MAR 18',
    startISO: '2019-03-18T16:20',
    startTime: '16:20',
    endISO: '2019-03-18T17:00',
    endTime: '17:00',
    duration: '40M',
    price: 600,
    offers: [{ title: 'Add breakfast', price: 50 }],
    isFavorite: true,
  },
];

export default class TripPresenter {
  constructor({ tripMainContainer, filterContainer, tripEventsContainer }) {
    this._tripMainContainer = tripMainContainer;
    this._filterContainer = filterContainer;
    this._tripEventsContainer = tripEventsContainer;
  }

  init() {
    this._renderTripInfo();
    this._renderFilter();
    this._renderSort();
    this._renderPointList();
  }

  _renderTripInfo() {
    render(new TripInfo(), this._tripMainContainer, RenderPosition.AFTERBEGIN);
  }

  _renderFilter() {
    render(new Filter(), this._filterContainer);
  }

  _renderSort() {
    render(new Sort(), this._tripEventsContainer);
  }

  _renderPointList() {
    const pointList = new PointList();
    render(pointList, this._tripEventsContainer);

    const listElement = pointList.getElement();

    render(new EditPoint({
      id: 1,
      type: 'flight',
      destination: 'Chamonix',
      startTime: '18/03/19 12:25',
      endTime: '18/03/19 13:35',
      price: '160',
      offers: [
        { name: 'luggage', title: 'Add luggage', price: 50, checked: true },
        { name: 'comfort', title: 'Switch to comfort', price: 80, checked: true },
        { name: 'meal', title: 'Add meal', price: 15, checked: false },
        { name: 'seats', title: 'Choose seats', price: 5, checked: false },
        { name: 'train', title: 'Travel by train', price: 40, checked: false },
      ],
      description: 'Chamonix-Mont-Blanc (usually shortened to Chamonix) is a resort area near the junction of France, Switzerland and Italy.',
      photos: [],
      isNew: false,
    }), listElement);

    MOCK_POINTS.forEach((data) => {
      render(new Point(data), listElement);
    });
  }
}
