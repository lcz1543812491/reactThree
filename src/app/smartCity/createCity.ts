import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { modifyMaterial } from './modifyMaterial'
import { createMeshLine } from './createMeshLine'

interface CreateCity {
  scene: THREE.Scene
}

export function createCity(props: CreateCity) {
  const { scene } = props

  const loader = new GLTFLoader()
  const dracoLoader = new DRACOLoader()
  dracoLoader.setDecoderPath('draco/')
  loader.setDRACOLoader(dracoLoader)
  loader.load('/model/smartCity/city.glb', model => {
    // console.log('model', model)

    const meshBasicMaterial = new THREE.MeshBasicMaterial({ color: new THREE.Color('#0c0e6f') })

    model.scene.traverse((child: any) => {
      if (child.type === 'Mesh') {
        child.material = meshBasicMaterial
        modifyMaterial({ mesh: child })
      }
      if (child.name == 'Layerbuildings') {
        const mesh = createMeshLine({ geometry: child.geometry })
        const size = child.scale.x
        mesh.scale.set(size, size, size)
        scene.add(mesh)
      }
    })
    scene.add(model.scene)
  })
}
