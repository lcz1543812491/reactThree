import * as THREE from 'three'
import { AreasItem } from './interface'

export function createShape(props: { areaList: AreasItem[]; isTop?: boolean }) {
  const { areaList, isTop = false } = props

  const roomShape = new THREE.Shape()

  for (let i = 0; i < areaList.length; i++) {
    if (i === 0) {
      roomShape.moveTo(areaList[i].x / 100, areaList[i].y / 100)
    } else {
      roomShape.lineTo(areaList[i].x / 100, areaList[i].y / 100)
    }
  }

  const shapeGemeory = new THREE.ShapeGeometry(roomShape)
  shapeGemeory.rotateX(Math.PI / 2)

  const shapeMesh = new THREE.Mesh(
    shapeGemeory,
    new THREE.MeshBasicMaterial({
      color: 0xff0000,
      transparent: true,
      side: isTop ? THREE.FrontSide : THREE.DoubleSide
    })
  )
  shapeMesh.position.y = isTop ? 2.8 : 0

  return shapeMesh
}
