import { render, RenderPosition } from '../render.js';
import TripInfo from '../view/trip-info.js';
import Filter from '../view/filter.js';
import Sort from '../view/sort.js';
import PointList from '../view/point-list.js';
import Point from '../view/point.js';
import EditPoint from '../view/edit-point.js';

export default class TripPresenter {
  constructor({ tripMainContainer, filterContainer, tripEventsContainer, tripModel }) {
    this._tripMainContainer = tripMainContainer;
    this._filterContainer = filterContainer;
    this._tripEventsContainer = tripEventsContainer;
    this._tripModel = tripModel;
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
    const [firstPoint] = this._tripModel.points;

    render(new EditPoint({
      point: firstPoint,
      destinations: this._tripModel.destinations,
      offers: this._tripModel.offers,
    }), listElement);

    this._tripModel.points.forEach((point) => {
      const destination = this._tripModel.destinations.find((item) => item.id === point.destinationId);
      const offers = this._tripModel.offers.filter((offer) => point.offerIds.includes(offer.id));

      render(new Point({ point, destination, offers }), listElement);
    });
  }
}
