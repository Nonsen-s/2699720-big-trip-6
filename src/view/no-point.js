import AbstractView from '../framework/view/abstract-view.js';
import { FilterType, NoPointTextType } from '../const.js';

export default class NoPoint extends AbstractView {
  #filterType = null;

  constructor({ filterType = FilterType.EVERYTHING } = {}) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return `<p class="trip-events__msg">${NoPointTextType[this.#filterType]}</p>`;
  }
}
