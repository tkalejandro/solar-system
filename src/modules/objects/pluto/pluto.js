import * as THREE from 'three'

const texture = new THREE.TextureLoader().load('/textures/planets/plutomap1k.jpg')
const plutoDistance = 5058;
const plutoDiameter = 0.0024;
const plutoGeometry = new THREE.SphereGeometry(plutoDiameter, 32, 16);
const plutoMaterial = new THREE.MeshStandardMaterial({map: texture});
const pluto = new THREE.Mesh(plutoGeometry, plutoMaterial);
pluto.position.x = plutoDistance;

export default pluto