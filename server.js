require("dotenv").config();
const app = require("./src/app");
const log_ = require("./src/utils/log_");

const PORT = process.env.PORT || 3001;

const server = app.listen(PORT, () => {
  log_("RUNNING:: APP IS RUNNING IN PORT >>", PORT);
});

process.on("SIGINT", () => {
  server.close(() => console.log("Exit Server Express"));
});
