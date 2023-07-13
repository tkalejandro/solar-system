import * as THREE from 'three'
import {earth} from '..'
//Lets add the Moon to Earth

const moonTexure = new THREE.TextureLoader().load('textures/celestials/2k_moon.jpg')
const moonDistance = earth.position.x
const moonDiameter = 0.0035

const moonGeometry = new THREE.SphereGeometry(moonDiameter, 32, 16)
const moonMaterial = new THREE.MeshStandardMaterial({map: moonTexure})
const moon = new THREE.Mesh(moonGeometry, moonMaterial)
moon.position.x = moonDistance
moon.rotation.x = Math.PI

export default moon