import { generateDestinations, generateOffers, generatePoints } from '../mock/point.js';

export default class TripModel {
  constructor() {
    this._points = generatePoints();
    this._destinations = generateDestinations();
    this._offers = generateOffers();
  }

  get points() {
    return this._points;
  }

  get destinations() {
    return this._destinations;
  }

  get offers() {
    return this._offers;
  }

  updatePoint(update) {
    this._points = this._points.map((point) => point.id === update.id ? update : point);
  }
}
