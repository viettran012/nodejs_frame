const planModel = require("../app/models/plan.model");
const { store } = require("../store");
const log_ = require("../utils/log_");

const services = {
  updateTripStatus: (tripId, status) => {
    console.log(typeof status);
    if (!tripId || typeof status != "number") return;

    planModel.updateStatusTrip(tripId, status, (error) => {
      if (error) {
        console.log(
          `ERROR:: ERROR WHEN UPDATE TRIP >> tripId <${tripId}> status<${status}>`
        );
      }
    });
  },

  updateTripPayload: (tripId, payload) => {
    if (!tripId) return;

    planModel.updateTripPayload(tripId, payload, (error) => {
      if (error) {
        return log_(
          `ERROR:: ERROR WHEN UPDATE TRIP >> tripId <${tripId}> <${JSON.stringify(
            payload || {}
          )}>`
        );
      }
      store.setTripStatus(tripId, payload || {});
    });
  },
};

module.exports = services;
