"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html, Line, OrbitControls, useTexture } from "@react-three/drei";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import Image from "next/image";
import * as THREE from "three";
import { latLngToVector3, flightArcPoints } from "@/lib/geo";
import type { Destination } from "@/data/destinations";
import CountryFlag from "@/components/ui/CountryFlag";

const RADIUS = 2;
const HOME = { lat: 28.21, lng: 83.99 };
const INITIAL_CAMERA = latLngToVector3(20, 95, 7.8);

export type GlobeSceneProps = {
  countries: Destination[];
  selected: string | null;
  onSelect: (country: Destination) => void;
  running: boolean;
  autoRotate: boolean;
  reducedMotion: boolean;
  resetKey: number;
};

function MapPin({ country, active, onSelect }: {
  country: Destination;
  active: boolean;
  onSelect: (country: Destination) => void;
}) {
  const position = useMemo(() => latLngToVector3(country.lat, country.lng, RADIUS + 0.05), [country.lat, country.lng]);
  // Separate nearby European pins without changing their geographic anchors.
  const offset = ({ ireland: [-53, 15], uk: [-5, -45], denmark: [48, 0] } as Record<string, number[]>)[country.slug] ?? [0, 0];
  return (
    <Html position={position} center occlude zIndexRange={[30, 10]}>
      {(offset[0] !== 0 || offset[1] !== 0) && <svg className="map-pin-leader" width="1" height="1" aria-hidden><line x1="0" y1="0" x2={offset[0]} y2={offset[1] - 15} stroke="#55889e" strokeWidth="1.2" /></svg>}
      <button
        type="button"
        className={`map-pin ${active ? "is-active" : ""}`}
        style={{ translate: `${offset[0]}px ${offset[1]}px` }}
        aria-label={`Explore ${country.name}`}
        aria-pressed={active}
        onClick={(event) => { event.stopPropagation(); onSelect(country); }}
        onPointerDown={(event) => event.stopPropagation()}
      >
        <span className="map-pin-marker map-pin-country"><CountryFlag slug={country.slug} name={country.name} flag={country.flag} /></span>
        <span className="map-pin-label">{country.name}</span>
      </button>
    </Html>
  );
}

function Earth({ countries, selected, onSelect }: Pick<GlobeSceneProps, "countries" | "selected" | "onSelect">) {
  const map = useTexture("/maps/world.svg");
  map.colorSpace = THREE.SRGBColorSpace;
  map.anisotropy = 4;
  const active = countries.find((country) => country.slug === selected);
  const route = useMemo(() => active
    ? flightArcPoints(HOME, active, RADIUS + 0.025)
    : null, [active]);
  const homePosition = useMemo(() => latLngToVector3(HOME.lat, HOME.lng, RADIUS + 0.08), []);

  return (
    <group>
      <mesh>
        <sphereGeometry args={[RADIUS, 80, 64]} />
        <meshStandardMaterial map={map} roughness={0.88} metalness={0} />
      </mesh>
      <mesh scale={1.025}>
        <sphereGeometry args={[RADIUS, 48, 48]} />
        <meshBasicMaterial color="#a8e2ed" transparent opacity={0.18} side={THREE.BackSide} depthWrite={false} />
      </mesh>
      {route && <Line points={route} color="#ed9d46" lineWidth={2} dashed dashSize={0.08} gapSize={0.055} transparent opacity={0.9} />}
      {countries.map((country) => (
        <MapPin key={country.slug} country={country} active={selected === country.slug} onSelect={onSelect} />
      ))}
      <Html position={homePosition} center occlude zIndexRange={[35, 10]}>
        <div className="map-pin map-pin-home" role="img" aria-label="Target International Education, Pokhara, Nepal. Your journey starts here.">
          <span className="map-pin-marker"><Image src="/gallery/tie-logo.png" alt="" width={34} height={34} /></span>
          <span className="map-pin-label">TIE · Nepal</span>
        </div>
      </Html>
    </group>
  );
}

function CameraControls({ countries, selected, autoRotate, running, reducedMotion, resetKey }: Omit<GlobeSceneProps, "onSelect">) {
  const controls = useRef<OrbitControlsImpl>(null);
  const target = useRef<THREE.Vector3 | null>(null);
  const { camera, invalidate } = useThree();

  useEffect(() => {
    const country = countries.find((item) => item.slug === selected);
    target.current = country
      ? latLngToVector3(country.lat, country.lng, 7.8)
      : INITIAL_CAMERA.clone();
    if (reducedMotion) {
      camera.position.copy(target.current);
      camera.lookAt(0, 0, 0);
      controls.current?.update();
      target.current = null;
    }
    invalidate();
  }, [selected, countries, resetKey, reducedMotion, camera, invalidate]);

  useFrame((_, delta) => {
    if (!target.current) return;
    // Interpolate on the sphere so the camera never cuts through the globe.
    const distance = THREE.MathUtils.damp(camera.position.length(), 7.8, 5, delta);
    camera.position.lerp(target.current, 1 - Math.exp(-5 * delta)).normalize().multiplyScalar(distance);
    camera.lookAt(0, 0, 0);
    if (camera.position.distanceTo(target.current) < 0.01) target.current = null;
    invalidate();
  });

  return <OrbitControls
    ref={controls}
    enablePan={false}
    enableZoom={false}
    enableDamping={!reducedMotion}
    autoRotate={autoRotate && running && !reducedMotion && !selected}
    autoRotateSpeed={0.35}
    rotateSpeed={0.65}
    minPolarAngle={Math.PI * 0.1}
    maxPolarAngle={Math.PI * 0.9}
    onStart={() => { target.current = null; }}
  />;
}

export default function GlobeScene(props: GlobeSceneProps) {
  const [contextLost, setContextLost] = useState(false);
  if (contextLost) throw new Error("Globe graphics context unavailable");
  return (
    <Canvas
      camera={{ position: INITIAL_CAMERA.toArray(), fov: 40 }}
      dpr={[1, 1.5]}
      frameloop={props.running && !props.reducedMotion ? "always" : "demand"}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      onCreated={({ gl }) => {
        gl.domElement.addEventListener("webglcontextlost", (event) => {
          event.preventDefault();
          setContextLost(true);
        }, { once: true });
      }}
    >
      <ambientLight intensity={1.8} />
      <directionalLight position={[4, 6, 5]} intensity={2} color="#ffffff" />
      <directionalLight position={[-4, -2, -5]} intensity={0.7} color="#b5dcff" />
      <Suspense fallback={null}><Earth countries={props.countries} selected={props.selected} onSelect={props.onSelect} /></Suspense>
      <CameraControls {...props} />
    </Canvas>
  );
}
