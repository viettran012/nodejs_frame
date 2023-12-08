const getTime = require("../../utils/getTime");

function realTimeUpdate(vehicleList) {
  vehicleList?.forEach?.((vehicle) => {
    if (vehicle) {
      const vehicleName = vehicle?.vid;
      const lat = vehicle?.mlat;
      const lng = vehicle?.mlng;
      const gps = vehicle?.gps;
      const time = vehicle?.tm || getTime?.String2Unit(vehicle?.gt);
      const speed = vehicle?.sp;
      const currTime = getTime.currenUnix();
      const preState = _store.vehicleObj[vehicleName];

      _store.vehicleObj[vehicleName] = {
        name: vehicle?.vid,
        updatedAt: currTime,
        preTime: preState?.time,
        lat,
        lng,
        gps,
        time,
        speed,
      };
    }
  });
}

module.exports = { realTimeUpdate };
