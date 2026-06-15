import { render, replace, RenderPosition } from '../framework/render.js';
import TripInfo from '../view/trip-info.js';
import Filter from '../view/filter.js';
import Sort from '../view/sort.js';
import PointList from '../view/point-list.js';
import Point from '../view/point.js';
import EditPoint from '../view/edit-point.js';
import NoPoint from '../view/no-point.js';
import { FilterType } from '../const.js';
import { generateFilters } from '../utils/filter.js';
import { generateTripInfo } from '../utils/trip-info.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class TripPresenter {
  #tripMainContainer = null;
  #filterContainer = null;
  #tripEventsContainer = null;
  #tripModel = null;

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
    const destination = this.#tripModel.destinations.find((item) => item.id === point.destinationId);
    const selectedOffers = this.#tripModel.offers.filter((offer) => point.offerIds.includes(offer.id));
    const pointComponent = new Point({ point, destination, offers: selectedOffers });
    const editPointComponent = new EditPoint({
      point,
      destinations: this.#tripModel.destinations,
      offers: this.#tripModel.offers,
    });
    let mode = Mode.DEFAULT;

    const replaceCardToForm = () => {
      if (mode === Mode.EDITING) {
        return;
      }

      replace(editPointComponent, pointComponent);
      document.addEventListener('keydown', onEscKeydown);
      mode = Mode.EDITING;
    };

    const replaceFormToCard = () => {
      if (mode === Mode.DEFAULT) {
        return;
      }

      replace(pointComponent, editPointComponent);
      document.removeEventListener('keydown', onEscKeydown);
      mode = Mode.DEFAULT;
    };

    function onEscKeydown(evt) {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceFormToCard();
      }
    }

    pointComponent.setEditClickHandler(() => {
      replaceCardToForm();
    });

    editPointComponent.setFormSubmitHandler(() => {
      replaceFormToCard();
    });

    editPointComponent.setRollupClickHandler(() => {
      replaceFormToCard();
    });

    render(pointComponent, container);
  }
}
