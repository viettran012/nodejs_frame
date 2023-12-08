const checkingPoint = {
  inside: (point, region) => {
    if (!region) return false;
    if (region?.type == "circle") {
      const center = region?.center;
      const distance = checkingPoint.getDistance2Point(
        Number(center?.[0]),
        Number(center?.[1]),
        Number(point?.[0]),
        Number(point?.[1])
      );

      const isInside =
        !!(distance < region?.radius) && !!distance && !!region?.radius;

      return isInside;
    }

    const vs = region?.coors;

    var x = point[0],
      y = point[1];

    var inside = false;
    for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
      var xi = vs[i][0],
        yi = vs[i][1];
      var xj = vs[j][0],
        yj = vs[j][1];

      var intersect =
        yi > y != yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
      if (intersect) inside = !inside;
    }

    return inside;
  },

  getDistance2Point: (lat1, lon1, lat2, lon2) => {
    const deg2rad = checkingPoint?.deg2rad;
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1); // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c * 1000; // Distance in km
    return d;
  },

  deg2rad: (deg) => {
    return deg * (Math.PI / 180);
  },
};

module.exports = checkingPoint;
