import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'
import gsap from 'gsap'
import { environtmentSpace } from './modules/textures'
import { saturnRing, sun, earth, venus, jupiter, mars, mercury, neptune, pluto, saturn, uranus, moon } from './modules/objects'

console.log(moon)

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
scene.add(earth, saturnRing, jupiter, mars, mercury, neptune, pluto, saturn, sun, uranus, venus, moon)

//#region RENDERER
const renderer = new THREE.WebGL1Renderer({
  canvas
})

renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
//#endregion

//#region ANIMATE
const clock = new THREE.Clock()

// Create a timeline for the Moon orbit
const moonTimeline = gsap.timeline({ repeat: -1 });

// Define the Moon orbit animation
moonTimeline.to(moon.position, {
  duration: 180, // Animation duration (in seconds)
  angle: Math.PI * 2, // Rotate 360 degrees around the Earth
  ease: 'infinite', // Easing function
  onUpdate: () => {
    const angle = moonTimeline.progress() * Math.PI * 2;
    const radius = 20; // Adjust the radius of the Moon's orbit around Earth
    moon.position.x = earth.position.x + Math.sin(angle) * radius;
    moon.position.z = earth.position.z + Math.cos(angle) * radius;
  },
});

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
  lookMoon: () => changeCamera(moon),
  lookUranus: () => changeCamera(uranus),
  lookVenus: () => changeCamera(venus),
  lookJupiter: () => changeCamera(jupiter),
  lookNeptune: () => changeCamera(neptune),
  lookSaturn: () => changeCamera(saturn),
  lookMercury: () => changeCamera(mercury),
  unReal: () => {
    camera.position.z = 5
    mercury.position.x = 2;
    venus.position.x = 2.2;
    earth.position.x = 2.4;
    moon.position.x = 2.45
    mars.position.x = 2.6;
    jupiter.position.x = 3.2;
    saturn.position.x = 4;
    saturnRing.position.x = 4;
    uranus.position.x = 4.8;
    neptune.position.x = 5;
    pluto.position.x = 5.2;

  },
  real: () => {
    mercury.position.x = 57.9
    venus.position.x = 108.2;
    earth.position.x = 149.6;
    moon.position.x = 149.98
    mars.position.x = 227.9;
    jupiter.position.x = 778.6;
    saturn.position.x = 1433.5;
    saturnRing.position.x = 1433.5;

    uranus.position.x = 2872.5;
    neptune.position.x = 4495.1;
    pluto.position.x = 5058;
  }

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
  jupiter.rotation.y += rotationSpeed * 2;

  // Mars
  mars.rotation.y += rotationSpeed * 1.03; 

  // Mercury
  mercury.rotation.y += rotationSpeed * 0.41; 
  // Neptune
  neptune.rotation.y += rotationSpeed * 0.006; 

  // Pluto
  pluto.rotation.y += rotationSpeed * 0.0042; 

  // Saturn
  saturn.rotation.y += rotationSpeed * 0.44; 

  // Uranus
  uranus.rotation.y += rotationSpeed * 0.78; 

  // Venus
  venus.rotation.y += rotationSpeed * 1.92;



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
  .add(params, 'lookMoon')
  .name('Moon perspective')
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
gui
  .add(params, 'unReal')
  .name('Collapse planets')
gui
  .add(params, 'real')
  .name('Real distance')

