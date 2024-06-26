import * as THREE from "three";
import { RotationQuaternion } from "./QuaternionLibrary";

import mercuryTex from "../imgs/mercury.jpg";
import venusTex from "../imgs/venus.jpg";
import sunTex from "../imgs/sun.jpg";
import earthTex from "../imgs/earth.jpg";
import marsTex from "../imgs/mars.jpg";
import jupiterTex from "../imgs/jupiter.jpg";
import saturnTex from "../imgs/saturn.jpg";
import satRingTex from "../imgs/saturn_ring.png";
import uranusTex from "../imgs/uranus.jpg";
import urRingTex from "../imgs/uranus_ring.png";
import neptuneTex from "../imgs/neptune.jpg";
import plutoTex from "../imgs/pluto.jpg";

export const sun = {
  planet: createPlanet(85, sunTex, null, (event) => {
    window.location.href = "http://localhost:3000/planetinfo/0";
  }),
  planetConfig: { a: 0, b: 0, c: 0, d: 0.015, v: 0.25 },
  ID: 0,
  size: 85,
};

export const mercury = {
  planet: createPlanet(1, mercuryTex, null, (event) => {
    window.location.href = "http://localhost:3000/planetinfo/1";
  }),
  planetConfig: { a: 120, b: 120, c: 5, d: 0.005, v: 0.5 },
  ID: 1,
  size: 1,
};

export const venus = {
  planet: createPlanet(3, venusTex, null, (event) => {
    window.location.href = "http://localhost:3000/planetinfo/2";
  }),
  planetConfig: { a: 130, b: 130, c: -5, d: 0.001, v: 0.15 },
  ID: 2,
  size: 3,
};

export const earth = {
  planet: createPlanet(3, earthTex, null, (event) => {
    window.location.href = "http://localhost:3000/planetinfo/3";
  }),
  planetConfig: { a: 140, b: 140, c: 6, d: 0.001, v: 0.05 },
  ID: 3,
  size: 3,
};

export const mars = {
  planet: createPlanet(2, marsTex, null, (event) => {
    window.location.href = "http://localhost:3000/planetinfo/4";
  }),
  planetConfig: { a: 150, b: 150, c: 3, d: 0.005, v: 0.15 },
  ID: 4,
  size: 2,
};

export const jupiter = {
  planet: createPlanet(33, jupiterTex, null, (event) => {
    window.location.href = "http://localhost:3000/planetinfo/5";
  }),
  planetConfig: { a: 200, b: 200, c: 2, d: 0.001, v: 0.05 },
  ID: 5,
  size: 33,
};

export const saturn = {
  planet: createPlanet(
    27,
    saturnTex,
    {
      innerRadius: 28,
      outerRadius: 35,
      texture: satRingTex,
    },
    (event) => {
      window.location.href = "http://localhost:3000/planetinfo/6";
    }
  ),
  planetConfig: { a: 270, b: 270, c: 10, d: 0.01, v: 0.09 },
  ID: 6,
  size: 27,
};

export const uranus = {
  planet: createPlanet(
    12,
    uranusTex,
    {
      innerRadius: 13,
      outerRadius: 19,
      texture: urRingTex,
    },
    (event) => {
      window.location.href = "http://localhost:3000/planetinfo/7";
    }
  ),
  planetConfig: { a: 330, b: 330, c: -5, d: 0.01, v: 0.07 },
  ID: 7,
  size: 12,
};

export const neptune = {
  planet: createPlanet(11, neptuneTex, null, (event) => {
    window.location.href = "http://localhost:3000/planetinfo/8";
  }),
  planetConfig: { a: 350, b: 350, c: -1, d: 0.01, v: 0.3 },
  ID: 8,
  size: 11,
};

export const pluto = {
  planet: createPlanet(1, plutoTex, null, (event) => {
    window.location.href = "http://localhost:3000/planetinfo/9";
  }),
  planetConfig: { a: 380, b: 380, c: -1, d: 0.0001, v: 0.12 },
  ID: 9,
  size: 1,
};

export function getNewPlanetTransform(planetConfig, time) {
  time *= planetConfig["v"];
  const x = planetConfig["a"] * Math.cos(time);
  const z = planetConfig["b"] * Math.sin(time);
  const y = planetConfig["c"] * Math.sin(time);

  const rotation = new RotationQuaternion(0, 1, 0, planetConfig["d"] * Math.PI);

  return [x, y, z, rotation];
}

function createPlanet(size, texture, ring, clickEvent) {
  const textureload = new THREE.TextureLoader();

  const geometry = new THREE.SphereGeometry(size, 45, 35);
  const material = new THREE.MeshStandardMaterial({
    map: textureload.load(texture),
  });

  const planet = new THREE.Mesh(geometry, material);
  planet.position.x = 0;
  planet.position.y = 0;
  planet.position.z = 0;
  planet.needsUpdate = true;

  if (ring) {
    const RingGeo = new THREE.RingGeometry(ring.innerRadius, ring.outerRadius);
    const RingMat = new THREE.MeshStandardMaterial({
      map: textureload.load(ring.texture),
      side: THREE.DoubleSide,
    });
    const Ring = new THREE.Mesh(RingGeo, RingMat);
    planet.add(Ring);

    Ring.position.x = 0;
    Ring.position.y = 0;
    Ring.position.z = 0;
    Ring.rotation.x = -0.5 * Math.PI;
  }

  if (clickEvent) {
    planet.addEventListener("click", clickEvent);
  }

  return planet;
}
