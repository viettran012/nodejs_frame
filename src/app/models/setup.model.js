const connection = require("../../dbs/db.mysql");
const getTime = require("../../utils/getTime");

const setupModel = {
  addDriver: (data, callback) => {
    const currenUnix = getTime?.currenUnix();
    let SQLSyntax = `INSERT INTO drivers 
        (fullname, idCard, phoneNumber, licenseType, licenseNum, licenseIssuanceDate, licenseExpirationDate, userId, createdAt) 
        values(
        '${data?.fullname}',
        '${data?.idCard}',
        '${data?.phoneNumber || ""}',
        '${data?.licenseType || ""}',
        '${data?.licenseNum || ""}',
        ${data?.licenseIssuanceDate || "NULL"},
        ${data?.licenseExpirationDate || "NULL"},
        '${data?.userId}',
        '${currenUnix}'
        )`;

    return connection.query(SQLSyntax, callback);
  },

  updateDriver: (payload, callback) => {
    const currenUnix = getTime?.currenUnix();
    const keys = Object.keys(payload || {});

    if (payload?.isDeleted == 1) {
      payload.isDeleted = currenUnix;
    }

    const updateSyntax = keys
      ?.map?.((key) =>
        payload?.[key] == null
          ? ` ${key} = NULL `
          : ` ${key} = '${payload?.[key]}' `
      )
      ?.join(",");

    const SQLSyntax = `UPDATE drivers SET ${updateSyntax} , updatedAt = '${currenUnix}' WHERE id = '${payload?.id}' AND userId = '${payload?.userId}'`;
    console.log(SQLSyntax);
    return connection.query(SQLSyntax, callback);
  },

  addVehicle: (payload, callback) => {
    const currenUnix = getTime?.currenUnix();
    const keys = Object.keys(payload || {});

    const SQLSyntax = `
    INSERT INTO vehicles (vehicleName, userId, createdAt) 
    VALUES ('${payload?.vehicleName}', '${payload?.userId}','${currenUnix}');

    ${
      payload?.driverId
        ? `
      INSERT INTO vehicle_link_to_driver (vehicleName,userId,driverId,createdAt)
      VALUES ('${payload?.vehicleName}', '${payload?.userId}', '${payload?.driverId}', '${currenUnix}');`
        : ""
    }
    `;

    return connection.transaction(SQLSyntax, callback);
  },

  getVehicleByName: (payload, callback) => {
    const SQLSyntax = `SELECT * from vehicles WHERE vehicleName = '${payload?.vehicleName}' AND userId = '${payload?.userId}'`;
    console.log(SQLSyntax);
    return connection.query(SQLSyntax, callback);
  },
};
module.exports = setupModel;
