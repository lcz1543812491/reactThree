import * as THREE from 'three'

interface CreateEnvironment {
  scene: THREE.Scene
}

export function createEnvironment(props: CreateEnvironment) {
  const { scene } = props

  const textureLoader = new THREE.CubeTextureLoader()

  const texture = textureLoader.load(['/texture/texture/smartCity/1.jpg', '/texture/texture/smartCity/2.jpg', '/texture/texture/smartCity/3.jpg', '/texture/texture/smartCity/4.jpg', '/texture/texture/smartCity/5.jpg', '/texture/texture/smartCity/6.jpg'])

  scene.environment = texture
  scene.background = texture
}
