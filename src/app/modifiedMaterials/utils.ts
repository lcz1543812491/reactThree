import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

function updateAllMaterials(scene: THREE.Scene) {
    scene.traverse(child => {
      if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
        child.material.envMapIntensity = 1
        child.material.needsUpdate = true
        child.castShadow = true
        child.receiveShadow = true
      }
    })
}

export function realisticRender() {
  const scene = new THREE.Scene()

  const ambentLight = new THREE.AmbientLight(0xffffff, 0.2)
  const directLight = new THREE.DirectionalLight(0xffffff, 1)
  directLight.position.set(0.25, 3, -2.25)
  directLight.castShadow = true

  directLight.shadow.mapSize.width = 1024
  directLight.shadow.mapSize.height = 1024

  directLight.shadow.camera.top = 2
  directLight.shadow.camera.bottom = -2
  directLight.shadow.camera.left = -2
  directLight.shadow.camera.right = 2

  directLight.shadow.camera.near = 1
  directLight.shadow.camera.far = 15

  directLight.shadow.radius = 10

  const directLightShadowHelper = new THREE.CameraHelper(directLight.shadow.camera)
  directLightShadowHelper.visible = true
  scene.add(directLightShadowHelper)

  //scene.add(ambentLight)
  scene.add(directLight)


  const camera = new THREE.PerspectiveCamera(90, (window as Window).innerWidth / (window as Window).innerHeight)
  camera.position.z = 4
  scene.add(camera)

  const axisHelper = new THREE.AxesHelper()
  scene.add(axisHelper)

  const render = new THREE.WebGLRenderer({ antialias: true, canvas: document.getElementById('galaxy') as HTMLCanvasElement })
  render.setSize(window.innerWidth, window.innerHeight)
  render.shadowMap.enabled = true
  render.shadowMap.type = THREE.PCFSoftShadowMap
  render.outputColorSpace = THREE.SRGBColorSpace
  render.toneMapping = THREE.ACESFilmicToneMapping
  render.toneMappingExposure = 2
  // render.physicallyCorrectLights = true
  // console.log('render', render.physicallyCorrectLights)

  const controls = new OrbitControls(camera, render.domElement)
  controls.enableDamping = true

  const clock = new THREE.Clock()

  const gltfLoader = new GLTFLoader()

  const cubeTextureLoader = new THREE.CubeTextureLoader()
  const textureLoader = new THREE.TextureLoader()
  const environmentMap = cubeTextureLoader.load(['/environmentMaps/0/px.jpg', '/environmentMaps/0/nx.jpg', '/environmentMaps/0/py.jpg', '/environmentMaps/0/ny.jpg', '/environmentMaps/0/pz.jpg', '/environmentMaps/0/nz.jpg'])

  environmentMap.colorSpace = THREE.SRGBColorSpace
  scene.background = environmentMap
  scene.environment = environmentMap

  
  const mapTexture = textureLoader.load('/model/LeePerrySmith/color.jpg')
  mapTexture.colorSpace = THREE. SRGBColorSpace 

  const normalTexture = textureLoader.load('/model/LeePerrySmith/normal.jpg')

  const material = new THREE.MeshStandardMaterial( {
    map: mapTexture,
    normalMap: normalTexture
  })  

  const customTime = {
    uTime: {value: 0}
  }

  const depthMaterial = new THREE.MeshDepthMaterial({ depthPacking: THREE.RGBADepthPacking })

  material.onBeforeCompile = (shader) => {
    console.log('onBeforeCompile', shader.vertexShader)
    shader.uniforms.uTime = customTime.uTime

    shader.vertexShader = shader.vertexShader.replace('#include <common>', 
    ` #include <common>
      uniform float uTime;

    mat2 rotate2d(float _angle){
        return mat2(cos(_angle),-sin(_angle),sin(_angle),cos(_angle));
     }
      `)


    shader.vertexShader = shader.vertexShader.replace(
        '#include <beginnormal_vertex>',
        `
        #include <beginnormal_vertex>

        objectNormal.xz = rotate2d(sin(position.y + uTime) * 0.9) * objectNormal.xz;
        `
     );
      


      shader.vertexShader = shader.vertexShader.replace('#include <begin_vertex>', `
        
      #include <begin_vertex>

      transformed.xz = rotate2d(sin(position.y + uTime) * 0.9) * transformed.xz;
      `)
  }


  depthMaterial.onBeforeCompile = (shader) => {
    console.log('onBeforeCompile', shader.vertexShader)
    shader.uniforms.uTime = customTime.uTime

    shader.vertexShader = shader.vertexShader.replace('#include <common>', 
    ` #include <common>
      uniform float uTime;

    mat2 rotate2d(float _angle){
        return mat2(cos(_angle),-sin(_angle),sin(_angle),cos(_angle));
     }
      `)


      shader.vertexShader = shader.vertexShader.replace('#include <begin_vertex>', `
        
      #include <begin_vertex>

      transformed.xz = rotate2d((position.y + uTime) * 0.9) * transformed.xz;
      `)
  }

  gltfLoader.load('/model/LeePerrySmith/LeePerrySmith.glb', model => {
    const mesh = model.scene.children[0]
    mesh.rotation.y = Math.PI * 0.5;

    (mesh as any).material = material;

    mesh.customDepthMaterial = depthMaterial

    scene.add(mesh)

    // Update materials
    updateAllMaterials(scene)
  })

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    render.setSize(window.innerWidth, window.innerHeight)
  })

  function tick() {
    const time = clock.getElapsedTime()
    customTime.uTime.value = time

    render.render(scene, camera)
    controls.update()
    requestAnimationFrame(tick)
  }

  tick()
}
