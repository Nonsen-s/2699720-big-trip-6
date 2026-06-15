import AbstractView from '../framework/view/abstract-view.js';
import { EVENT_TYPES } from '../const.js';
import { formatEditDate } from '../utils/point.js';

const DEFAULT_POINT = {
  id: 'new-point',
  type: 'flight',
  destinationId: '',
  offerIds: [],
  dateFrom: '',
  dateTo: '',
  basePrice: '',
};

export default class EditPoint extends AbstractView {
  #point = null;
  #destinations = [];
  #offers = [];
  #isNew = false;
  #handleFormSubmit = null;
  #handleRollupClick = null;

  constructor({ point = DEFAULT_POINT, destinations = [], offers = [], isNew = false } = {}) {
    super();
    this.#point = point;
    this.#destinations = destinations;
    this.#offers = offers;
    this.#isNew = isNew;
  }

  #renderTypeItems() {
    const { id, type } = this.#point;

    return EVENT_TYPES.map((t) => `
      <div class="event__type-item">
        <input id="event-type-${t}-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${t}"${t === type ? ' checked' : ''}>
        <label class="event__type-label  event__type-label--${t}" for="event-type-${t}-${id}">${t.charAt(0).toUpperCase() + t.slice(1)}</label>
      </div>
    `).join('');
  }

  #renderDestinationOptions() {
    return this.#destinations.map(({ name }) => `<option value="${name}"></option>`).join('');
  }

  #renderOffers() {
    const offersByType = this.#offers.filter((offer) => offer.type === this.#point.type);

    if (!offersByType.length) {
      return '';
    }

    const items = offersByType.map(({ id, title, price }) => `
      <div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${id}" type="checkbox" name="event-offer-${id}"${this.#point.offerIds.includes(id) ? ' checked' : ''}>
        <label class="event__offer-label" for="event-offer-${id}">
          <span class="event__offer-title">${title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${price}</span>
        </label>
      </div>
    `).join('');

    return `
      <section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>
        <div class="event__available-offers">
          ${items}
        </div>
      </section>
    `;
  }

  #renderDestinationDetails() {
    const destination = this.#destinations.find((item) => item.id === this.#point.destinationId);

    if (!destination || (!destination.description && !destination.pictures.length)) {
      return '';
    }

    const photosHtml = destination.pictures.length ? `
      <div class="event__photos-container">
        <div class="event__photos-tape">
          ${destination.pictures.map(({ src, description }) => `<img class="event__photo" src="${src}" alt="${description}">`).join('')}
        </div>
      </div>
    ` : '';

    return `
      <section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        ${destination.description ? `<p class="event__destination-description">${destination.description}</p>` : ''}
        ${photosHtml}
      </section>
    `;
  }

  #renderDetails() {
    const offersHtml = this.#renderOffers();
    const destinationHtml = this.#renderDestinationDetails();
    if (!offersHtml && !destinationHtml) {
      return '';
    }
    return `
      <section class="event__details">
        ${offersHtml}
        ${destinationHtml}
      </section>
    `;
  }

  get template() {
    const { id, type, destinationId, dateFrom, dateTo, basePrice } = this.#point;
    const typeLabel = type.charAt(0).toUpperCase() + type.slice(1);
    const destination = this.#destinations.find((item) => item.id === destinationId);
    const resetLabel = this.#isNew ? 'Cancel' : 'Delete';
    const destinationName = destination ? destination.name : '';
    const startTime = dateFrom ? formatEditDate(dateFrom) : '';
    const endTime = dateTo ? formatEditDate(dateTo) : '';

    return `
      <li class="trip-events__item">
        <form class="event event--edit" action="#" method="post">
          <header class="event__header">
            <div class="event__type-wrapper">
              <label class="event__type  event__type-btn" for="event-type-toggle-${id}">
                <span class="visually-hidden">Choose event type</span>
                <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
              </label>
              <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${id}" type="checkbox">

              <div class="event__type-list">
                <fieldset class="event__type-group">
                  <legend class="visually-hidden">Event type</legend>
                  ${this.#renderTypeItems()}
                </fieldset>
              </div>
            </div>

            <div class="event__field-group  event__field-group--destination">
              <label class="event__label  event__type-output" for="event-destination-${id}">
                ${typeLabel}
              </label>
              <input class="event__input  event__input--destination" id="event-destination-${id}" type="text" name="event-destination" value="${destinationName}" list="destination-list-${id}">
              <datalist id="destination-list-${id}">
                ${this.#renderDestinationOptions()}
              </datalist>
            </div>

            <div class="event__field-group  event__field-group--time">
              <label class="visually-hidden" for="event-start-time-${id}">From</label>
              <input class="event__input  event__input--time" id="event-start-time-${id}" type="text" name="event-start-time" value="${startTime}">
              &mdash;
              <label class="visually-hidden" for="event-end-time-${id}">To</label>
              <input class="event__input  event__input--time" id="event-end-time-${id}" type="text" name="event-end-time" value="${endTime}">
            </div>

            <div class="event__field-group  event__field-group--price">
              <label class="event__label" for="event-price-${id}">
                <span class="visually-hidden">Price</span>
                &euro;
              </label>
              <input class="event__input  event__input--price" id="event-price-${id}" type="text" name="event-price" value="${basePrice}">
            </div>

            <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
            <button class="event__reset-btn" type="reset">${resetLabel}</button>
            ${!this.#isNew ? `
            <button class="event__rollup-btn" type="button">
              <span class="visually-hidden">Open event</span>
            </button>` : ''}
          </header>
          ${this.#renderDetails()}
        </form>
      </li>
    `;
  }

  setFormSubmitHandler(callback) {
    this.#handleFormSubmit = callback;
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
  }

  setRollupClickHandler(callback) {
    this.#handleRollupClick = callback;

    if (!this.#isNew) {
      this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#rollupClickHandler);
    }
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit();
  };

  #rollupClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleRollupClick();
  };
}
