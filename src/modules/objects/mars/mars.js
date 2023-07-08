import * as THREE from 'three'

const texture = new THREE.TextureLoader().load('/textures/planets/2k_mars.jpg')
const marsDistance = 227.9;
const marsDiameter = 0.0068;
const marsGeometry = new THREE.SphereGeometry(marsDiameter, 32, 16);
const marsMaterial = new THREE.MeshStandardMaterial({map: texture});
const mars = new THREE.Mesh(marsGeometry, marsMaterial);
mars.position.x = marsDistance;

export default mars