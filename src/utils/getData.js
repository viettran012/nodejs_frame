const getData = {
  plan: (
    planData,
    routeData,
    tripData,
    locationData,
    driverData,
    vehicleData
  ) => {
    const routeObj = {};
    const tripObj = {};
    const driverObj = {};
    const vehicleObj = {};

    driverData?.forEach?.((driver) => {
      driverObj[driver?.id] = driver;
    });

    tripData?.forEach?.((trip) => {
      tripObj[trip?.routeId] = [...(tripObj?.[trip?.routeId] || [])];
      tripObj[trip?.routeId].push(trip);
    });

    routeData?.forEach?.((route) => {
      route && (route.trips = tripObj?.[route?.routeId]);
      routeObj[route?.planId] = [...(routeObj?.[route?.planId] || [])];
      routeObj[route?.planId].push(route);
    });

    planData?.forEach?.((plan, index) => {
      plan && (plan.routes = routeObj?.[plan?.planId]);
    });

    const locationList =
      locationData?.map?.((item) => ({
        ...(item || {}),
        bounds: item?.coors
          ? item?.coors
              ?.split?.("*")
              ?.map?.((i) => i?.split?.(",")?.map?.((i) => Number(i)))
          : [],
        center: item?.center
          ? item?.center?.split?.(",")?.map?.((i) => Number(i))
          : "",
      })) || [];

    return {
      plans: Object?.values?.(planData || {}),
      locationList,
    };
  },

  tripRealTime: (trip) => {
    const currentStatus = trip?.statusId;
    const locationObj = _store?.locationObj;
    const vehicleObj = _store?.vehicleObj;

    const startLocation = locationObj?.[trip?.startLocation];
    const endLocation = locationObj?.[trip?.endLocation];
    const vehicleName = trip?.vehicleName;

    const vehicleRealtime = vehicleObj?.[vehicleName];
    const lat = vehicleRealtime?.lat;
    const lng = vehicleRealtime?.lng;
    const time = vehicleRealtime?.time;

    return {
      currentStatus,
      startLocation,
      endLocation,
      vehicleRealtime,
      lat,
      lng,
      time,
    };
  },
};

module.exports = { getData };
