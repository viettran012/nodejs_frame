const statusCode = require("../constants/statusCode.constant");
const response = require("../core/core.response");
const authMiddleWare = require("../middleware/auth");
const apiRouter = require("./api");

function route(app) {
  app.use(authMiddleWare.authToken);
  app.use("/api", apiRouter);
}

module.exports = route;
