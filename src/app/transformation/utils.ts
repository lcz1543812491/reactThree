import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
// @ts-ignore
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
// @ts-ignore
import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader'
// @ts-ignore
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
import gsap from 'gsap'

const gsapProps = {
  value: 0,
  value1: 0
}

export function transformation() {
  const scene = new THREE.Scene()

  const dirLight = new THREE.DirectionalLight(0xffffff)
  dirLight.position.set(0, 0, 1)
  scene.add(dirLight)
  const light = new THREE.AmbientLight(0xffffff, 0.5) // soft white light
  scene.add(light)

  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 900)
  camera.position.set(0, 5, 30)

  const axisHelper = new THREE.AxesHelper(100)
  scene.add(axisHelper)

  const render = new THREE.WebGLRenderer({
    antialias: true,
    canvas: document.getElementById('galaxy') as HTMLCanvasElement
  })
  render.setSize(window.innerWidth, window.innerHeight)
  //   render.shadowMap.enabled = true
  //   render.shadowMap.type = THREE.PCFSoftShadowMap
  render.outputColorSpace = THREE.SRGBColorSpace
  render.toneMapping = THREE.ACESFilmicToneMapping
  //render.toneMappingExposure = 0.1

  const controls = new OrbitControls(camera, render.domElement)
  controls.enableDamping = true
  // controls.autoRotate = true
  // controls.autoRotateSpeed = 0.5
  // controls.maxPolarAngle = Math.PI
  // controls.minPolarAngle = (Math.PI / 4) * 2

  const rGBELoader = new RGBELoader()
  rGBELoader.load('/texture/038.hdr', (texture: any) => {
    texture.mapping = THREE.EquirectangularReflectionMapping
    scene.background = texture
    scene.environment = texture
  })

  const dracoLoader = new DRACOLoader()
  dracoLoader.setDecoderPath('draco/')

  let petal: THREE.Mesh, stem: THREE.Mesh, petal2: THREE.Mesh, stem2: THREE.Mesh
  // GLTF loader
  const gltfLoader = new GLTFLoader()
  gltfLoader.setDRACOLoader(dracoLoader)
  gltfLoader.load('/model/transformation/f4.glb', (model: GLTF) => {
    // console.log(model)
    model.scene.rotation.x = Math.PI
    model.scene.traverse((child: THREE.Mesh) => {
      if (child.material && (child.material as any).name === 'Water') {
        child.material = new THREE.MeshStandardMaterial({
          color: 'skyblue',
          transparent: true,
          depthTest: false,
          depthWrite: false,
          opacity: 0.4
        })
      }
      if (child.material && (child.material as any).name === 'Stem') {
        stem = child
      }
      if (child.material && (child.material as any).name === 'Petal') {
        petal = child
        gltfLoader.load('/model/transformation/f2.glb', (model2: GLTF) => {
          model2.scene.traverse((child2: any) => {
            if (child2.material && child2.material.name === 'Stem') {
              stem2 = child2
              stem.geometry.morphAttributes.position = [stem2.geometry.attributes.position]
            }

            if (child2.material && child2.material.name === 'Petal') {
              petal2 = child2
              petal.geometry.morphAttributes.position = [petal2.geometry.attributes.position]
            }
          })
          stem.updateMorphTargets()
          petal.updateMorphTargets()

          gltfLoader.load('/model/transformation/f1.glb', (model3: GLTF) => {
            model3.scene.traverse((child3: any) => {
              if (child3.material && child3.material.name == 'Stem') {
                stem2 = child3
                stem.geometry.morphAttributes.position.push(stem2.geometry.attributes.position)
                stem.updateMorphTargets()
              }
              if (child3.material && child3.material.name == 'Petal') {
                petal2 = child3
                petal.geometry.morphAttributes.position.push(petal2.geometry.attributes.position)
                petal.updateMorphTargets()
              }
            })

            stem.morphTargetInfluences = stem.morphTargetInfluences || []
            petal.morphTargetInfluences = petal.morphTargetInfluences || []

            gsap.to(gsapProps, {
              value: 1,
              duration: 5,
              onUpdate: () => {
                ;(stem.morphTargetInfluences as any)[0] = gsapProps.value
                ;(petal.morphTargetInfluences as any)[0] = gsapProps.value
              },
              onComplete: () => {
                gsap.to(gsapProps, {
                  value1: 1,
                  duration: 5,
                  onUpdate: () => {
                    ;(stem.morphTargetInfluences as any)[1] = gsapProps.value1
                    ;(petal.morphTargetInfluences as any)[1] = gsapProps.value1
                  }
                })
              }
            })
          })
        })
      }
    })
    scene.add(model.scene)
  })

  const clock = new THREE.Clock()
  const raycaster = new THREE.Raycaster()

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    render.setSize(window.innerWidth, window.innerHeight)
  })

  function tick() {
    requestAnimationFrame(tick)
    const elapsed = clock.getElapsedTime()

    render.render(scene, camera)
    controls.update()
  }

  tick()
}
