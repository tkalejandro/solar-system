import * as THREE from 'three'

const texture = new THREE.TextureLoader().load('/textures/planets/2k_earth_daymap.jpg')

const earthDistance = 149.6;
const earthDiameter = 0.0128;
const earthGeometry = new THREE.SphereGeometry(earthDiameter, 32, 16);
const earthMaterial = new THREE.MeshStandardMaterial({map: texture});
const earth = new THREE.Mesh(earthGeometry, earthMaterial);
earth.position.x = earthDistance;






export default earth