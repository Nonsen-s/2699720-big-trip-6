import { EventType } from '../const.js';

const DESCRIPTIONS = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
];

const DESTINATIONS = [
  {
    id: 'destination-1',
    name: 'Amsterdam',
    description: `${DESCRIPTIONS[0]} ${DESCRIPTIONS[1]} ${DESCRIPTIONS[2]}`,
    pictures: [
      {
        src: 'https://loremflickr.com/248/152?random=11',
        description: 'Amsterdam street view',
      },
    ],
  },
  {
    id: 'destination-2',
    name: 'Chamonix',
    description: `${DESCRIPTIONS[2]} ${DESCRIPTIONS[3]} ${DESCRIPTIONS[4]}`,
    pictures: [
      {
        src: 'https://loremflickr.com/248/152?random=22',
        description: 'Chamonix mountain view',
      },
    ],
  },
  {
    id: 'destination-3',
    name: 'Geneva',
    description: `${DESCRIPTIONS[1]} ${DESCRIPTIONS[3]}`,
    pictures: [
      {
        src: 'https://loremflickr.com/248/152?random=33',
        description: 'Geneva lake view',
      },
    ],
  },
];

const OFFERS = [
  {
    id: 'offer-1',
    type: EventType.TAXI,
    title: 'Order Uber',
    price: 20,
  },
  {
    id: 'offer-2',
    type: EventType.FLIGHT,
    title: 'Add luggage',
    price: 50,
  },
  {
    id: 'offer-3',
    type: EventType.FLIGHT,
    title: 'Switch to comfort',
    price: 80,
  },
  {
    id: 'offer-4',
    type: EventType.FLIGHT,
    title: 'Add meal',
    price: 15,
  },
  {
    id: 'offer-5',
    type: EventType.DRIVE,
    title: 'Rent a car',
    price: 200,
  },
];

const POINTS = [
  {
    id: 'point-1',
    type: EventType.TAXI,
    destinationId: 'destination-1',
    offerIds: ['offer-1'],
    dateFrom: '2019-03-18T10:30:00',
    dateTo: '2019-03-18T11:00:00',
    basePrice: 20,
    isFavorite: true,
  },
  {
    id: 'point-2',
    type: EventType.FLIGHT,
    destinationId: 'destination-2',
    offerIds: ['offer-2', 'offer-3'],
    dateFrom: '2019-03-18T12:25:00',
    dateTo: '2019-03-18T13:35:00',
    basePrice: 160,
    isFavorite: false,
  },
  {
    id: 'point-3',
    type: EventType.DRIVE,
    destinationId: 'destination-2',
    offerIds: ['offer-5'],
    dateFrom: '2019-03-18T14:30:00',
    dateTo: '2019-03-18T16:05:00',
    basePrice: 160,
    isFavorite: true,
  },
];

function generateDestinations() {
  return DESTINATIONS.map((destination) => ({
    ...destination,
    pictures: destination.pictures.map((picture) => ({ ...picture })),
  }));
}

function generateOffers() {
  return OFFERS.map((offer) => ({ ...offer }));
}

function generatePoints() {
  return POINTS.map((point) => ({
    ...point,
    offerIds: [...point.offerIds],
  }));
}

export { generateDestinations, generateOffers, generatePoints };
