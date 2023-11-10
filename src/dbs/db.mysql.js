var mysql = require("mysql2");
const sqlConfig = require("../configs/db.mysql.config");

var pool = mysql.createPool(sqlConfig);
const promisePool = pool?.promise?.();

module.exports = {
  query: function (query, callback) {
    pool.query(query, (err, records, fields) => {
      if (err) {
        console.log(err);
        return callback && callback(err);
      }
      if (callback) {
        return callback?.(null, records, fields);
      } else {
        return console.log("No callback is provided");
      }
    });
  },

  promiseQuery: async function (query) {
    const [records, fields] = await promisePool.query(query);
    return [records, fields];
  },

  connect: function () {
    pool.getConnection(function (err, conn) {
      if (err) {
        console.log("error when connecting to Database", err);
      } else {
        console.log(`Success connected to Database ${sqlConfig.host}`);
      }
      // return pool.releaseConnection(conn);
    });
  },
};
