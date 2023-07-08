import * as THREE from 'three'

// VENUS

const texture = new THREE.TextureLoader().load('/textures/planets/2k_venus_surface.jpg')

const venusDistance = 108.2;
const venusDiameter = 0.0121;
const venusGeometry = new THREE.SphereGeometry(venusDiameter, 32, 16);
const venusMaterial = new THREE.MeshStandardMaterial({map: texture});
const venus = new THREE.Mesh(venusGeometry, venusMaterial);
venus.position.x = venusDistance;

export default venus