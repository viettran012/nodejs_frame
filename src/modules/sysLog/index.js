const getTime = require("../../utils/getTime");
const log_ = require("../../utils/log_");
const sizeof = require("object-sizeof");

function formatBytes(bytes, decimals = 2) {
  if (!+bytes) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = [
    "Bytes",
    "KiB",
    "MiB",
    "GiB",
    "TiB",
    "PiB",
    "EiB",
    "ZiB",
    "YiB",
  ];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

const sysLog = (time = 5000) => {
  //vehicles store
  return null;
  setInterval(() => {
    const vList = Object.values(_store.vehicleObj || {});
    const tripObj = Object.values(_store.tripObj || {});
    const locationObj = Object.values(_store.locationObj || {});

    console.table({
      _store: {
        size: formatBytes(sizeof(_store)),
        keys: Object.keys(_store),
      },
      vehicle: { length: vList?.length, size: formatBytes(sizeof(vList)) },
      trips: {
        length: tripObj?.length,
        size: formatBytes(sizeof(tripObj)),
      },
      location: {
        length: locationObj?.length,
        size: formatBytes(sizeof(locationObj)),
      },

      time: { current: getTime.current() },
    });
  }, time);
};

module.exports = { sysLog };
