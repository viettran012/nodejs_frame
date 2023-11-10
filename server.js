require("dotenv").config();
const app = require("./src/app");

const PORT = process.env.PORT || 3001;

const server = app.listen(PORT, () => {
  console.log("app is running on port", PORT);
});

process.on("SIGINT", () => {
  server.close(() => console.log("Exit Server Express"));
});
