import * as THREE from "three";

/**
 * Convert geographic coordinates (latitude / longitude) to a 3D vector on a
 * sphere of the given radius. Used to position destination pins on the globe.
 *
 * The globe is rotated so that the texture/alignment matches a standard
 * equirectangular world map (prime meridian facing +Z, north pole at +Y).
 */
export function latLngToVector3(
  lat: number,
  lng: number,
  radius = 1,
): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180); // polar angle from +Y
  const theta = (lng + 180) * (Math.PI / 180); // azimuth

  const x = -radius * Math.sin(phi) * Math.cos(theta);
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);

  return new THREE.Vector3(x, y, z);
}

/** Normal vector pointing outward from the globe center to a lat/lng point. */
export function surfaceNormal(lat: number, lng: number): THREE.Vector3 {
  return latLngToVector3(lat, lng, 1).normalize();
}
