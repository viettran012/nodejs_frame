var mysql = require("mysql2");
const sqlConfig = require("../configs/db.mysql.config");
const log_ = require("../utils/log_");

var pool = mysql.createPool(sqlConfig);
const promisePool = pool?.promise?.();

const connection = {
  query: function (query, callback) {
    pool.getConnection(function (err, connection) {
      if (err) {
        log_(err);
        callback && callback(err);
        return;
      }
      connection.ping();
      connection.query(query, function (err, records, fields) {
        connection.release();
        try {
          if (err) {
            console.log(err);
            return callback && callback(err);
          }
          if (callback) {
            return callback?.(null, records, fields);
          } else {
            return console.log("No callback is provided");
          }
        } catch (err) {
          log_(err);
        }
      });
    });
  },

  transaction: function (query, callback) {
    pool.getConnection(function (err, connection) {
      if (err || !connection) {
        return log_("ERROR:: Error when connecting to Database", err);
      }

      connection.beginTransaction(function (err) {
        if (err) {
          return log_("ERROR:: BEGIN TRANSACTION ERROR", err);
        }

        connection.query(query, (err, records, fields) => {
          try {
            if (err) {
              connection.rollback();
              return callback && callback(err);
            }
            if (callback) {
              callback?.(null, records, fields);
            } else {
              console.log("No callback is provided");
            }

            connection.commit(function (err) {
              if (err) {
                return connection.rollback(function () {
                  return log_("ERROR:: COMMIT TRANSACTION ERROR", err);
                });
              }
            });
          } catch (err) {
            log_(err);
            connection.rollback();
          }
        });
      });

      pool.releaseConnection(connection);
    });
  },

  promiseQuery: async function (query) {
    const [records, fields] = await promisePool.query(query);
    return [records, fields];
  },

  connect: function () {
    pool.getConnection(function (err, conn) {
      if (err) {
        log_("error when connecting to Database", err);
      } else {
        log_(`SUCCESS:: CONNECTED TO DATABASE >> ${sqlConfig.host}`);
      }
      // return pool.releaseConnection(conn);
    });
  },
};
module.exports = connection;
