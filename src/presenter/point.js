import { render, replace } from '../framework/render.js';
import Point from '../view/point.js';
import EditPoint from '../view/edit-point.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class PointPresenter {
  #pointListContainer = null;
  #destinations = [];
  #offers = [];
  #handleDataChange = null;
  #handleModeChange = null;
  #pointComponent = null;
  #editPointComponent = null;
  #point = null;
  #mode = Mode.DEFAULT;

  constructor({ pointListContainer, destinations, offers, onDataChange, onModeChange }) {
    this.#pointListContainer = pointListContainer;
    this.#destinations = destinations;
    this.#offers = offers;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
  }

  init(point) {
    this.#point = point;

    const prevPointComponent = this.#pointComponent;
    const prevEditPointComponent = this.#editPointComponent;

    this.#pointComponent = new Point({
      point: this.#point,
      destination: this.#destinations.find((item) => item.id === this.#point.destinationId),
      offers: this.#offers.filter((offer) => this.#point.offerIds.includes(offer.id)),
    });

    this.#editPointComponent = new EditPoint({
      point: this.#point,
      destinations: this.#destinations,
      offers: this.#offers,
    });

    this.#pointComponent.setEditClickHandler(() => {
      this.#handleModeChange();
      this.#replaceCardToForm();
    });

    this.#pointComponent.setFavoriteClickHandler(() => {
      this.#handleDataChange({
        ...this.#point,
        isFavorite: !this.#point.isFavorite,
      });
    });

    this.#editPointComponent.setFormSubmitHandler(() => {
      this.#replaceFormToCard();
    });

    this.#editPointComponent.setRollupClickHandler(() => {
      this.#replaceFormToCard();
    });

    if (prevPointComponent === null || prevEditPointComponent === null) {
      render(this.#pointComponent, this.#pointListContainer);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#pointComponent, prevEditPointComponent);
      this.#mode = Mode.DEFAULT;
    }
  }

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceFormToCard();
    }
  }

  #replaceCardToForm() {
    replace(this.#editPointComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escKeydownHandler);
    this.#mode = Mode.EDITING;
  }

  #replaceFormToCard() {
    replace(this.#pointComponent, this.#editPointComponent);
    document.removeEventListener('keydown', this.#escKeydownHandler);
    this.#mode = Mode.DEFAULT;
  }

  #escKeydownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#replaceFormToCard();
    }
  };
}
