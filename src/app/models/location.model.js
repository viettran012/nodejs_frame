const connection = require("../../dbs/db.mysql");
const getTime = require("../../utils/getTime");

const locationModel = {
  add: (
    {
      type,
      center,
      color,
      radius,
      name,
      address,
      description,
      userId,
      bounds,
      locationId,
    },
    callback
  ) => {
    const currenUnix = getTime?.currenUnix();
    let SQLSyntax = `INSERT INTO locations 
    (locationId, userId, name, center, type, color, radius, coors, address, description, updatedAt, createdAt) 
    values(
    '${locationId}',
    '${userId}',
    '${name}',
    '${center || ""}',
    '${type}',
    '${color}',
    '${radius || 0}',
    '${bounds || ""}',
    '${address || ""}',
    '${description || ""}',
    '${currenUnix || 0}',
    '${currenUnix || 0}'
    )`;

    return connection.query(SQLSyntax, callback);
  },

  update: (body, callback) => {
    const currenUnix = getTime?.currenUnix();

    let SQLSyntax = `UPDATE locations 
    set type = '${body?.type}',
    name = '${body?.name || ""}', 
    radius = '${body?.radius || 0}',
    center = '${body?.center || ""}', 
    coors = '${body?.bounds || ""}', 
    color = '${body?.color || ""}', 
    userId = '${body?.userId}', 
    description = '${body?.description || ""}', 
    address = '${body?.address || ""}',
    updatedAt = '${currenUnix || 0}' where locationId = '${
      body?.locationId
    }' AND userId = '${body?.userId}'`;

    // console.log(SQLSyntax);
    return connection.query(SQLSyntax, callback);
  },

  delete: (payload, callback) => {
    const currenUnix = getTime?.currenUnix();

    let SQLSyntax = `UPDATE locations 
    set isDeleted = 1,
    updatedAt = '${currenUnix || 0}' where locationId = '${
      payload?.locationId
    }' AND userId = '${payload?.userId}'`;

    return connection.query(SQLSyntax, callback);
  },

  get: (userId, callback) => {
    let SQLSyntax = `SELECT * from locations WHERE userId = '${userId}'`;

    return connection.query(SQLSyntax, callback);
  },
};
module.exports = locationModel;
