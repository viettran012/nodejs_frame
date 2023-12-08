const bodyValidator = {
  plan(values) {
    const error = [];
    let isValid = true;

    if (!values?.name) {
      isValid = false;
      error?.push("planName not found");
    }
    if (!values?.startTime) {
      isValid = false;
      error?.push("startTime not found");
    }
    // if (!values?.lossRate) {
    //   isValid = false;
    //   error?.push("lossRate not found");
    // }
    // if (!values?.totalWeight) {
    //   isValid = false;
    //   error?.push("totalWeight not found");
    // }

    return {
      isValid: isValid,
      message: ["SSUCCESS"],
      error: error || [],
    };
  },

  route(values, locationObj) {
    const error = [];
    let isValid = true;

    if (!values?.startLocationId) {
      isValid = false;
      error?.push("startLocation not found");
    }
    if (!values?.endLocationId) {
      isValid = false;
      error?.push("endLocation not found");
    }

    if (
      !locationObj?.[values?.endLocationId] ||
      !locationObj?.[values?.startLocationId]
    ) {
      isValid = false;
      error?.push("startLocation / endLocation not valid");
    }

    if (values?.isRouteWarning) {
      if (!values?._routes?.length) {
        isValid = false;
        error?.push("Routes not found");
      } else {
        values?._routes?.forEach?.((point) => {
          if (!point?.[0] || !point?.[1]) {
            isValid = false;
            error?.push("Route point in valid");
          }
        });
      }
    }

    if (!values?.lossRate) {
      isValid = false;
      error?.push("lossRate not found");
    }
    if (!values?.totalWeight) {
      isValid = false;
      error?.push("totalWeight not found");
    }

    return {
      isValid: isValid,
      message: ["SUCCESS"],
      error: error || [],
    };
  },
};

module.exports = bodyValidator;
