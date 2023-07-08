import * as THREE from 'three'

// MERCURY
const texture = new THREE.TextureLoader().load('/textures/planets/2k_mercury.jpg')

const mercuryDistance = 57.9;
const mercuryDiameter = 0.0049;
const mercuryGeometry = new THREE.SphereGeometry(mercuryDiameter, 32, 16);
const mercuryMaterial = new THREE.MeshStandardMaterial({map: texture});
const mercury = new THREE.Mesh(mercuryGeometry, mercuryMaterial);
mercury.position.x = mercuryDistance;

export default mercury