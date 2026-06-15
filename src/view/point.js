import { createElement } from '../render.js';
import { formatDate, formatDuration, formatTime } from '../utils/point.js';

export default class Point {
  constructor({ point, destination, offers = [] }) {
    this._point = point;
    this._destination = destination;
    this._offers = offers;
  }

  _renderOffers() {
    if (!this._offers.length) {
      return '';
    }
    const items = this._offers.map(({ title, price }) => `
      <li class="event__offer">
        <span class="event__offer-title">${title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${price}</span>
      </li>
    `).join('');

    return `
      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
        ${items}
      </ul>
    `;
  }

  getTemplate() {
    const { type, dateFrom, dateTo, basePrice, isFavorite } = this._point;
    const title = `${type[0].toUpperCase()}${type.slice(1)} ${this._destination.name}`;

    return `
      <li class="trip-events__item">
        <div class="event">
          <time class="event__date" datetime="${dateFrom}">${formatDate(dateFrom)}</time>
          <div class="event__type">
            <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
          </div>
          <h3 class="event__title">${title}</h3>
          <div class="event__schedule">
            <p class="event__time">
              <time class="event__start-time" datetime="${dateFrom}">${formatTime(dateFrom)}</time>
              &mdash;
              <time class="event__end-time" datetime="${dateTo}">${formatTime(dateTo)}</time>
            </p>
            <p class="event__duration">${formatDuration(dateFrom, dateTo)}</p>
          </div>
          <p class="event__price">
            &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
          </p>
          ${this._renderOffers()}
          <button class="event__favorite-btn${isFavorite ? '  event__favorite-btn--active' : ''}" type="button">
            <span class="visually-hidden">Add to favorite</span>
            <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
              <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
            </svg>
          </button>
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </div>
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
