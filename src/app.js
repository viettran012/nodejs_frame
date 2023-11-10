const morgan = require("morgan");
const express = require("express");
const helmet = require("helmet");
const compression = require("compression");
const dbMysql = require("./dbs/db.mysql");
const route = require("./routes");
const app = express();

//init midleware
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());

//init db
dbMysql.connect();

//handle Error

//init routes
route(app);

module.exports = app;
