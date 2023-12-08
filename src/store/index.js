const store = {
  setTripStatus: (tripId, payload = {}) => {
    const preStatus = _store?.tripObj?.[tripId];
    if (preStatus) {
      _store.tripObj[tripId] = { ...preStatus, ...payload };
    }
  },
};

module.exports = { store };
