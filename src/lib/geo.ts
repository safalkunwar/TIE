import * as THREE from "three";

/**
 * Convert geographic coordinates (latitude / longitude) to a 3D vector on a
 * sphere of the given radius. Used to position destination pins on the globe.
 *
 * The globe is rotated so that the texture/alignment matches a standard
 * equirectangular world map (prime meridian facing +X, north pole at +Y).
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

/** A great-circle route lifted above the surface, in globe coordinates. */
export function flightArcPoints(
  from: { lat: number; lng: number },
  to: { lat: number; lng: number },
  radius: number,
): THREE.Vector3[] {
  const start = surfaceNormal(from.lat, from.lng);
  const end = surfaceNormal(to.lat, to.lng);
  const rotation = new THREE.Quaternion().setFromUnitVectors(start, end);
  const angle = start.angleTo(end);
  return Array.from({ length: 81 }, (_, index) => {
    const t = index / 80;
    const partial = new THREE.Quaternion().slerp(rotation, t);
    return start.clone().applyQuaternion(partial).multiplyScalar(radius + Math.sin(Math.PI * t) * Math.min(0.6, angle * 0.35));
  });
}
