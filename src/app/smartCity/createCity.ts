import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'

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
    console.log('model', model)
    model.scene.traverse((child: any) => {
      if (child.type === 'Mesh') {
        child.material = new THREE.MeshBasicMaterial({ color: new THREE.Color(0x00ffff) })
      }
    })
    scene.add(model.scene)
  })
}
