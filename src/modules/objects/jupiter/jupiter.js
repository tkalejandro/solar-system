import * as THREE from 'three'

const texture = new THREE.TextureLoader().load('/textures/planets/2k_jupiter.jpg')
const jupiterDistance = 778.6;
const jupiterDiameter = 0.1430;
const jupiterGeometry = new THREE.SphereGeometry(jupiterDiameter, 32, 16);
const jupiterMaterial = new THREE.MeshStandardMaterial({map: texture});
const jupiter = new THREE.Mesh(jupiterGeometry, jupiterMaterial);
jupiter.position.x = jupiterDistance;

export default jupiter