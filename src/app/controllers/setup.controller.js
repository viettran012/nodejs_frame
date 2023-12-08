const { DB_CODE } = require("../../constants/db.constant");
const stringConstant = require("../../constants/string.constant");
const response = require("../../core/core.response");
const handleErrorFn = require("../../utils/handleErrorFn");
const log_ = require("../../utils/log_");
const setupModel = require("../models/setup.model");

class SetupController {
  addDriver(req, res, next) {
    const data = req?.body;
    setupModel.addDriver(data || {}, (error, record) => {
      handleErrorFn(res, () => {
        if (error) return response?.info(res, stringConstant.res.DB);
        return response.success.r(res);
      });
    });
  }

  updateDriver(req, res, next) {
    const data = req?.body;
    setupModel.updateDriver(data || {}, (error, record) => {
      handleErrorFn(res, () => {
        if (error) return response?.info(res, stringConstant.res.DB);
        return response.success.r(res);
      });
    });
  }

  addVehicle(req, res, next) {
    const data = req?.body;

    setupModel.getVehicleByName(data, (error_, record) => {
      if (error_) {
        console.log(error_);
        return response?.info(res, stringConstant.res.DB);
      }

      console.log(record);
      if (record?.length) {
        return response?.info(res, "Phương tiện đã tồn tại");
      }
      setupModel.addVehicle(data || {}, (error, record) => {
        handleErrorFn(res, () => {
          if (error) {
            const errCode = error?.code;
            if (errCode == DB_CODE.ER_DUP_ENTRY) {
              return response?.info(
                res,
                "Tài xế này đã được thêm vào phương tiện khác!"
              );
            }
            return response?.info(res, stringConstant.res.DB);
          }
          return response.success.r(res);
        });
      });
    });
  }
}

module.exports = new SetupController();
