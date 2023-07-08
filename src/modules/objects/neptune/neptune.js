import * as THREE from 'three'

const texture = new THREE.TextureLoader().load('/textures/planets/2k_neptune.jpg')

const neptuneDistance = 4495.1;
const neptuneDiameter = 0.0495;
const neptuneGeometry = new THREE.SphereGeometry(neptuneDiameter, 32, 16);
const neptuneMaterial = new THREE.MeshStandardMaterial({map: texture});
const neptune = new THREE.Mesh(neptuneGeometry, neptuneMaterial);
neptune.position.x = neptuneDistance;

export default neptune