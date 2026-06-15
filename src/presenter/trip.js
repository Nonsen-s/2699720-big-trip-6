import { render, RenderPosition } from '../framework/render.js';
import TripInfo from '../view/trip-info.js';
import Filter from '../view/filter.js';
import Sort from '../view/sort.js';
import PointList from '../view/point-list.js';
import NoPoint from '../view/no-point.js';
import PointPresenter from './point.js';
import { FilterType } from '../const.js';
import { generateFilters } from '../utils/filter.js';
import { generateTripInfo } from '../utils/trip-info.js';

export default class TripPresenter {
  #tripMainContainer = null;
  #filterContainer = null;
  #tripEventsContainer = null;
  #tripModel = null;
  #pointPresenter = new Map();

  constructor({ tripMainContainer, filterContainer, tripEventsContainer, tripModel }) {
    this.#tripMainContainer = tripMainContainer;
    this.#filterContainer = filterContainer;
    this.#tripEventsContainer = tripEventsContainer;
    this.#tripModel = tripModel;
  }

  init() {
    if (this.#tripModel.points.length > 0) {
      this.#renderTripInfo();
    }

    this.#renderFilter();
    this.#renderTripEvents();
  }

  #renderTripInfo() {
    const tripInfo = generateTripInfo(
      this.#tripModel.points,
      this.#tripModel.destinations,
      this.#tripModel.offers
    );

    render(new TripInfo({ tripInfo }), this.#tripMainContainer, RenderPosition.AFTERBEGIN);
  }

  #renderFilter() {
    render(new Filter({ filters: generateFilters(this.#tripModel.points) }), this.#filterContainer);
  }

  #renderSort() {
    render(new Sort(), this.#tripEventsContainer);
  }

  #renderTripEvents() {
    if (this.#tripModel.points.length === 0) {
      render(new NoPoint({ filterType: FilterType.EVERYTHING }), this.#tripEventsContainer);
      return;
    }

    this.#renderSort();
    this.#renderPointList();
  }

  #renderPointList() {
    const pointList = new PointList();
    render(pointList, this.#tripEventsContainer);

    this.#tripModel.points.forEach((point) => {
      this.#renderPoint(point, pointList.element);
    });
  }

  #renderPoint(point, container) {
    const pointPresenter = new PointPresenter({
      pointListContainer: container,
      destinations: this.#tripModel.destinations,
      offers: this.#tripModel.offers,
      onDataChange: this.#handlePointChange,
      onModeChange: this.#handleModeChange,
    });

    pointPresenter.init(point);
    this.#pointPresenter.set(point.id, pointPresenter);
  }

  #handlePointChange = (updatedPoint) => {
    this.#tripModel.updatePoint(updatedPoint);
    this.#pointPresenter.get(updatedPoint.id).init(updatedPoint);
  };

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };
}
