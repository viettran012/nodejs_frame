const connection = require("../../dbs/db.mysql");
const getTime = require("../../utils/getTime");
const log_ = require("../../utils/log_");
const { makeId } = require("../../utils/makeId");

const planModel = {
  initial: (userId, callback) => {
    let SQLSyntax = `
    SELECT * from plans WHERE userCode = '${userId}' AND isActived = 1 AND isDeleted = 0; 
    SELECT * from routes WHERE userCode = '${userId}' AND isDeleted = 0;
    SELECT * FROM trips WHERE routeId IN (SELECT routeId from routes WHERE userCode = '${userId}' AND isDeleted = 0) AND isDeleted = 0;
    SELECT * from locations WHERE userId = '${userId}' AND isDeleted = 0;
    SELECT * from drivers WHERE userId = '${userId}' AND isDeleted = 0;
    SELECT * from status;
    SELECT * from vehicle_link_to_driver WHERE userId = '${userId}' AND isDeleted = 0;
    `;

    return connection.query(SQLSyntax, callback);
  },

  updateStatusTrip: (tripId, statusId, callback) => {
    const SQLSyntax = `UPDATE trips SET statusId = '${statusId}' WHERE tripId = '${tripId}'`;
    return connection.query(SQLSyntax, callback);
  },

  updateTripPayload: (tripId, payload, callback) => {
    const currenUnix = getTime?.currenUnix();

    const keys = Object.keys(payload || {});
    const updateSyntax = keys
      ?.map?.((key) =>
        payload?.[key] == null
          ? ` ${key} = NULL `
          : ` ${key} = '${payload?.[key]}' `
      )
      ?.join(",");

    const SQLSyntax = `UPDATE trips SET ${updateSyntax} , updatedAt = '${currenUnix}' WHERE tripId = '${tripId}'`;

    return connection.query(SQLSyntax, callback);
  },

  initialAll: (callback) => {
    log_("GETTING:: INITIAL TRIPS DATA");
    let SQLSyntax = `
    SELECT * from plans WHERE isActived = 1 AND isDeleted = 0; 
    SELECT * from routes WHERE isDeleted = 0;
    SELECT * FROM trips WHERE statusId <> 5 AND statusId <> 6 AND isDeleted = 0;
    SELECT * from locations WHERE isDeleted = 0;
    `;

    return connection.query(SQLSyntax, callback);
  },

  getPlanInfo: (userId, planId, callback) => {
    let SQLSyntax = `
    SELECT * from plans WHERE userCode = '${userId}' AND planId = '${planId}' AND isActived = 1 AND isDeleted = 0; 
    SELECT * from routes WHERE userCode = '${userId}' AND planId = '${planId}' AND isDeleted = 0;
    SELECT * FROM trips WHERE routeId IN (SELECT routeId from routes WHERE userCode = '${userId}' AND planId = '${planId}' AND isDeleted = 0) AND isDeleted = 0
    `;

    return connection.query(SQLSyntax, callback);
  },

  getLocation: (userId, callback) => {
    let SQLSyntax = `SELECT * from locations WHERE userId = '${userId}' AND isDeleted = 0`;

    return connection.query(SQLSyntax, callback);
  },

  addPlan: (data, tripsList, callback) => {
    const currenUnix = getTime?.currenUnix();

    const routeData = data?.routes?.map?.(
      (route) => `(
          '${route?.routeId}',
          '${data?._planId}',
          '${data?.userId}',
          '${route?.startLocationId}',
          '${route?.endLocationId}',
          '${route?._routes?.join?.("*")}',
          '${route?.totalWeight}',
          '${route?.lossRate}',
          '${currenUnix}'
          )`
    );

    const tripData = tripsList?.map?.(
      (trip) => `(
        '${trip?._tripId}',
        '${data?._planId}',
        '${data?.userId}',
        '${trip?.vehicleName}',
        '${trip?.routeId}',
        '',
        '',
        '${trip?.route?.startLocationId}',
        '${trip?.route?.endLocationId}',
        '${trip?.route?.isRouteWarning ? 1 : 0}',
        '${trip?.route?._routes?.join?.("*")}',
        '${trip?.lossRate}',
        '${currenUnix}'
      )`
    );

    let SQLSyntax = `
    INSERT INTO plans (planId, name, userCode, startTime, createdAt) 
    VALUES (
      '${data?._planId}',
      '${data?.name}',
      '${data?.userId}',
      '${data?.startTime}',
      '${currenUnix}'
      );

      ${
        routeData?.length
          ? `INSERT INTO routes (routeId, planId, userCode, startLocationId, endLocationId, coors, totalWeight, lossRate, createdAt) VALUES 
          ${routeData};`
          : ""
      }

      ${`${
        tripsList?.length
          ? `INSERT INTO trips (tripId, planId, userCode, vehicleName, routeId, driverName, driverId, startLocation, endLocation, isRouteWarning, route, lossRateLimit, createdAt) VALUES  
          ${tripData};`
          : ""
      }`}
   `;

    return connection.transaction(SQLSyntax, callback);
  },
};
module.exports = planModel;
