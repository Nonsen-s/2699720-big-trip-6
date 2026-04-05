import { createElement } from '../render.js';

export default class Point {
  constructor({ type, icon, title, dateISO, dateLabel, startISO, startTime, endISO, endTime, duration, price, offers = [], isFavorite = false }) {
    this._type = type;
    this._icon = icon;
    this._title = title;
    this._dateISO = dateISO;
    this._dateLabel = dateLabel;
    this._startISO = startISO;
    this._startTime = startTime;
    this._endISO = endISO;
    this._endTime = endTime;
    this._duration = duration;
    this._price = price;
    this._offers = offers;
    this._isFavorite = isFavorite;
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
    return `
      <li class="trip-events__item">
        <div class="event">
          <time class="event__date" datetime="${this._dateISO}">${this._dateLabel}</time>
          <div class="event__type">
            <img class="event__type-icon" width="42" height="42" src="img/icons/${this._icon}.png" alt="Event type icon">
          </div>
          <h3 class="event__title">${this._title}</h3>
          <div class="event__schedule">
            <p class="event__time">
              <time class="event__start-time" datetime="${this._startISO}">${this._startTime}</time>
              &mdash;
              <time class="event__end-time" datetime="${this._endISO}">${this._endTime}</time>
            </p>
            <p class="event__duration">${this._duration}</p>
          </div>
          <p class="event__price">
            &euro;&nbsp;<span class="event__price-value">${this._price}</span>
          </p>
          ${this._renderOffers()}
          <button class="event__favorite-btn${this._isFavorite ? '  event__favorite-btn--active' : ''}" type="button">
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
