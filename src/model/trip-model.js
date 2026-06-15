import { generateDestinations, generateOffers, generatePoints } from '../mock/point.js';
import Observable from '../framework/observable.js';

export default class TripModel extends Observable {
  constructor() {
    super();
    this._points = generatePoints();
    this._destinations = generateDestinations();
    this._offers = generateOffers();
  }

  get points() {
    return this._points;
  }

  set points(points) {
    this._points = points;
  }

  get destinations() {
    return this._destinations;
  }

  get offers() {
    return this._offers;
  }

  setPoints(updateType, points) {
    this._points = points;
    this._notify(updateType, points);
  }

  updatePoint(updateType, update) {
    this._points = this._points.map((point) => point.id === update.id ? update : point);
    this._notify(updateType, update);
  }

  addPoint(updateType, update) {
    this._points = [
      update,
      ...this._points,
    ];
    this._notify(updateType, update);
  }

  deletePoint(updateType, update) {
    this._points = this._points.filter((point) => point.id !== update.id);
    this._notify(updateType);
  }
}
