"use client";

import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { latLngToVector3 } from "@/lib/geo";
import { destinations, type Destination } from "@/data/destinations";

const GLOBE_RADIUS = 2;

/* ---------- Dotted sphere (continents illusion via point cloud) ---------- */
function GlobePoints() {
  const ref = useRef<THREE.Points>(null);

  // Generate fibonacci-sphere points, then color land points ocean blue and
  // water points light azure using a coarse land mask — cheap and reads
  // clearly as a stylised globe without an image texture.
  const geometry = useMemo(() => {
    const count = 3600;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const land = new THREE.Color("#1E5FB4"); // ocean blue
    const dim = new THREE.Color("#A8CCFF"); // light azure for water
    const N = count;
    const phi = Math.PI * (3 - Math.sqrt(5)); // golden angle

    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = phi * i;
      const x = Math.cos(theta) * r;
      const z = Math.sin(theta) * r;
      const R = GLOBE_RADIUS * 0.985;
      positions.set([x * R, y * R, z * R], i * 3);

      // Stylised "land": denser patches — use a pseudo-noise from coordinates
      const lat = Math.asin(y) * (180 / Math.PI);
      const lng = Math.atan2(z, x) * (180 / Math.PI);
      const landMass = isLand(lat, lng);
      const c = landMass ? land : dim;
      colors.set([c.r, c.g, c.b], i * 3);
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    return geo;
  }, []);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.02;
  });

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial
        size={0.03}
        vertexColors
        transparent
        opacity={0.95}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

// Crude but effective land mask using stacked sine bands keyed by longitude —
// produces continent-shaped clusters that read well on a stylised globe.
function isLand(lat: number, lng: number): boolean {
  // Normalised coords
  const u = (lng + 180) / 360;
  const v = (lat + 90) / 180;
  // Multi-octave sine "noise"
  const n =
    Math.sin(u * 17.0 + v * 9.0) *
      Math.cos(v * 13.0 - u * 6.0) * 0.5 +
    Math.sin(u * 31.0) * Math.cos(v * 23.0) * 0.3 +
    Math.sin(v * 41.0 + u * 7.0) * 0.2;
  return n > 0.05;
}

/* ---------- Solid inner globe (light, to back the dotted shell) ---------- */
function GlobeShell() {
  return (
    <mesh>
      <sphereGeometry args={[GLOBE_RADIUS * 0.99, 48, 48]} />
      <meshBasicMaterial
        color="#EAF4FF"
        transparent
        opacity={0.92}
        side={THREE.FrontSide}
      />
    </mesh>
  );
}

function GlobeAtmosphere() {
  return (
    <mesh scale={1.18}>
      <sphereGeometry args={[GLOBE_RADIUS, 48, 48]} />
      <meshBasicMaterial
        color="#2B8AF0"
        transparent
        opacity={0.12}
        side={THREE.BackSide}
      />
    </mesh>
  );
}

/* ---------- Destination pin ---------- */
function Pin({
  dest,
  active,
  onSelect,
}: {
  dest: Destination;
  active: boolean;
  onSelect: (d: Destination) => void;
}) {
  const group = useRef<THREE.Group>(null);
  const ring = useRef<THREE.Mesh>(null);
  const pos = useMemo(
    () => latLngToVector3(dest.lat, dest.lng, GLOBE_RADIUS * 1.01),
    [dest.lat, dest.lng],
  );
  // Orient the pin to point outward from the globe center
  const quaternion = useMemo(() => {
    const up = new THREE.Vector3(0, 1, 0);
    const dir = pos.clone().normalize();
    return new THREE.Quaternion().setFromUnitVectors(up, dir);
  }, [pos]);

  useFrame(({ clock }) => {
    if (ring.current) {
      const t = clock.getElapsedTime();
      const s = 1 + ((t * 0.8) % 1) * 1.2;
      ring.current.scale.setScalar(s);
      (ring.current.material as THREE.Material).opacity = 0.6 * (1 - ((t * 0.8) % 1));
    }
  });

  return (
    <group
      ref={group}
      position={pos}
      quaternion={quaternion}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(dest);
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        document.body.style.cursor = "auto";
      }}
    >
      {/* pulsing ring */}
      <mesh ref={ring} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.04, 0.06, 32]} />
        <meshBasicMaterial color={dest.accent} transparent opacity={0.6} />
      </mesh>
      {/* solid dot */}
      <mesh>
        <sphereGeometry args={[active ? 0.06 : 0.045, 16, 16]} />
        <meshBasicMaterial color={active ? "#fff" : dest.accent} />
      </mesh>
      {/* glow halo when active */}
      {active && (
        <mesh>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshBasicMaterial color={dest.accent} transparent opacity={0.25} />
        </mesh>
      )}
    </group>
  );
}

/* ---------- Arcs connecting Nepal (origin) to destinations ---------- */
function Arcs() {
  const arcs = useMemo(() => {
    const origin = latLngToVector3(28.21, 83.99, GLOBE_RADIUS * 1.01); // Pokhara
    return destinations.map((d) => {
      const end = latLngToVector3(d.lat, d.lng, GLOBE_RADIUS * 1.01);
      const mid = origin.clone().add(end).multiplyScalar(0.5);
      const distance = origin.distanceTo(end);
      mid.normalize().multiplyScalar(GLOBE_RADIUS + distance * 0.35);
      const curve = new THREE.QuadraticBezierCurve3(origin, mid, end);
      return new THREE.BufferGeometry().setFromPoints(curve.getPoints(50));
    });
  }, []);

  return (
    <>
      {arcs.map((geo, i) => (
        <primitive
          key={i}
          object={new THREE.Line(
            geo,
            new THREE.LineBasicMaterial({
              color: "#2B8AF0",
              transparent: true,
              opacity: 0.45,
            }),
          )}
        />
      ))}
    </>
  );
}

/* ---------- The full globe group with controls ---------- */
function Globe({
  selected,
  onSelect,
}: {
  selected: string | null;
  onSelect: (d: Destination) => void;
}) {
  return (
    <>
      <ambientLight intensity={0.6} />
      <pointLight position={[5, 3, 5]} intensity={1.2} />
      <Suspense fallback={null}>
        <GlobeAtmosphere />
        <GlobeShell />
        <GlobePoints />
        <Arcs />
        {destinations.map((d) => (
          <Pin
            key={d.slug}
            dest={d}
            active={selected === d.slug}
            onSelect={onSelect}
          />
        ))}
      </Suspense>
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        autoRotate
        autoRotateSpeed={0.4}
        rotateSpeed={0.5}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={(2 * Math.PI) / 3}
      />
    </>
  );
}

export default function GlobeScene({
  selected,
  onSelect,
}: {
  selected: string | null;
  onSelect: (d: Destination) => void;
}) {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 45 }}
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <Globe selected={selected} onSelect={onSelect} />
    </Canvas>
  );
}
