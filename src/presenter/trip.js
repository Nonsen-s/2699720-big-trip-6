import { render, remove, RenderPosition } from '../framework/render.js';
import TripInfo from '../view/trip-info.js';
import Filter from '../view/filter.js';
import Sort from '../view/sort.js';
import PointList from '../view/point-list.js';
import NoPoint from '../view/no-point.js';
import PointPresenter from './point.js';
import { FilterType, SortType } from '../const.js';
import { generateFilters } from '../utils/filter.js';
import { generateTripInfo } from '../utils/trip-info.js';
import { sortPointsByDay, sortPointsByPrice, sortPointsByTime } from '../utils/sort.js';

export default class TripPresenter {
  #tripMainContainer = null;
  #filterContainer = null;
  #tripEventsContainer = null;
  #tripModel = null;
  #pointPresenter = new Map();
  #pointListComponent = null;
  #sortComponent = null;
  #currentSortType = SortType.DAY;

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
    this.#sortComponent = new Sort({
      currentSortType: this.#currentSortType,
      onSortTypeChange: this.#handleSortTypeChange,
    });
    this.#sortComponent.setSortTypeChangeHandler();

    render(this.#sortComponent, this.#tripEventsContainer);
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
    this.#pointListComponent = new PointList();
    render(this.#pointListComponent, this.#tripEventsContainer);

    this.#getSortedPoints().forEach((point) => {
      this.#renderPoint(point, this.#pointListComponent.element);
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

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearPointList();
    this.#renderPointList();
  };

  #getSortedPoints() {
    switch (this.#currentSortType) {
      case SortType.TIME:
        return [...this.#tripModel.points].sort(sortPointsByTime);
      case SortType.PRICE:
        return [...this.#tripModel.points].sort(sortPointsByPrice);
      case SortType.DAY:
        return [...this.#tripModel.points].sort(sortPointsByDay);
    }

    return this.#tripModel.points;
  }

  #clearPointList() {
    this.#pointPresenter.clear();
    remove(this.#pointListComponent);
  }
}
