const response = require("../core/core.response");
const log_ = require("./log_");

const handleErrorFn = (res, callback) => {
  try {
    return callback && callback();
  } catch (error) {
    log_(`ERROR::`, error?.message);
    return response.error.server(res);
  }
};

module.exports = handleErrorFn;
