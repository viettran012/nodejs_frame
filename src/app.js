const morgan = require("morgan");
const express = require("express");
const helmet = require("helmet");
const compression = require("compression");
const dbMysql = require("./dbs/db.mysql");
const route = require("./routes");
const stringConstant = require("./constants/string.constant");
const { error } = require("./core/core.response");
const statusCode = require("./constants/statusCode.constant");
const response = require("./core/core.response");
const app = express();
const MQTTListener = require("./modules/MQTTListener");
var cors = require("cors");
var bodyParser = require("body-parser");
const { sysLog } = require("./modules/sysLog");
const { initials } = require("./modules/initials");
const log_ = require("./utils/log_");
const { realTimeChecking } = require("./modules/realtimeChecking");

//global state

global._store = {
  vehicleObj: {},
  tripObj: {},
  locationObj: {},
};

//init midleware
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());

//req config
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

//CORS config
app.use(cors());
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

//init db
dbMysql.connect();

//init routes
route(app);

// handle Error
app.use((req, res, next) => {
  const error = new Error();
  error.status = statusCode.ERROR;
  next(error);
});

app.use((error, req, res, next) => {
  const status = statusCode.ERROR;
  error?.message && console.log(error);
  const message = error?.message
    ? stringConstant.res.SERVER_ERROR
    : stringConstant?.res?.NOTFOUND;
  return response.error.error(res, status, message);
});

// run module
initials
  .plan()
  .then((data) => {
    _store.tripObj = data?.trips;
    _store.locationObj = data?.locations;

    log_("SUCCESS:: GET INITIAL DATA SUCCESSED");
  })
  .catch((error) => {
    log_("ERROR:: WHEN GET INITIAL DATA");
  });

realTimeChecking(5000);
MQTTListener();

sysLog(5000);

module.exports = app;
