import TripPresenter from './presenter/trip.js';

const tripMainContainer = document.querySelector('.trip-main');
const filterContainer = document.querySelector('.trip-controls__filters');
const tripEventsContainer = document.querySelector('.trip-events');

const tripPresenter = new TripPresenter({ tripMainContainer, filterContainer, tripEventsContainer });
tripPresenter.init();
