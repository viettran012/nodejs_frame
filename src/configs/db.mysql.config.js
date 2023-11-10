const sqlDevConfig = {
  host: process.env.DB_DEV_HOST,
  port: process.env.DB_DEV_PORT,
  user: process.env.DB_DEV_USER,
  password: process.env.DB_DEV_PASSWORD,
  database: process.env.DB_DEV_DATABASE,
  charset: process.env.DB_DEV_CHARSET,
  multipleStatements: true,
  connectionLimit: 50,
};

const sqlProductConfig = {
  host: process.env.DB_PR_HOST,
  port: process.env.DB_PR_PORT,
  user: process.env.DB_PR_USER,
  password: process.env.DB_PR_PASSWORD,
  database: process.env.DB_PR_DATABASE,
  charset: process.env.DB_PR_CHARSET,
  multipleStatements: true,
  connectionLimit: 50,
};

const sqlConfigObj = {
  dev: sqlDevConfig,
  production: sqlProductConfig,
};

const env = process.env.NODE_ENV || "dev";

module.exports = sqlConfigObj?.[env] || sqlDevConfig;
