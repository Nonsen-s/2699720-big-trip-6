import TripPresenter from './presenter/trip.js';
import TripModel from './model/trip-model.js';

const tripMainContainer = document.querySelector('.trip-main');
const filterContainer = document.querySelector('.trip-controls__filters');
const tripEventsContainer = document.querySelector('.trip-events');

const tripModel = new TripModel();
const tripPresenter = new TripPresenter({ tripMainContainer, filterContainer, tripEventsContainer, tripModel });
tripPresenter.init();
