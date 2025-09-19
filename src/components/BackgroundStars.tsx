"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const BackgroundStars: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const currentMount = mountRef.current;
    const isMobile = window.innerWidth < 768;

    // Scene
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.001);

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      currentMount.clientWidth / currentMount.clientHeight,
      0.1,
      5000
    );
    camera.position.z = isMobile ? 1200 : 1000;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    currentMount.appendChild(renderer.domElement);

    // Main stars
    const starCount = isMobile ? 3000 : 12000;
    const starGeometry = new THREE.BufferGeometry();
    const starPositions = [];

    for (let i = 0; i < starCount; i++) {
      starPositions.push(
        (Math.random() - 0.5) * 6000,
        (Math.random() - 0.5) * 6000,
        (Math.random() - 0.5) * 6000
      );
    }

    starGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(starPositions, 3)
    );

    const starMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 5.0,
      transparent: true,
      opacity: 0.9,
      sizeAttenuation: true,
    });

    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    // Distant background stars
    const distantStarCount = isMobile ? 10000 : 30000;
    const distantStarGeometry = new THREE.BufferGeometry();
    const distantStarPositions = [];

    for (let i = 0; i < distantStarCount; i++) {
      distantStarPositions.push(
        (Math.random() - 0.5) * 12000,
        (Math.random() - 0.5) * 12000,
        (Math.random() - 0.5) * 12000
      );
    }

    distantStarGeometry.setAttribute("position", new THREE.Float32BufferAttribute(distantStarPositions, 3));

    const distantStarMaterial = new THREE.PointsMaterial({
      color: 0xdddddd,
      size: 4.0,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true,
    });

    const distantStars = new THREE.Points(distantStarGeometry, distantStarMaterial);
    scene.add(distantStars);

    // Animation
    const clock = new THREE.Clock();
    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Slow rotation for stars
      stars.rotation.y = elapsedTime * 0.005;
      stars.rotation.x = elapsedTime * 0.002;

      // Even slower rotation for distant background stars
      distantStars.rotation.y = elapsedTime * 0.002;
      distantStars.rotation.x = elapsedTime * 0.001;

      camera.lookAt(scene.position);
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      if (currentMount) {
        currentMount.removeChild(renderer.domElement);
      }
      scene.traverse(object => {
        if (object instanceof THREE.Mesh || object instanceof THREE.Points) {
          if (object.geometry) {
            object.geometry.dispose();
          }
          if (object.material) {
            if (Array.isArray(object.material)) {
              object.material.forEach(material => material.dispose());
            } else {
              object.material.dispose();
            }
          }
        }
      });
    };
  }, []);

  return (
    <div ref={mountRef} className="fixed top-0 left-0 w-full h-full" style={{ zIndex: 1, pointerEvents: 'none' }} />
  );
};

export default BackgroundStars;