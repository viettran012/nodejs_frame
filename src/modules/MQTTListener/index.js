const MQTTclient = require("../../configs/mqtt.config");
const log_ = require("../../utils/log_");
const { realTimeUpdate } = require("../realtimeUpdate");

const MQTTListener = () => {
  MQTTclient.subscribe("live/status", (err) => {
    if (err) {
      return log_("Error when connect to MQTT Server: ", err);
    }
    log_("SUCCESS:: CONNECTED TO MQTT SERVER");
  });

  MQTTclient.on("message", (topic, message) => {
    if (topic == "live/status") {
      const vehicleList = JSON.parse(message.toString());

      if (vehicleList?.length) {
        realTimeUpdate(vehicleList);
      }
    }
  });
};

module.exports = MQTTListener;
