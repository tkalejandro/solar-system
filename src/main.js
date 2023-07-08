import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'
import gsap from 'gsap'
import { environtmentSpace } from './modules/textures'
import { sun, earth, venus, jupiter, mars, mercury, neptune, pluto, saturn, uranus } from './modules/objects'


//#region CANVAS 
const canvas = document.querySelector('.webgl')

//#endregion

//#region SCENE
const scene = new THREE.Scene()
scene.background = environtmentSpace
//#endregion

//#region SIZES
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}
window.addEventListener('resize', () => {

  // Update sizes

  sizes.width = window.innerWidth
  sizes.height = window.innerHeight
  // Update Chamera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  // Update Render, this update the Canvas 
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

window.addEventListener('dblclick', () => {

  const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement
  console.log(fullscreenElement)
  if (!fullscreenElement) {
    if (canvas.requestFullscreen) {
      canvas.requestFullscreen()

    } else if (canvas.webkitRequestFullscre) {
      canvas.webkitFullscreen()
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen()

    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen()
    }
  }
})
//#endregion

//#region CAMERA
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.0001, 50000)
camera.position.z = 50

scene.add(camera)

//#endregion

//#region CONTROLS
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

//#endregion

//#region LIGHTS
const sunLight = new THREE.AmbientLight(0xffffff, 0.9)
scene.add(sunLight)
//#endregion

// Objects
scene.add(earth, jupiter, mars, mercury, neptune, pluto, saturn, sun, uranus, venus)

//#region RENDERER
const renderer = new THREE.WebGL1Renderer({
  canvas
})

renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
//#endregion

//#region ANIMATE
const clock = new THREE.Clock()

const changeCamera = (obj) => {

  controls.target = obj.position
  const boundingBox = new THREE.Box3().setFromObject(obj);
  const meshSize = new THREE.Vector3();
  boundingBox.getSize(meshSize);
  const diameter = meshSize.length();
  camera.position.z = diameter

  camera.position.x = obj.position.x
}

const params = {
  speed: 25,
  lookMars: () => changeCamera(mars),
  lookSun: () => changeCamera(sun),
  lookPluto: () => changeCamera(pluto),
  lookEarth: () => changeCamera(earth),
  lookUranus: () => changeCamera(uranus),
  lookVenus: () => changeCamera(venus),
  lookJupiter: () => changeCamera(jupiter),
  lookNeptune: () => changeCamera(neptune),
  lookSaturn: () => changeCamera(saturn),
  lookMercury: () => changeCamera(mercury)

}

const tick = () => {
  const elapsedTime = clock.getElapsedTime()

  // Update controls
  controls.update()



  // Calculate rotation speed based on the GUI input
  const rotationSpeed = ((Math.PI * 2) / (10 * 60 * 60)) * params.speed;

  // Sun
  sun.rotation.y += rotationSpeed
  // Earth
  earth.rotation.y += rotationSpeed;

  // Jupiter
  jupiter.rotation.y += rotationSpeed * 2; // Adjust the rotation speed as desired

  // Mars
  mars.rotation.y += rotationSpeed * 1.03; // Adjust the rotation speed as desired

  // Mercury
  mercury.rotation.y += rotationSpeed * 0.41; // Adjust the rotation speed as desired

  // Neptune
  neptune.rotation.y += rotationSpeed * 0.006; // Adjust the rotation speed as desired

  // Pluto
  pluto.rotation.y += rotationSpeed * 0.0042; // Adjust the rotation speed as desired

  // Saturn
  saturn.rotation.y += rotationSpeed * 0.44; // Adjust the rotation speed as desired

  // Uranus
  uranus.rotation.y += rotationSpeed * 0.78; // Adjust the rotation speed as desired

  // Venus
  venus.rotation.y += rotationSpeed * 1.92; // Adjust the rotation speed as desired



  // Render
  renderer.render(scene, camera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

//#endregion

const axisHelper = new THREE.AxesHelper()
scene.add(axisHelper)

tick()


// DEBUG

const gui = new GUI()

gui
  .add(params, 'speed')
  .min(0)
  .max(100)
  .step(1)
  .name('Rotation speed')
gui
  .add(params, 'lookSun')
  .name('Sun perspective')
gui
  .add(params, 'lookMercury')
  .name('Mercury perspective')
gui
  .add(params, 'lookVenus')
  .name('Venus perspective')
gui
  .add(params, 'lookEarth')
  .name('Earth perspective')
gui
  .add(params, 'lookMars')
  .name('Mars perspective')
gui
  .add(params, 'lookJupiter')
  .name('Jupiter perspective')
gui
  .add(params, 'lookSaturn')
  .name('Saturn perspective')

gui
  .add(params, 'lookUranus')
  .name('Uranus perspective')
gui
  .add(params, 'lookNeptune')
  .name('Neptune perspective')

gui
  .add(params, 'lookPluto')
  .name('Pluto perspective')

