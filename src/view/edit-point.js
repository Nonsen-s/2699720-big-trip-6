import { createElement } from '../render.js';

const EVENT_TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];
const DESTINATIONS = ['Amsterdam', 'Geneva', 'Chamonix'];

export default class EditPoint {
  constructor({
    id = 1,
    type = 'flight',
    destination = 'Chamonix',
    startTime = '18/03/19 12:25',
    endTime = '18/03/19 13:35',
    price = '160',
    offers = [],
    description = '',
    photos = [],
    isNew = false,
  } = {}) {
    this._id = id;
    this._type = type;
    this._destination = destination;
    this._startTime = startTime;
    this._endTime = endTime;
    this._price = price;
    this._offers = offers;
    this._description = description;
    this._photos = photos;
    this._isNew = isNew;
  }

  _renderTypeItems() {
    return EVENT_TYPES.map((t) => `
      <div class="event__type-item">
        <input id="event-type-${t}-${this._id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${t}"${t === this._type ? ' checked' : ''}>
        <label class="event__type-label  event__type-label--${t}" for="event-type-${t}-${this._id}">${t.charAt(0).toUpperCase() + t.slice(1)}</label>
      </div>
    `).join('');
  }

  _renderDestinationOptions() {
    return DESTINATIONS.map((d) => `<option value="${d}"></option>`).join('');
  }

  _renderOffers() {
    if (!this._offers.length) {
      return '';
    }
    const items = this._offers.map(({ name, title, price, checked }) => `
      <div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${name}-${this._id}" type="checkbox" name="event-offer-${name}"${checked ? ' checked' : ''}>
        <label class="event__offer-label" for="event-offer-${name}-${this._id}">
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

  _renderDestinationDetails() {
    if (!this._description && !this._photos.length) {
      return '';
    }

    const photosHtml = this._photos.length ? `
      <div class="event__photos-container">
        <div class="event__photos-tape">
          ${this._photos.map((src) => `<img class="event__photo" src="${src}" alt="Event photo">`).join('')}
        </div>
      </div>
    ` : '';

    return `
      <section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        ${this._description ? `<p class="event__destination-description">${this._description}</p>` : ''}
        ${photosHtml}
      </section>
    `;
  }

  _renderDetails() {
    const offersHtml = this._renderOffers();
    const destinationHtml = this._renderDestinationDetails();
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

  getTemplate() {
    const typeLabel = this._type.charAt(0).toUpperCase() + this._type.slice(1);
    const resetLabel = this._isNew ? 'Cancel' : 'Delete';

    return `
      <li class="trip-events__item">
        <form class="event event--edit" action="#" method="post">
          <header class="event__header">
            <div class="event__type-wrapper">
              <label class="event__type  event__type-btn" for="event-type-toggle-${this._id}">
                <span class="visually-hidden">Choose event type</span>
                <img class="event__type-icon" width="17" height="17" src="img/icons/${this._type}.png" alt="Event type icon">
              </label>
              <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${this._id}" type="checkbox">

              <div class="event__type-list">
                <fieldset class="event__type-group">
                  <legend class="visually-hidden">Event type</legend>
                  ${this._renderTypeItems()}
                </fieldset>
              </div>
            </div>

            <div class="event__field-group  event__field-group--destination">
              <label class="event__label  event__type-output" for="event-destination-${this._id}">
                ${typeLabel}
              </label>
              <input class="event__input  event__input--destination" id="event-destination-${this._id}" type="text" name="event-destination" value="${this._destination}" list="destination-list-${this._id}">
              <datalist id="destination-list-${this._id}">
                ${this._renderDestinationOptions()}
              </datalist>
            </div>

            <div class="event__field-group  event__field-group--time">
              <label class="visually-hidden" for="event-start-time-${this._id}">From</label>
              <input class="event__input  event__input--time" id="event-start-time-${this._id}" type="text" name="event-start-time" value="${this._startTime}">
              &mdash;
              <label class="visually-hidden" for="event-end-time-${this._id}">To</label>
              <input class="event__input  event__input--time" id="event-end-time-${this._id}" type="text" name="event-end-time" value="${this._endTime}">
            </div>

            <div class="event__field-group  event__field-group--price">
              <label class="event__label" for="event-price-${this._id}">
                <span class="visually-hidden">Price</span>
                &euro;
              </label>
              <input class="event__input  event__input--price" id="event-price-${this._id}" type="text" name="event-price" value="${this._price}">
            </div>

            <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
            <button class="event__reset-btn" type="reset">${resetLabel}</button>
            ${!this._isNew ? `
            <button class="event__rollup-btn" type="button">
              <span class="visually-hidden">Open event</span>
            </button>` : ''}
          </header>
          ${this._renderDetails()}
        </form>
      </li>
    `;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }
}
