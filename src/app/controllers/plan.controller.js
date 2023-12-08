const stringConstant = require("../../constants/string.constant");
const response = require("../../core/core.response");
const { getData } = require("../../utils/getData");
const handleErrorFn = require("../../utils/handleErrorFn");
const log_ = require("../../utils/log_");
const { makeId } = require("../../utils/makeId");
const planModel = require("../models/plan.model");

class PlanController {
  initial(req, res, next) {
    const data = req?.data;
    planModel.initial(data?.userId, (error, record) => {
      handleErrorFn(res, () => {
        if (error) {
          return response.error.DB(res);
        }
        const planData = record?.[0];
        const routeData = record?.[1];
        const tripData = record?.[2];
        const locationData = record?.[3];
        const driverData = record?.[4];
        const status = record?.[5];
        const vehicleData = record?.[6];

        const { plans, locationList } = getData.plan(
          planData,
          routeData,
          tripData,
          locationData,
          driverData,
          vehicleData
        );

        return response.success.data(res, {
          plans: plans,
          locationList: locationList,
          statusType: status,
          driverList: driverData,
        });
      });
    });
  }

  add(req, res, next) {
    const data = req?.data;

    const tripsList = [];
    data?.routes?.forEach?.((route) => {
      route.routeId = makeId(20);
      route?.vehicles?.forEach?.((vehicle) => {
        if (vehicle) {
          tripsList?.push?.({
            vehicleName: vehicle,
            route,
            _tripId: makeId(20),
            routeId: route?.routeId,
            lossRate: route?.lossRate,
          });
        }
      });
    });

    planModel.addPlan(data, tripsList, (error, record) => {
      handleErrorFn(res, () => {
        if (error) {
          return response.error.DB(res);
        }

        return response.success.r(res);
      });
    });
  }

  planInfo(req, res, next) {
    const data = req?.data;
    const planId = req?.query?.planId;

    planModel.getPlanInfo(data?.userId, planId, (error, record) => {
      handleErrorFn(res, () => {
        if (error) {
          return response.error.DB(res);
        }
        const planData = record?.[0];
        const routeData = record?.[1];
        const tripData = record?.[2];

        const { plans } = getData.plan(planData, routeData, tripData);

        return response.success.data(res, plans?.[0] || {});
      });
    });
  }
}

module.exports = new PlanController();
