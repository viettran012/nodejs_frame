const services = require("../../services");
const { store } = require("../../store");
const log_ = require("../../utils/log_");
const { tripStatusChecking } = require("./tripStatusChecking");

const realTimeChecking = (time = 5000) => {
  log_(`STARTED:: TRIP REALTIME CHECKING STARTED`);
  setInterval(() => {
    const tripState = Object.values(_store?.tripObj || {});
    if (!tripState || !tripState?.length) return;

    tripState?.forEach?.((trip, index) => {
      try {
        const currentStatus = trip?.statusId;
        const payload = tripStatusChecking(trip) || {};
        const tripId = trip?.tripId;

        if (payload && Object.keys(payload)?.length) {
          console.log(currentStatus, payload);

          services.updateTripPayload(tripId, payload);
        }
      } catch (error) {
        log_("ERROR:: CHECKING TRIP STATUS ERROR >>", error);
      }
    });
  }, time);
};

module.exports = { realTimeChecking };
