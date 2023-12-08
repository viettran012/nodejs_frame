const express = require("express");
const planController = require("../app/controllers/plan.controller");
const locationController = require("../app/controllers/location.controller");
const setupController = require("../app/controllers/setup.controller");
const validator = require("../middleware/validator");
const router = express.Router();

//plan
// router.get("/plan/add", planController.add);
router.get("/plan/initial", validator.api.userId, planController.initial);
router.post(
  "/plan/add",
  validator.api.userId,
  validator?.api?.plan,
  planController.add
);

router.get(
  "/plan/info",
  validator.api.userId,
  validator.api.params(["planId"]),
  planController.planInfo
);

//location
router.post("/location/add", validator.api.addLocation, locationController.add);
router.post(
  "/location/update",
  validator.api.updateLocation,
  locationController.update
);
router.post(
  "/location/delete",
  validator.api.deleteLocation,
  locationController.delete
);
router.get("/location/list", validator.api.getLocation, locationController.get);

//setup

router.post("/driver/add", validator.api.addDriver, setupController.addDriver);
router.post("/driver/update", setupController.updateDriver);

router.post("/vehicle/add", setupController.addVehicle);

module.exports = router;
