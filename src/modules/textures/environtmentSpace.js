import * as THREE from 'three'

//For Space enviroment map
const cubeTextureLoader = new THREE.CubeTextureLoader()
const enviromentSpaceMapTexture = cubeTextureLoader.load([
    '/textures/space/px.png',
    '/textures/space/nx.png',
    '/textures/space/py.png',
    '/textures/space/ny.png',
    '/textures/space/pz.png',
    '/textures/space/nz.png',
])

export default enviromentSpaceMapTexture