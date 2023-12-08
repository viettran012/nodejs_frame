const planModal = require("../../app/models/plan.model");

const initials = {
  plan: () => {
    return new Promise((resolve, reject) => {
      planModal.initialAll((error, record) => {
        if (error) {
          return reject();
        }

        const locations = {};
        const trips = {};

        record?.[3]?.forEach((l) => {
          locations[l?.locationId] = {
            ...l,
            center: l?.center ? l?.center?.split?.(",") : "",
            coors: l?.coors
              ? l?.coors
                  ?.split?.("*")
                  ?.map?.((i) => i?.split?.(",")?.map?.((i) => Number(i)))
              : [],
          };
        });

        record?.[2]?.forEach((t) => {
          trips[t?.tripId] = t;
        });

        return resolve({
          plans: record?.[0],
          routes: record?.[1],
          trips,
          locations,
        });
      });
    });
  },
};

module.exports = { initials };
