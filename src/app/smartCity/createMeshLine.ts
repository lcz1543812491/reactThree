import * as THREE from 'three'

interface CreateMeshLine {
  geometry: THREE.BufferGeometry
}

export function createMeshLine(props: CreateMeshLine) {
  const { geometry } = props

  const edges = new THREE.EdgesGeometry(geometry)
  const material = new THREE.LineBasicMaterial({ color: 0xffffff })
  const line = new THREE.LineSegments(edges, material)
  //   const geometry1 = edges
  //   const mesh = line
  return line
}
