import ApiService from './framework/api-service.js';

function adaptPointToClient(point) {
  return {
    id: point.id,
    type: point.type,
    destinationId: point.destination,
    offerIds: point.offers,
    dateFrom: point.date_from,
    dateTo: point.date_to,
    basePrice: point.base_price,
    isFavorite: point.is_favorite,
  };
}

function adaptPointToServer(point) {
  return {
    type: point.type,
    destination: point.destinationId,
    offers: point.offerIds,
    'date_from': point.dateFrom,
    'date_to': point.dateTo,
    'base_price': point.basePrice,
    'is_favorite': point.isFavorite,
  };
}

function adaptOffersToClient(offersByType) {
  return offersByType.flatMap(({ type, offers }) => offers.map((offer) => ({
    ...offer,
    type,
  })));
}

export default class TripApiService extends ApiService {
  get points() {
    return this._load({ url: 'points' })
      .then(ApiService.parseResponse)
      .then((points) => points.map(adaptPointToClient));
  }

  get destinations() {
    return this._load({ url: 'destinations' })
      .then(ApiService.parseResponse);
  }

  get offers() {
    return this._load({ url: 'offers' })
      .then(ApiService.parseResponse)
      .then(adaptOffersToClient);
  }

  async updatePoint(point) {
    const response = await this._load({
      url: `points/${point.id}`,
      method: 'PUT',
      body: JSON.stringify(adaptPointToServer(point)),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    });

    const parsedPoint = await ApiService.parseResponse(response);

    return adaptPointToClient(parsedPoint);
  }

  async addPoint(point) {
    const response = await this._load({
      url: 'points',
      method: 'POST',
      body: JSON.stringify(adaptPointToServer(point)),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    });

    const parsedPoint = await ApiService.parseResponse(response);

    return adaptPointToClient(parsedPoint);
  }

  async deletePoint(point) {
    await this._load({
      url: `points/${point.id}`,
      method: 'DELETE',
    });
  }
}
