"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { seededRandom } from "@/lib/tarot/random";
import { ringTexture, tableTexture } from "./textures";

export const TABLE_RADIUS = 7.5;

function Table({ animate }: { animate: boolean }) {
  const surface = useMemo(() => tableTexture(), []);
  const ring = useMemo(() => ringTexture(), []);
  const inner = useRef<THREE.Mesh>(null);
  const outer = useRef<THREE.Mesh>(null);

  useEffect(
    () => () => {
      surface.dispose();
      ring.dispose();
    },
    [surface, ring],
  );

  useFrame((_, dt) => {
    if (!animate) return;
    if (inner.current) inner.current.rotation.z += dt * 0.012;
    if (outer.current) outer.current.rotation.z -= dt * 0.006;
  });

  return (
    <group>
      <mesh rotation-x={-Math.PI / 2} receiveShadow>
        <circleGeometry args={[TABLE_RADIUS, 96]} />
        <meshStandardMaterial map={surface} roughness={0.85} metalness={0.15} />
      </mesh>
      {/* table edge */}
      <mesh rotation-x={Math.PI / 2} position-y={-0.08}>
        <cylinderGeometry args={[TABLE_RADIUS, TABLE_RADIUS * 1.01, 0.16, 96, 1, true]} />
        <meshStandardMaterial color="#0c0f26" metalness={0.4} roughness={0.6} side={THREE.DoubleSide} />
      </mesh>
      <mesh rotation-x={Math.PI / 2} position-y={0.005}>
        <torusGeometry args={[TABLE_RADIUS, 0.05, 12, 160]} />
        <meshStandardMaterial color="#c9a45c" metalness={0.9} roughness={0.3} emissive="#3a2a10" />
      </mesh>
      <mesh ref={inner} rotation-x={-Math.PI / 2} position-y={0.006}>
        <planeGeometry args={[TABLE_RADIUS * 1.25, TABLE_RADIUS * 1.25]} />
        <meshBasicMaterial map={ring} transparent depthWrite={false} opacity={0.55} toneMapped={false} />
      </mesh>
      <mesh ref={outer} rotation-x={-Math.PI / 2} position-y={0.007}>
        <planeGeometry args={[TABLE_RADIUS * 1.72, TABLE_RADIUS * 1.72]} />
        <meshBasicMaterial map={ring} transparent depthWrite={false} opacity={0.3} toneMapped={false} />
      </mesh>
    </group>
  );
}

const starVertex = /* glsl */ `
  attribute float aSize;
  attribute float aPhase;
  uniform float uTime;
  uniform float uPixelRatio;
  varying float vAlpha;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    float tw = 0.65 + 0.35 * sin(uTime * (0.6 + aPhase * 0.8) + aPhase * 6.2831);
    vAlpha = tw;
    gl_PointSize = aSize * uPixelRatio * (0.8 + 0.4 * tw);
    gl_Position = projectionMatrix * mv;
  }
`;

const pointFragment = /* glsl */ `
  uniform vec3 uColor;
  varying float vAlpha;
  void main() {
    vec2 p = gl_PointCoord - 0.5;
    float d = length(p);
    float a = smoothstep(0.5, 0.0, d);
    gl_FragColor = vec4(uColor, a * vAlpha);
  }
`;

function Sky({ animate }: { animate: boolean }) {
  const { geometry, lines, material } = useMemo(() => {
    const rnd = seededRandom("astral-sky");
    const count = 900;
    const pos = new Float32Array(count * 3);
    const size = new Float32Array(count);
    const phase = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      // upper hemisphere dome
      const u = rnd();
      const v = rnd() * 0.85 + 0.08;
      const theta = u * Math.PI * 2;
      const phi = Math.acos(1 - v);
      const r = 45;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.cos(phi) - 6;
      pos[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
      size[i] = 1 + rnd() ** 3 * 4;
      phase[i] = rnd();
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    geometry.setAttribute("aSize", new THREE.BufferAttribute(size, 1));
    geometry.setAttribute("aPhase", new THREE.BufferAttribute(phase, 1));

    // Constellations: short chains between nearby bright stars.
    const segs: number[] = [];
    const bright = [...Array(count).keys()].filter((i) => size[i] > 3.2).slice(0, 40);
    for (let k = 0; k + 1 < bright.length; k += 1) {
      if (k % 5 === 4) continue;
      const a = bright[k];
      const b = bright[k + 1];
      const dx = pos[a * 3] - pos[b * 3];
      const dy = pos[a * 3 + 1] - pos[b * 3 + 1];
      const dz = pos[a * 3 + 2] - pos[b * 3 + 2];
      if (Math.hypot(dx, dy, dz) > 26) continue;
      segs.push(pos[a * 3], pos[a * 3 + 1], pos[a * 3 + 2], pos[b * 3], pos[b * 3 + 1], pos[b * 3 + 2]);
    }
    const lines = new THREE.BufferGeometry();
    lines.setAttribute("position", new THREE.Float32BufferAttribute(segs, 3));

    const material = new THREE.ShaderMaterial({
      vertexShader: starVertex,
      fragmentShader: pointFragment,
      uniforms: {
        uTime: { value: 0 },
        uPixelRatio: { value: 1 },
        uColor: { value: new THREE.Color("#f3e6c4") },
      },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    return { geometry, lines, material };
  }, []);

  useEffect(
    () => () => {
      geometry.dispose();
      lines.dispose();
      material.dispose();
    },
    [geometry, lines, material],
  );

  const group = useRef<THREE.Group>(null);
  const points = useRef<THREE.Points<THREE.BufferGeometry, THREE.ShaderMaterial>>(null);
  useFrame(({ clock, gl }, dt) => {
    const uniforms = points.current?.material.uniforms;
    if (!uniforms) return;
    uniforms.uPixelRatio.value = gl.getPixelRatio();
    if (animate) {
      uniforms.uTime.value = clock.elapsedTime;
      if (group.current) group.current.rotation.y += dt * 0.004;
    }
  });

  return (
    <group ref={group}>
      <points ref={points} geometry={geometry} material={material} />
      <lineSegments geometry={lines}>
        <lineBasicMaterial color="#c9a45c" transparent opacity={0.16} depthWrite={false} />
      </lineSegments>
    </group>
  );
}

const dustVertex = /* glsl */ `
  attribute float aSeed;
  uniform float uTime;
  uniform float uPixelRatio;
  varying float vAlpha;
  void main() {
    vec3 p = position;
    float t = uTime * (0.04 + aSeed * 0.05);
    p.y = mod(p.y + t, 5.0) + 0.1;
    p.x += sin(uTime * 0.2 + aSeed * 40.0) * 0.25;
    p.z += cos(uTime * 0.17 + aSeed * 30.0) * 0.25;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    // fade near the floor and the ceiling of the dust volume
    vAlpha = smoothstep(0.1, 0.8, p.y) * (1.0 - smoothstep(3.8, 5.0, p.y)) * (0.35 + aSeed * 0.5);
    gl_PointSize = (2.0 + aSeed * 3.0) * uPixelRatio * (8.0 / -mv.z);
    gl_Position = projectionMatrix * mv;
  }
`;

function Dust({ animate }: { animate: boolean }) {
  const { geometry, material } = useMemo(() => {
    const rnd = seededRandom("astral-dust");
    const count = 380;
    const pos = new Float32Array(count * 3);
    const seed = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const r = Math.sqrt(rnd()) * 9;
      const a = rnd() * Math.PI * 2;
      pos[i * 3] = Math.cos(a) * r;
      pos[i * 3 + 1] = rnd() * 5;
      pos[i * 3 + 2] = Math.sin(a) * r;
      seed[i] = rnd();
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    geometry.setAttribute("aSeed", new THREE.BufferAttribute(seed, 1));
    const material = new THREE.ShaderMaterial({
      vertexShader: dustVertex,
      fragmentShader: pointFragment,
      uniforms: {
        uTime: { value: 0 },
        uPixelRatio: { value: 1 },
        uColor: { value: new THREE.Color("#e8d29a") },
      },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    return { geometry, material };
  }, []);

  useEffect(
    () => () => {
      geometry.dispose();
      material.dispose();
    },
    [geometry, material],
  );

  const points = useRef<THREE.Points<THREE.BufferGeometry, THREE.ShaderMaterial>>(null);
  useFrame(({ clock, gl }) => {
    const uniforms = points.current?.material.uniforms;
    if (!uniforms) return;
    uniforms.uPixelRatio.value = gl.getPixelRatio();
    if (animate) uniforms.uTime.value = clock.elapsedTime;
  });

  // Particles drift in the shader, so CPU-side bounds are meaningless.
  return <points ref={points} geometry={geometry} material={material} frustumCulled={false} />;
}

export function ChamberEnvironment({ animate }: { animate: boolean }) {
  return (
    <>
      <color attach="background" args={["#04050c"]} />
      <fog attach="fog" args={["#05060f", 18, 60]} />
      <ambientLight intensity={0.35} color="#8f96d8" />
      <hemisphereLight args={["#6b5ca5", "#05060d", 0.35]} />
      <spotLight
        position={[0, 11, 3]}
        angle={0.6}
        penumbra={0.85}
        intensity={140}
        decay={2}
        color="#ffe3b3"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0004}
      />
      <pointLight position={[-7, 3, -5]} intensity={30} color="#6b5ca5" />
      <pointLight position={[7, 2.5, 6]} intensity={14} color="#c9a45c" />
      <Table animate={animate} />
      <Sky animate={animate} />
      <Dust animate={animate} />
    </>
  );
}
