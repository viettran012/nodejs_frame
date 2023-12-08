const planModel = require("../app/models/plan.model");
const response = require("../core/core.response");
const handleErrorFn = require("../utils/handleErrorFn");
const { makeId } = require("../utils/makeId");
const bodyValidator = require("./bodyValidator");

const validator = {
  api: {
    addDriver: (req, res, next) => {
      const dataB = req.body;
      const fullname = dataB?.fullname;
      const idCard = dataB?.idCard;

      if (!fullname) return response.info(res, "DriverName not found!");
      if (!idCard) return response.info(res, "idCard not found!");

      next();
    },
    addLocation: (req, res, next) => {
      const dataB = req.body;
      const type = dataB?.type;
      const center = dataB?.center;
      const bounds = dataB?.bounds;
      const name = dataB?.name;
      let isRegionValid = true;

      if (!type) isRegionValid = false;
      if (!name) isRegionValid = false;

      if (type == "circle" && (!center?.[0] || !center?.[1]))
        isRegionValid = false;

      if (type == "rectangle" || type == "polygon") {
        if (!bounds) isRegionValid = false;
        bounds?.forEach?.((p) => {
          if (!p?.[0] || !p?.[1]) isRegionValid = false;
        });
      }
      if (!isRegionValid) return response.info(res, "Lỗi vùng vẽ, thử lại!");

      if (dataB?.userId == undefined)
        return response.info(res, "Tài khoản không hợp lệ!");

      const data = {
        ...dataB,
        bounds: dataB?.bounds?.join?.("*"),
        center: dataB?.center?.join?.(","),
        locationId: makeId(20),
      };
      req.data = data;

      next();
    },

    deleteLocation: (req, res, next) => {
      const dataB = req.body;

      if (!dataB?.locationId) return response.info(res, "Vùng không hợp lệ!");

      next();
    },

    updateLocation: (req, res, next) => {
      const dataB = req.body;

      const type = dataB?.type;
      const center = dataB?.center;
      const bounds = dataB?.bounds;
      const name = dataB?.name;
      let isRegionValid = true;

      if (!type) isRegionValid = false;
      if (!name) isRegionValid = false;

      if (type == "circle" && (!center?.[0] || !center?.[1]))
        isRegionValid = false;

      if (type == "rectangle" || type == "polygon") {
        if (!bounds) isRegionValid = false;
        bounds?.forEach?.((p) => {
          if (!p?.[0] || !p?.[1]) isRegionValid = false;
        });
      }
      if (!isRegionValid) return response.info(res, "Lỗi vùng vẽ, thử lại!");

      if (dataB?.userId == undefined)
        return response.info(res, "Tài khoản không hợp lệ!");

      const data = {
        ...dataB,
        bounds: dataB?.bounds?.join?.("*"),
        center: dataB?.center?.join?.(","),
      };
      req.data = data;

      next();
    },
    getLocation: (req, res, next) => {
      const dataB = req.body;
      if (dataB?.userId == undefined)
        return response.info(res, "Tài khoản không hợp lệ!");

      req.data = dataB;

      next();
    },
    userId: (req, res, next) => {
      const dataB = req.body;
      if (dataB?.userId == undefined)
        return response.info(res, "Tài khoản không hợp lệ!");

      req.data = dataB;

      next();
    },
    params: (paramsList) => {
      return (req, res, next) => {
        const params = req?.query;
        let isValid = true;
        paramsList?.forEach?.((key) => (isValid = !!params?.[key]));

        if (!isValid) {
          return response.error.invalidParams(res);
        }

        next();
      };
    },
    plan: (req, res, next) => {
      const data = req.body;
      const routes = data?.routes;
      let error = [];
      let isValid = true;

      // check location in Database
      planModel.getLocation(data?.userId, (errorDB, record) => {
        if (errorDB) {
          return response.error.DB(res);
        }

        const locationList = record;
        const locationObj = {};
        locationList?.forEach?.((location) => {
          locationObj[location?.locationId] = location;
        });

        //planinfo Checking
        const planValidator = bodyValidator?.plan?.(data);

        if (planValidator?.error?.length && !planValidator?.isValid) {
          isValid = false;
          error = [...error, ...(planValidator?.error || [])];
        }

        //route checking
        routes?.forEach?.((route, index) => {
          const routeValidator = bodyValidator?.route?.(route, locationObj);

          if (routeValidator?.error?.length && !routeValidator?.isValid) {
            isValid = false;
            error = [
              ...error,
              `Route ${index + 1} not valid: ${(
                routeValidator?.error || []
              )?.join(", ")}`,
            ];
          }
        });

        if (!isValid || !routes?.length)
          return response.error?.badRequest(res, error?.join?.(" --- "));

        const _planId = makeId(20);
        req.body._planId = _planId;

        next();
      });
    },
  },
};

module.exports = validator;
