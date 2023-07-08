import * as THREE from 'three'

const texture = new THREE.TextureLoader().load('/textures/planets/2k_saturn.jpg')

const saturnDistance = 1433.5;
const saturnDiameter = 0.1205;
const saturnGeometry = new THREE.SphereGeometry(saturnDiameter, 32, 16);
const saturnMaterial = new THREE.MeshStandardMaterial({map: texture});
const saturn = new THREE.Mesh(saturnGeometry, saturnMaterial);
saturn.position.x = saturnDistance;

export default saturn