const statusCode = require("../constants/statusCode.constant");
const response = require("../core/core.response");
const apiRouter = require("./api");

function route(app) {
  app.use("/api", apiRouter);
  app.use("*", (req, res) => {
    return response.error.notFound(res);
  });
}

module.exports = route;
