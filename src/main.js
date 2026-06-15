import TripPresenter from './presenter/trip.js';
import FilterPresenter from './presenter/filter.js';
import TripModel from './model/trip-model.js';
import FilterModel from './model/filter-model.js';
import TripApiService from './trip-api-service.js';
import { UpdateType } from './const.js';

const END_POINT = 'https://21.objects.pages.academy/big-trip';
const AUTHORIZATION = 'Basic ns2699720-8-big-trip';

const tripMainContainer = document.querySelector('.trip-main');
const filterContainer = document.querySelector('.trip-controls__filters');
const tripEventsContainer = document.querySelector('.trip-events');
const newPointButton = document.querySelector('.trip-main__event-add-btn');

const tripApiService = new TripApiService(END_POINT, AUTHORIZATION);
const tripModel = new TripModel({ tripApiService });
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

newPointButton.disabled = true;

filterPresenter.init();
tripPresenter.init();

tripModel.addObserver((updateType) => {
  if (updateType === UpdateType.INIT && tripModel.destinations.length > 0) {
    newPointButton.disabled = false;
  }
});

tripModel.init();

newPointButton.addEventListener('click', () => {
  newPointButton.disabled = true;
  tripPresenter.createPoint();
});
