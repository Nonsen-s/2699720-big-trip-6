import TripPresenter from './presenter/trip.js';
import FilterPresenter from './presenter/filter.js';
import TripModel from './model/trip-model.js';
import FilterModel from './model/filter-model.js';

const tripMainContainer = document.querySelector('.trip-main');
const filterContainer = document.querySelector('.trip-controls__filters');
const tripEventsContainer = document.querySelector('.trip-events');
const newPointButton = document.querySelector('.trip-main__event-add-btn');

const tripModel = new TripModel();
const filterModel = new FilterModel();
const tripPresenter = new TripPresenter({
  tripMainContainer,
  tripEventsContainer,
  tripModel,
  filterModel,
  onNewPointDestroy: () => {
    newPointButton.disabled = false;
  },
});
const filterPresenter = new FilterPresenter({ filterContainer, filterModel, tripModel });

filterPresenter.init();
tripPresenter.init();

newPointButton.addEventListener('click', () => {
  newPointButton.disabled = true;
  tripPresenter.createPoint();
});
