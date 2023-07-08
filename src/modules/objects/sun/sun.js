import * as THREE from 'three'

const texture = new THREE.TextureLoader().load('/textures/celestials/2k_sun.jpg')

const sunGeometry = new THREE.SphereGeometry(1.3914, 32, 16);
const sunMaterial = new THREE.MeshStandardMaterial({ map: texture});
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
sun.position.x = 0

export default sun