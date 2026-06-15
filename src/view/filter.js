import AbstractView from '../framework/view/abstract-view.js';

export default class Filter extends AbstractView {
  #filters = [];

  constructor({ filters }) {
    super();
    this.#filters = filters;
  }

  #renderFilter({ type, name, isChecked, isDisabled }) {
    return `
      <div class="trip-filters__filter">
        <input id="filter-${type}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${type}"${isChecked ? ' checked' : ''}${isDisabled ? ' disabled' : ''}>
        <label class="trip-filters__filter-label" for="filter-${type}">${name}</label>
      </div>
    `;
  }

  get template() {
    return `
      <form class="trip-filters" action="#" method="get">
        ${this.#filters.map((filter) => this.#renderFilter(filter)).join('')}
        <button class="visually-hidden" type="submit">Accept filter</button>
      </form>
    `;
  }
}
