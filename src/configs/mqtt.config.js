const mqtt = require("mqtt");

const MQTTclient = mqtt.connect("mqtt://api.midvietnam.com:1445", {
  username: "mob!cam!i8@izp",
  password: "oj&2Np#B5nV[z{Fz",
});

module.exports = MQTTclient;
