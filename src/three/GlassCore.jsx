import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Edges, MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { RoomEnvironment } from 'three-stdlib';

/**
 * Le seul moment 3D du site. Un objet unique (coque de verre autour d'un
 * noyau chromé), sans moteur de caméra ni scrollytelling : repris du module
 * en verre du repo d'origine, sorti de sa traversée plein-page.
 *
 * Réaction volontairement discrète : un peu de parallaxe souris, un peu de
 * rotation liée au scroll de la section hero seulement. Tout s'arrête avec
 * prefers-reduced-motion.
 */

function useStudioEnvironment() {
  const { gl, scene } = useThree();
  useEffect(() => {
    const pmrem = new THREE.PMREMGenerator(gl);
    const room = new RoomEnvironment();
    const target = pmrem.fromScene(room, 0.04);
    scene.environment = target.texture;
    return () => {
      target.dispose();
      pmrem.dispose();
      scene.environment = null;
    };
  }, [gl, scene]);
}

function Core({ reduceMotion, pointer, heroRef }) {
  useStudioEnvironment();
  const group = useRef();
  const coreRef = useRef();

  const core = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#8f9a3a', metalness: 0.9, roughness: 0.22 }),
    [],
  );

  useFrame((state, delta) => {
    if (!group.current) return;

    if (reduceMotion) {
      group.current.rotation.set(0.15, -0.35, 0);
      return;
    }

    // Parallaxe souris, lissée pour rester "légère" plutôt que réactive au pixel près.
    const targetX = 0.15 + pointer.current.y * 0.18;
    const targetY = -0.35 + pointer.current.x * 0.28;
    const k = 1 - Math.pow(0.001, delta);
    group.current.rotation.x += (targetX - group.current.rotation.x) * k;
    group.current.rotation.y += (targetY - group.current.rotation.y) * k;

    // Rotation propre, lente, liée au temps plutôt qu'en boucle rapide qui distrairait.
    if (coreRef.current) coreRef.current.rotation.y = state.clock.elapsedTime * 0.08;

    // Léger tangage lié au scroll de la section hero uniquement.
    if (heroRef?.current) {
      const rect = heroRef.current.getBoundingClientRect();
      const p = THREE.MathUtils.clamp(1 - rect.bottom / (rect.height + window.innerHeight), 0, 1);
      group.current.position.y = -p * 0.6;
    }
  });

  return (
    <group ref={group} rotation={[0.15, -0.35, 0]} scale={0.92} position={[0.55, 0, 0]}>
      <mesh ref={coreRef} material={core}>
        <icosahedronGeometry args={[0.85, 0]} />
        <Edges color="#d4ff00" />
      </mesh>
      <mesh scale={1.4}>
        <icosahedronGeometry args={[0.85, 0]} />
        <MeshTransmissionMaterial
          samples={4}
          resolution={256}
          thickness={0.6}
          ior={1.35}
          chromaticAberration={0.03}
          roughness={0.08}
          distortion={0.1}
          distortionScale={0.2}
          temporalDistortion={0.04}
          color="#f5f5f0"
        />
      </mesh>
    </group>
  );
}

function Scene({ reduceMotion, heroRef }) {
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (reduceMotion) return undefined;
    const onMove = (e) => {
      pointer.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      };
    };
    window.addEventListener('pointermove', onMove);
    return () => window.removeEventListener('pointermove', onMove);
  }, [reduceMotion]);

  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 6, 4]} intensity={0.9} color="#f5f5f0" />
      <pointLight position={[-2.5, -1.5, 1.5]} intensity={1.6} color="#d4ff00" />
      <Core reduceMotion={reduceMotion} pointer={pointer} heroRef={heroRef} />
    </>
  );
}

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const onChange = (e) => setReduced(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return reduced;
}

export default function GlassCore({ heroRef }) {
  const reduceMotion = useReducedMotion();
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
      if (!gl) setSupported(false);
    } catch {
      setSupported(false);
    }
  }, []);

  if (!supported) {
    return (
      <div className="hero__stage-fallback" aria-hidden="true">
        <svg viewBox="0 0 200 200" fill="none">
          <polygon points="100,10 190,100 100,190 10,100" stroke="#d4ff00" strokeWidth="1.5" />
          <circle cx="100" cy="100" r="34" fill="#d4ff00" />
        </svg>
      </div>
    );
  }

  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 4.6], fov: 38 }}
      gl={{ antialias: true, alpha: true }}
      aria-hidden="true"
    >
      <Scene reduceMotion={reduceMotion} heroRef={heroRef} />
    </Canvas>
  );
}
