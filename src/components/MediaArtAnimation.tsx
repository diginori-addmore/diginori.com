"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";

const MediaArtAnimation: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const mouse = useRef(new THREE.Vector2());

  useEffect(() => {
    if (!mountRef.current) return;

    const currentMount = mountRef.current;
    const isMobile = window.innerWidth < 768;

    // Scene
    const scene = new THREE.Scene();
    // Fog removed for clearer text

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

    // OrbitControls removed for text-only component


    const createTextParticles = (
      text: string,
      options: { xOffset?: number, yOffset?: number, fontSize?: number, color?: string | THREE.Color } = {}
    ): THREE.Points => {
      const { xOffset = 0, yOffset = 0, fontSize: customFontSize, color: singleColor } = options;
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      const fontSize = customFontSize || (isMobile ? 120 : 200);
      const canvasWidth = fontSize * text.length;
      const canvasHeight = fontSize;
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;

      if (context) {
        context.font = `bold ${fontSize}px "Noto Sans KR", sans-serif`;
        context.fillStyle = "white";
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.fillText(text, canvasWidth / 2, canvasHeight / 2);
      }

      const imageData = context?.getImageData(
        0,
        0,
        canvasWidth,
        canvasHeight
      ).data;
      const finalPositions = [];
      const initialPositions = [];
      const colors = [];
      const multiColorPalette = [
        new THREE.Color("#00ffff"), // Cyan
        new THREE.Color("#ff00ff"), // Magenta
        new THREE.Color("#00ff00"), // Lime
      ];

      const step = isMobile ? 3 : 2;

      if (imageData) {
        for (let y = 0; y < canvasHeight; y+=step) {
          for (let x = 0; x < canvasWidth; x+=step) {
            const alpha = imageData[(y * canvasWidth + x) * 4 + 3];
            if (alpha > 128) {
              // Add random offset to break grid pattern
              const randomX = (Math.random() - 0.5) * step * 0.8;
              const randomY = (Math.random() - 0.5) * step * 0.8;

              finalPositions.push(
                (x + randomX - canvasWidth / 2) + xOffset,
                (canvasHeight / 2 - y - randomY) + yOffset,
                0
              );
              initialPositions.push(
                (Math.random() - 0.5) * 2000,
                (Math.random() - 0.5) * 2000,
                (Math.random() - 0.5) * 2000
              );
              
              let color;
              if (singleColor) {
                  color = new THREE.Color(singleColor);
              } else {
                  color = multiColorPalette[Math.floor(Math.random() * multiColorPalette.length)];
              }
              colors.push(color.r, color.g, color.b);
            }
          }
        }
      }

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(initialPositions, 3)
      );
      geometry.setAttribute(
        "finalPosition",
        new THREE.Float32BufferAttribute(finalPositions, 3)
      );
      geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));


      const material = new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uSize: { value: (isMobile ? 6.0 : 7.0) * Math.min(window.devicePixelRatio, 2) },
        },
        vertexShader: `
          uniform float uTime;
          uniform float uSize;
          attribute vec3 finalPosition;
          attribute vec3 color;
          varying vec3 vColor;

          void main() {
            vColor = color;
            vec3 pos = mix(position, finalPosition, uTime);

            vec4 modelPosition = modelMatrix * vec4(pos, 1.0);
            vec4 viewPosition = viewMatrix * modelPosition;
            vec4 projectedPosition = projectionMatrix * viewPosition;

            gl_Position = projectedPosition;
            gl_PointSize = uSize / -viewPosition.z;
          }
        `,
        fragmentShader: `
          varying vec3 vColor;
          void main() {
            float strength = distance(gl_PointCoord, vec2(0.5));
            strength = 1.0 - step(0.5, strength);
            // Make text more solid and bright
            gl_FragColor = vec4(vColor, strength * 1.0);
          }
        `,
        transparent: true,
        depthTest: false,
      });

      const particles = new THREE.Points(geometry, material);
      particles.userData.material = material;
      scene.add(particles);
      return particles;
    };

    // Words
    const diginoriYOffset = 100;
    const diginoriParticles = createTextParticles("디지노리", {
        xOffset: 0,
        yOffset: diginoriYOffset,
        color: new THREE.Color(1.0, 1.0, 1.0) // Brighter white
    });
    const plusParticles = createTextParticles("+", {
        xOffset: isMobile ? 240 : 410,
        yOffset: diginoriYOffset + (isMobile ? 30 : 50),
        fontSize: isMobile ? 80 : 120,
        color: new THREE.Color(1.0, 1.0, 0.0) // Brighter yellow
    });

    // Stars removed - now handled by BackgroundStars component


    // Animation
    const animate = () => {
      // No star animation needed - handled by BackgroundStars component

      if(!isMobile){
          camera.position.x += (mouse.current.x * 200 - camera.position.x) * 0.05;
          camera.position.y += (-mouse.current.y * 200 - camera.position.y) * 0.05;
      }
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    // GSAP Animation Trigger
    const diginoriMaterial = diginoriParticles.userData.material as THREE.ShaderMaterial;
    gsap.to(diginoriMaterial.uniforms.uTime, {
        value: 1,
        duration: 5,
        delay: 1,
        ease: 'power4.inOut'
    });

    const plusMaterial = plusParticles.userData.material as THREE.ShaderMaterial;
    gsap.to(plusMaterial.uniforms.uTime, {
        value: 1,
        duration: 3,
        delay: 6, 
        ease: 'power4.inOut'
    });

    // Mouse move handler
    const handleMouseMove = (event: MouseEvent) => {
        mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    }
    if(!isMobile){
        window.addEventListener('mousemove', handleMouseMove);
    }


    // Handle resize
    const handleResize = () => {
      camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
      const diginoriMaterial = diginoriParticles.userData.material as THREE.ShaderMaterial;
      diginoriMaterial.uniforms.uSize.value = (isMobile ? 6.0 : 7.0) * Math.min(window.devicePixelRatio, 2);
      const plusMaterial = plusParticles.userData.material as THREE.ShaderMaterial;
      plusMaterial.uniforms.uSize.value = (isMobile ? 6.0 : 7.0) * Math.min(window.devicePixelRatio, 2);
    };
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      if(!isMobile) {
        window.removeEventListener('mousemove', handleMouseMove);
      }
      if (currentMount) {
        currentMount.removeChild(renderer.domElement);
      }
      scene.traverse(object => {
        if (object instanceof THREE.Mesh || object instanceof THREE.Points) {
            if (object.geometry) {
                object.geometry.dispose();
            }
            if(object.material){
                if(Array.isArray(object.material)){
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
    <div ref={mountRef} className="absolute top-0 left-0 w-full h-full z-0" style={{ pointerEvents: 'none' }} />
  );
};

export default MediaArtAnimation;
