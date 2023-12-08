const {
  NOT_IN,
  VERITY_WAITING,
} = require("../../constants/tripStatus.constant");
const checkingPoint = require("../../utils/checkingPoint");
const { getData } = require("../../utils/getData");

const tripStatusChecking = (trip) => {
  const {
    lat,
    lng,
    startLocation,
    vehicleRealtime,
    endLocation,
    currentStatus,
    time,
  } = getData.tripRealTime(trip);

  if (!vehicleRealtime) return false;

  // if (vehicleRealtime?.name == "62C06062") {
  //   console.log(lat, lng, startLocation?.center);
  //   const isInside = checkingPoint.inside([lat, lng], startLocation);
  //   console.log("62C06062", isInside);
  // }

  if (currentStatus == NOT_IN || currentStatus == VERITY_WAITING) {
    const isInside = checkingPoint.inside([lat, lng], startLocation);
    const newStatus = isInside ? VERITY_WAITING : NOT_IN;
    const isChange = newStatus != currentStatus;
    if (isChange) {
      return { statusId: newStatus, inGTime: isInside ? time : null };
    }
  }
};

module.exports = { tripStatusChecking };
