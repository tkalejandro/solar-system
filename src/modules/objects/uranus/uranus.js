import * as THREE from 'three'

const texture = new THREE.TextureLoader().load('/textures/planets/2k_uranus.jpg')

const uranusDistance = 2872.5;
const uranusDiameter = 0.0511;
const uranusGeometry = new THREE.SphereGeometry(uranusDiameter, 32, 16);
const uranusMaterial = new THREE.MeshStandardMaterial({map: texture});
const uranus = new THREE.Mesh(uranusGeometry, uranusMaterial);
uranus.position.x = uranusDistance;

export default uranus