import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Textures
const textureLoader = new THREE.TextureLoader()
const cubeTextureLoader = new THREE.CubeTextureLoader()

const doorColorTexture = textureLoader.load('/textures/door/color.jpg')
const doorAlphaTexture = textureLoader.load('/textures/door/alpha.jpg')
const doorAmbientOcclusionTexture = textureLoader.load(
  '/textures/door/ambientOcclusion.jpg'
)
const doorHeightTexture = textureLoader.load('/textures/door/height.jpg')
const doorNormalTexture = textureLoader.load('/textures/door/normal.jpg')
const doorMetalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
const doorRoughnessTexture = textureLoader.load('/textures/door/roughness.jpg')
const matcapTexture = textureLoader.load('/textures/matcaps/8.png')
const gradientTexture = textureLoader.load('/textures/gradients/5.jpg')

const environmentMapTexture = cubeTextureLoader.load([
  '/textures/environmentMaps/0/px.jpg',
  '/textures/environmentMaps/0/nx.jpg',
  '/textures/environmentMaps/0/py.jpg',
  '/textures/environmentMaps/0/ny.jpg',
  '/textures/environmentMaps/0/pz.jpg',
  '/textures/environmentMaps/0/nz.jpg',
])

// Canvas
const canvas = document.querySelector('canvas.webgl') as HTMLCanvasElement

// Scene
const scene = new THREE.Scene()

/**
 * Controls to add
 * - metalness
 * - roughness
 * - lighting
 */

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(ambientLight)

const light = new THREE.PointLight(0xffffff, 0.5)
light.position.x = 2
light.position.y = 3
light.position.z = 4
scene.add(light)

type MaterialType =
  | 'MeshStandardMaterial'
  | 'MeshBasicMaterial'
  | 'MeshNormalMaterial'
  | 'MeshMatcapMaterial'
  | 'MeshDepthMaterial'
  | 'MeshLambertMaterial'
  | 'MeshPhongMaterial'
  | 'MeshToonMaterial'
  | 'MeshPhysicalMaterial'

const params = {
  material: 'MeshStandardMaterial' as MaterialType,
  wireframe: false,
  flatShading: false,
  side: 'DoubleSide' as 'FrontSide' | 'BackSide' | 'DoubleSide',
  opacity: 1,
  map: false,
  color: 0xffffff,
  specular: 0x111111,
  alphaMap: false,
  aoMap: false,
  aoMapIntensity: 1,
  displacementMap: false,
  displacementScale: 0,
  metalness: 0.5,
  metalnessMap: false,
  roughness: 0.5,
  roughnessMap: false,
  normalMap: false,
  normalScale: 0.5,
  clearcoat: 0,
  clearcoatRoughness: 0,
  gradientTexture: false,
}

/**
 * Objects
 */

// material.shininess = 100
// material.specular = new THREE.Color(0x1188ff)

// const material = new THREE.MeshToonMaterial()
// gradientTexture.generateMipmaps = false
// gradientTexture.minFilter = THREE.NearestFilter
// gradientTexture.magFilter = THREE.NearestFilter
// material.gradientMap = gradientTexture

// const material = new THREE.MeshStandardMaterial()
// material.metalness = 0
// material.roughness = 1
// gui.add(material, 'metalness').min(0).max(1).step(0.0001)
// gui.add(material, 'roughness').min(0).max(1).step(0.0001)
// material.map = doorColorTexture
// material.aoMap = doorAmbientOcclusionTexture
// material.aoMapIntensity = 1
// material.displacementMap = doorHeightTexture
// material.displacementScale = 0.05
// material.metalnessMap = doorMetalnessTexture
// material.roughnessMap = doorRoughnessTexture
// material.normalMap = doorNormalTexture
// material.normalScale.set(0.5, 0.5)
// material.transparent = true
// material.alphaMap = doorAlphaTexture

// const material = new THREE.MeshPhysicalMaterial()
// material.metalness = 0
// material.roughness = 1
// gui.add(material, 'metalness').min(0).max(1).step(0.0001)
// gui.add(material, 'roughness').min(0).max(1).step(0.0001)
// material.map = doorColorTexture
// material.aoMap = doorAmbientOcclusionTexture
// material.aoMapIntensity = 1
// material.displacementMap = doorHeightTexture
// material.displacementScale = 0.05
// material.metalnessMap = doorMetalnessTexture
// material.roughnessMap = doorRoughnessTexture
// material.normalMap = doorNormalTexture
// material.normalScale.set(0.5, 0.5)
// material.transparent = true
// material.alphaMap = doorAlphaTexture
// material.clearcoat = 1
// material.clearcoatRoughness = 0
let initMaterial = new THREE.MeshStandardMaterial()
initMaterial.metalness = 0.7
initMaterial.roughness = 0.2
initMaterial.side = THREE[params.side]
initMaterial.envMap = environmentMapTexture

let material = initMaterial as THREE.Material

const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 64, 64), material)
sphere.geometry.setAttribute(
  'uv2',
  new THREE.BufferAttribute(
    (sphere.geometry.attributes.uv as THREE.BufferAttribute).array,
    2
  )
)
sphere.position.x = -1.5

const plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1, 100, 100), material)
plane.geometry.setAttribute(
  'uv2',
  new THREE.BufferAttribute(
    (plane.geometry.attributes.uv as THREE.BufferAttribute).array,
    2
  )
)

const torus = new THREE.Mesh(
  new THREE.TorusGeometry(0.3, 0.2, 64, 128),
  material
)
torus.geometry.setAttribute(
  'uv2',
  new THREE.BufferAttribute(
    (torus.geometry.attributes.uv as THREE.BufferAttribute).array,
    2
  )
)
torus.position.x = 1.5
scene.add(sphere, plane, torus)

gui
  .add(params, 'material', [
    'MeshStandardMaterial',
    'MeshBasicMaterial',
    'MeshNormalMaterial',
    'MeshMatcapMaterial',
    'MeshDepthMaterial',
    'MeshLambertMaterial',
    'MeshPhongMaterial',
    'MeshToonMaterial',
    'MeshPhysicalMaterial',
  ])
  .onChange(() => {
    // conditionally add options
    material = new THREE[params.material]()
    if ('matcap' in material) {
      material.matcap = matcapTexture
    }
    if ('wireframe' in material) {
      material.wireframe = params.wireframe
    }
    material.side = THREE[params.side]
    if ('color' in material) {
      material.color = new THREE.Color(params.color)
    }
    torus.material = material
    sphere.material = material
    plane.material = material

    if ('shininess' in material) {
      gui.add(material, 'shininess').min(0).max(1).step(0.0001)
    }

    if ('specular' in material) {
      material.specular = new THREE.Color(params.specular)
    }

    material.needsUpdate = true
  })

gui
  .add(params, 'metalness')
  .min(0)
  .max(1)
  .step(0.0001)
  .onChange(() => {
    if ('metalness' in material) {
      material.metalness = params.metalness
      material.needsUpdate = true
    }
  })

gui
  .add(params, 'roughness')
  .min(0)
  .max(1)
  .step(0.0001)
  .onChange(() => {
    if ('roughness' in material) {
      material.roughness = params.roughness
      material.needsUpdate = true
    }
  })

gui.addColor(params, 'color').onChange(() => {
  if ('color' in material) {
    material.color = new THREE.Color(params.color)
  }
})

gui.addColor(params, 'specular').onChange(() => {
  if ('specular' in material) {
    material.specular = new THREE.Color(params.specular)
    material.needsUpdate = true
  }
})
gui.add(params, 'wireframe').onChange(() => {
  if ('wireframe' in material) {
    material.wireframe = params.wireframe
  }
})
gui.add(params, 'flatShading').onChange(() => {
  if ('flatShading' in material) {
    material.flatShading = params.flatShading
    material.needsUpdate = true
  }
})

gui.add(params, 'aoMap').onChange(() => {
  if ('aoMap' in material) {
    material.aoMap = params.aoMap ? doorAmbientOcclusionTexture : null
    material.needsUpdate = true
  }
})

gui
  .add(params, 'aoMapIntensity')
  .min(0)
  .max(1)
  .step(0.0001)
  .onChange(() => {
    if ('aoMapIntensity' in material) {
      material.aoMapIntensity = params.aoMapIntensity
      material.needsUpdate = true
    }
  })

gui.add(params, 'displacementMap').onChange(() => {
  if ('displacementMap' in material) {
    material.displacementMap = params.displacementMap ? doorHeightTexture : null
    material.needsUpdate = true
  }
})

gui
  .add(params, 'displacementScale')
  .min(0)
  .max(1)
  .step(0.0001)
  .onChange(() => {
    if ('displacementScale' in material) {
      material.displacementScale = params.displacementScale
    }
  })

gui.add(params, 'metalnessMap').onChange(() => {
  if ('metalnessMap' in material) {
    material.metalnessMap = params.metalnessMap ? doorMetalnessTexture : null
    material.needsUpdate = true
  }
})

gui.add(params, 'roughnessMap').onChange(() => {
  if ('roughnessMap' in material) {
    material.roughnessMap = params.roughnessMap ? doorRoughnessTexture : null
    material.needsUpdate = true
  }
})

gui.add(params, 'normalMap').onChange(() => {
  if ('normalMap' in material) {
    material.normalMap = params.normalMap ? doorNormalTexture : null
    material.needsUpdate = true
  }
})

gui
  .add(params, 'normalScale')
  .min(0)
  .max(1)
  .step(0.0001)
  .onChange(() => {
    if ('normalScale' in material) {
      ;(material as THREE.MeshStandardMaterial).normalScale.set(
        params.normalScale,
        params.normalScale
      )
    }
  })

gui
  .add(params, 'clearcoat')
  .min(0)
  .max(1)
  .step(0.0001)
  .onChange(() => {
    if ('clearcoat' in material) {
      material.clearcoat = params.clearcoat
    }
  })

gui
  .add(params, 'clearcoatRoughness')
  .min(0)
  .max(1)
  .step(0.0001)
  .onChange(() => {
    if ('clearcoatRoughness' in material) {
      material.clearcoatRoughness = params.clearcoatRoughness
    }
  })

gui.add(params, 'alphaMap').onChange(() => {
  if ('alphaMap' in material) {
    material.alphaMap = params.alphaMap ? doorAlphaTexture : null
    material.needsUpdate = true
    material.transparent = params.alphaMap
  }
})
gui.add(params, 'map').onChange(() => {
  if ('map' in material) {
    material.map = params.map ? doorColorTexture : null
    material.needsUpdate = true
  }
})

gui.add(params, 'gradientTexture').onChange(() => {
  if ('gradientTexture' in material) {
    material.gradientTexture = params.gradientTexture ? gradientTexture : null
    material.needsUpdate = true
  }
})

gui.add(material, 'opacity', 0, 1, 0.01).onChange(() => {
  // need to set transparent to true for opacity to work
  material.transparent = material.opacity < 1
  material.transparent = material.opacity < 1
  material.transparent = material.opacity < 1
})

gui
  .add(params, 'side', ['FrontSide', 'BackSide', 'DoubleSide'])
  .onChange(() => {
    torus.material.side = THREE[params.side]
    sphere.material.side = THREE[params.side]
    plane.material.side = THREE[params.side]
  })

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

window.addEventListener('resize', () => {
  // Update sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  // Update camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  // Update renderer
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () => {
  const elapsedTime = clock.getElapsedTime()

  // Update objects
  sphere.rotation.y = 0.1 * elapsedTime
  plane.rotation.y = 0.1 * elapsedTime
  torus.rotation.y = 0.1 * elapsedTime

  sphere.rotation.x = 0.15 * elapsedTime
  plane.rotation.x = 0.15 * elapsedTime
  torus.rotation.x = 0.15 * elapsedTime

  // Update controls
  controls.update()

  // Render
  renderer.render(scene, camera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()
