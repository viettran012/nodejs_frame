const stringConstant = require("../../constants/string.constant");
const response = require("../../core/core.response");
const handleErrorFn = require("../../utils/handleErrorFn");
const log_ = require("../../utils/log_");
const locationModel = require("../models/location.model");

class LocationController {
  add(req, res, next) {
    const data = req?.data;
    locationModel.add(data || {}, (error, record) => {
      handleErrorFn(res, () => {
        if (error) return response?.info(res, stringConstant.res.DB);
        return response.success.r(res);
      });
    });
  }

  update(req, res, next) {
    const data = req?.data;
    locationModel.update(data || {}, (error, record) => {
      handleErrorFn(res, () => {
        if (error) return response?.info(res, stringConstant.res.DB);
        return response.success.r(res);
      });
    });
  }

  delete(req, res, next) {
    const data = req?.body;
    locationModel.delete(data || {}, (error, record) => {
      handleErrorFn(res, () => {
        if (error) return response?.info(res, stringConstant.res.DB);
        return response.success.r(res);
      });
    });
  }

  get(req, res, next) {
    const data = req?.data;
    locationModel.get(data?.userId, (error, record) => {
      handleErrorFn(res, () => {
        if (error) return response?.info(res, stringConstant.res.DB);
        return response.success.data(res, record);
      });
    });
  }
}

module.exports = new LocationController();
