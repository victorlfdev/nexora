"use client";

import { useEffect, useRef } from "react";
import { Renderer, Camera, Geometry, Program, Mesh } from "ogl";

interface ParticlesProps {
  particleCount?: number;
  particleSpread?: number;
  speed?: number;
  particleBaseSize?: number;
  className?: string;
}

const vertex = `
  attribute vec3 position;
  attribute float seed;
  uniform mat4 modelViewMatrix;
  uniform mat4 projectionMatrix;
  uniform float uTime;
  uniform float uSpread;
  uniform float uSize;
  varying float vSeed;
  void main() {
    vSeed = seed;
    vec3 pos = position * uSpread;
    pos.x += sin(uTime + seed * 6.28) * 0.4;
    pos.y += cos(uTime * 0.7 + seed * 6.28) * 0.4;
    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = clamp(uSize / length(mv.xyz), 1.0, 5.0);
    gl_Position = projectionMatrix * mv;
  }
`;
const fragment = `
  precision highp float;
  varying float vSeed;
  void main() {
    float d = length(gl_PointCoord - vec2(0.5));
    if (d > 0.5) discard;
    vec3 color = mix(vec3(0.96), vec3(0.302, 0.486, 0.996), step(0.5, vSeed));
    gl_FragColor = vec4(color, smoothstep(0.5, 0.3, d) * 0.8);
  }
`;

export default function Particles({ particleCount = 100, particleSpread = 8, speed = 0.035, particleBaseSize = 65, className = "" }: ParticlesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const media = window.matchMedia("(min-width: 768px) and (prefers-reduced-motion: no-preference)");
    let dispose: (() => void) | undefined;

    const setup = () => {
      dispose?.();
      dispose = undefined;
      if (!media.matches) return;
      // Decorative WebGL must never prevent the rest of the page from working.
      const probe = document.createElement("canvas");
      const probeContext = probe.getContext("webgl2") || probe.getContext("webgl");
      if (!probeContext) return;
      probeContext.getExtension("WEBGL_lose_context")?.loseContext();
      let renderer: Renderer;
      try {
        renderer = new Renderer({ dpr: Math.min(window.devicePixelRatio || 1, 1.5), depth: false, alpha: true });
      } catch {
        return;
      }
      const gl = renderer.gl;
      container.appendChild(gl.canvas);
      gl.clearColor(0, 0, 0, 0);
      const camera = new Camera(gl, { fov: 35 });
      camera.position.z = 20;
      const positions = new Float32Array(particleCount * 3);
      const seeds = new Float32Array(particleCount);
      for (let index = 0; index < particleCount; index++) {
        positions.set([(Math.random() - 0.5) * 3, (Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2], index * 3);
        seeds[index] = Math.random();
      }
      const geometry = new Geometry(gl, {
        position: { size: 3, data: positions },
        seed: { size: 1, data: seeds },
      });
      const program = new Program(gl, {
        vertex, fragment, transparent: true, depthTest: false,
        uniforms: { uTime: { value: 0 }, uSpread: { value: particleSpread }, uSize: { value: particleBaseSize * renderer.dpr } },
      });
      const mesh = new Mesh(gl, { mode: gl.POINTS, geometry, program });
      const resize = new ResizeObserver(() => {
        const width = container.clientWidth;
        const height = container.clientHeight;
        if (!width || !height) return;
        renderer.setSize(width, height);
        camera.perspective({ aspect: width / height });
      });
      resize.observe(container);
      let frame = 0;
      let visible = false;
      let elapsed = 0;
      let previousTime = 0;
      const render = (time: number) => {
        elapsed += previousTime ? Math.min(time - previousTime, 64) * speed * 0.001 : 0;
        previousTime = time;
        program.uniforms.uTime.value = elapsed;
        renderer.render({ scene: mesh, camera });
        frame = requestAnimationFrame(render);
      };
      const updatePlayback = () => {
        cancelAnimationFrame(frame);
        previousTime = 0;
        if (visible && !document.hidden && !gl.isContextLost()) frame = requestAnimationFrame(render);
      };
      const intersection = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        updatePlayback();
      });
      intersection.observe(container);
      document.addEventListener("visibilitychange", updatePlayback);
      dispose = () => {
        cancelAnimationFrame(frame);
        intersection.disconnect();
        resize.disconnect();
        document.removeEventListener("visibilitychange", updatePlayback);
        geometry.remove();
        program.remove();
        gl.getExtension("WEBGL_lose_context")?.loseContext();
        gl.canvas.remove();
      };
    };
    setup();
    media.addEventListener("change", setup);
    return () => {
      media.removeEventListener("change", setup);
      dispose?.();
    };
  }, [particleCount, particleSpread, speed, particleBaseSize]);

  return <div ref={containerRef} className={`absolute inset-0 ${className}`} />;
}
