import { strict as assert } from "node:assert";
import { flightArcPoints, latLngToVector3 } from "../src/lib/geo";
import { destinations } from "../src/data/destinations";

const home = { lat: 28.21, lng: 83.99 };
for (const destination of destinations) {
  const points = flightArcPoints(home, destination, 2.025);
  assert(points[0].distanceTo(latLngToVector3(home.lat, home.lng, 2.025)) < 1e-8);
  assert(points[80].distanceTo(latLngToVector3(destination.lat, destination.lng, 2.025)) < 1e-8);
  assert(points.every((point) => point.length() >= 2.025 - 1e-8));
}
for (const destination of [home, { lat: -28.21, lng: -96.01 }]) {
  const points = flightArcPoints(home, destination, 2.025);
  assert(points.every((point) => point.toArray().every(Number.isFinite)));
}
console.log("PASS: eight routes meet their pins and stay above the globe; coincident and antipodal coordinates remain finite.");
