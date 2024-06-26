import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { RotationQuaternion } from "../../lib/QuaternionLibrary";

const MyThree = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const w = window.innerWidth;
    const h = window.innerHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#161718");

    const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(w, h);

    containerRef.current.appendChild(renderer.domElement);

    new OrbitControls(camera, renderer.domElement);

    const loader = new THREE.TextureLoader();

    const geometry = new THREE.IcosahedronGeometry(1, 8);
    const material = new THREE.MeshPhongMaterial({
      map: loader.load("textures/mars.jpg"),
    });
    const marsMesh = new THREE.Mesh(geometry, material);
    scene.add(marsMesh);

    const light = new THREE.HemisphereLight("#FFFFFF", "#757575", 1.7);
    scene.add(light);

    const animate = () => {
      requestAnimationFrame(animate);

      const q = new RotationQuaternion(1, 1, 1, Math.PI / 360);
      q.ApplyToThreeObject(marsMesh);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      renderer.dispose();

      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          // Dispose of geometry and material
          obj.geometry.dispose();
          obj.material.dispose();
        }
      });
    };
  }, []);

  return <div ref={containerRef} />;
};

export default MyThree;
