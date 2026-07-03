"use client";

import { Suspense, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Html, OrbitControls, Stars } from "@react-three/drei";
import * as THREE from "three";
import { TextureLoader } from "three";
import { latLngToVector3 } from "@/lib/geo";
import { destinations, type Destination } from "@/data/destinations";

const GLOBE_RADIUS = 2;

/* ---------- Realistic earth via NASA Blue Marble texture ---------- */
function Earth({ onSelect, selected }: { onSelect: (d: Destination) => void; selected: string | null }) {
  const mesh = useRef<THREE.Mesh>(null);
  // Free, CORS-enabled NASA Blue Marble texture (equirectangular).
  const [map] = useLoader(TextureLoader, [
    "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg",
  ]);

  useFrame((_, delta) => {
    if (mesh.current) mesh.current.rotation.y += delta * 0.06;
  });

  return (
    <group>
      <mesh ref={mesh}>
        <sphereGeometry args={[GLOBE_RADIUS, 64, 64]} />
        <meshStandardMaterial
          map={map}
          metalness={0.1}
          roughness={0.85}
        />
      </mesh>
      {/* thin cloud-free atmosphere rim */}
      <mesh scale={1.01}>
        <sphereGeometry args={[GLOBE_RADIUS, 64, 64]} />
        <meshBasicMaterial color="#7FB0FF" transparent opacity={0.06} />
      </mesh>
      <PinsLayer onSelect={onSelect} selected={selected} />
    </group>
  );
}

function GlobeAtmosphere() {
  return (
    <mesh scale={1.12}>
      <sphereGeometry args={[GLOBE_RADIUS, 48, 48]} />
      <meshBasicMaterial color="#2B8AF0" transparent opacity={0.10} side={THREE.BackSide} />
    </mesh>
  );
}

/* ---------- Destination pins with country name labels ---------- */
function PinsLayer({ onSelect, selected }: { onSelect: (d: Destination) => void; selected: string | null }) {
  const group = useRef<THREE.Group>(null);
  // counter-rotate labels so they always face the camera-ish via Html
  useFrame(({ camera }) => {
    if (!group.current) return;
    // keep labels upright by aligning group to camera azimuth only (no y spin)
  });

  return (
    <group ref={group}>
      {destinations.map((d) => (
        <Pin key={d.slug} dest={d} active={selected === d.slug} onSelect={onSelect} />
      ))}
    </group>
  );
}

function Pin({
  dest,
  active,
  onSelect,
}: {
  dest: Destination;
  active: boolean;
  onSelect: (d: Destination) => void;
}) {
  const ring = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const pos = useMemo(
    () => latLngToVector3(dest.lat, dest.lng, GLOBE_RADIUS * 1.01),
    [dest.lat, dest.lng],
  );
  const quaternion = useMemo(() => {
    const up = new THREE.Vector3(0, 1, 0);
    const dir = pos.clone().normalize();
    return new THREE.Quaternion().setFromUnitVectors(up, dir);
  }, [pos]);

  useFrame(({ clock }) => {
    if (ring.current) {
      const t = clock.getElapsedTime();
      const s = 1 + ((t * 0.8) % 1) * 1.3;
      ring.current.scale.setScalar(s);
      (ring.current.material as THREE.Material).opacity = 0.7 * (1 - ((t * 0.8) % 1));
    }
  });

  return (
    <group
      position={pos}
      quaternion={quaternion}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(dest);
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = "auto";
      }}
    >
      {/* pulsing ring */}
      <mesh ref={ring} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.05, 0.075, 32]} />
        <meshBasicMaterial color={dest.accent} transparent opacity={0.7} />
      </mesh>
      {/* solid dot */}
      <mesh>
        <sphereGeometry args={[active ? 0.06 : 0.05, 16, 16]} />
        <meshBasicMaterial color={active ? "#ffffff" : dest.accent} />
      </mesh>
      {active && (
        <mesh>
          <sphereGeometry args={[0.11, 16, 16]} />
          <meshBasicMaterial color={dest.accent} transparent opacity={0.3} />
        </mesh>
      )}

      {/* Country name label — always faces camera */}
      <Html
        position={[0, 0.16, 0]}
        center
        distanceFactor={6}
        zIndexRange={[20, 0]}
        style={{ pointerEvents: "none" }}
      >
        <div
          className={`whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-semibold shadow-md transition-all ${
            active || hovered
              ? "bg-ocean-deep text-white"
              : "bg-white/90 text-ocean-deep"
          }`}
        >
          {dest.flag} {dest.name}
        </div>
      </Html>

      {/* arc from Pokhara (28.21, 83.99) to this destination */}
      <ArcToDestination lat={dest.lat} lng={dest.lng} />
    </group>
  );
}

function ArcToDestination({ lat, lng }: { lat: number; lng: number }) {
  const geo = useMemo(() => {
    const origin = latLngToVector3(28.21, 83.99, GLOBE_RADIUS * 1.01); // Pokhara
    const end = latLngToVector3(lat, lng, GLOBE_RADIUS * 1.01);
    const mid = origin.clone().add(end).multiplyScalar(0.5);
    const distance = origin.distanceTo(end);
    mid.normalize().multiplyScalar(GLOBE_RADIUS + distance * 0.4);
    const curve = new THREE.QuadraticBezierCurve3(origin, mid, end);
    return new THREE.BufferGeometry().setFromPoints(curve.getPoints(50));
  }, [lat, lng]);

  return (
    <primitive
      object={new THREE.Line(
        geo,
        new THREE.LineBasicMaterial({
          color: "#2B8AF0",
          transparent: true,
          opacity: 0.5,
        }),
      )}
    />
  );
}

/* ---------- Scene wrapper ---------- */
function Globe({
  selected,
  onSelect,
}: {
  selected: string | null;
  onSelect: (d: Destination) => void;
}) {
  return (
    <>
      <ambientLight intensity={0.9} />
      <directionalLight position={[5, 3, 5]} intensity={1.4} />
      <directionalLight position={[-5, -2, -3]} intensity={0.3} color="#7FB0FF" />
      <Suspense fallback={null}>
        <Stars radius={80} depth={40} count={1500} factor={3} fade speed={0.5} />
        <GlobeAtmosphere />
        <Earth onSelect={onSelect} selected={selected} />
      </Suspense>
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        autoRotate
        autoRotateSpeed={0.5}
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
