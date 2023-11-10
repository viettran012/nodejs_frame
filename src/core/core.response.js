const errorCode = require("../constants/errorCode.constant");
const statusCode = require("../constants/statusCode.constant");
const stringConstant = require("../constants/string.constant");
const getTime = require("../utils/getTime");

const response = {
  error: {
    notFound: (res) => {
      return res.status(statusCode.ERROR).json({
        error: errorCode.ERROR,
        message: stringConstant.res.NOTFOUND,
        time: getTime.currenUnix(),
      });
    },
  },

  success: {
    data: (res, data, message = stringConstant.res.SUCCESS) => {
      return res.status(statusCode.SUCCESS).json({
        error: errorCode.SUCCESS,
        message: message,
        data: data || null,
        time: getTime.currenUnix(),
      });
    },
  },
};

module.exports = response;
