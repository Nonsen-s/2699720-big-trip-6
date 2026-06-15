function formatTripDate(date) {
  const parsedDate = new Date(date);
  const day = String(parsedDate.getDate()).padStart(2, '0');
  const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(parsedDate);

  return `${day} ${month}`;
}

function getTripTitle(points, destinations) {
  return points
    .map((point) => destinations.find((destination) => destination.id === point.destinationId)?.name)
    .filter((name, index, names) => name && names.indexOf(name) === index)
    .join(' &mdash; ');
}

function getTripDates(points) {
  const dates = points.flatMap((point) => [point.dateFrom, point.dateTo]).sort();
  const [dateFrom] = dates;
  const dateTo = dates[dates.length - 1];

  return `${formatTripDate(dateFrom)}&nbsp;&mdash;&nbsp;${formatTripDate(dateTo)}`;
}

function getTripCost(points, offers) {
  return points.reduce((total, point) => {
    const selectedOffersCost = offers
      .filter((offer) => point.offerIds.includes(offer.id))
      .reduce((offersTotal, offer) => offersTotal + offer.price, 0);

    return total + point.basePrice + selectedOffersCost;
  }, 0);
}

function generateTripInfo(points, destinations, offers) {
  if (!points.length) {
    return {
      title: '',
      dates: '',
      cost: 0,
    };
  }

  return {
    title: getTripTitle(points, destinations),
    dates: getTripDates(points),
    cost: getTripCost(points, offers),
  };
}

export { generateTripInfo };
