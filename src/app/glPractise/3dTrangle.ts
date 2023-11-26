import { mat4 } from 'gl-matrix'

import { initShaders } from '../../components/initShader'
import { InintGlPractise } from './utils'
import { vec3, mix, flatten } from './common/MV'
// @ts-ignore
import VertexShader from './shader/vertexShader.glsl'
// @ts-ignore
import FragmentShader from './shader/fragmentShader.glsl'

const points: number[][] = []
const colors: number[][] = []

const NumTimesToSubdivide = 3

function triangle(a: number[], b: number[], c: number[], color: number) {
  // add colors and vertices for one triangle

  var baseColors = [vec3(1.0, 0.0, 0.0), vec3(0.0, 1.0, 0.0), vec3(0.0, 0.0, 1.0), vec3(0.0, 0.0, 0.0)]

  colors.push(baseColors[color])
  points.push(a)
  colors.push(baseColors[color])
  points.push(b)
  colors.push(baseColors[color])
  points.push(c)
}

function tetra(a: number[], b: number[], c: number[], d: number[]) {
  // tetrahedron with each side using
  // a different color

  triangle(a, c, b, 0)
  triangle(a, c, d, 1)
  triangle(a, b, d, 2)
  triangle(b, c, d, 3)
}

function divideTetra(a: number[], b: number[], c: number[], d: number[], count: number) {
  // check for end of recursion

  if (count === 0) {
    tetra(a, b, c, d)
  }

  // find midpoints of sides
  // divide four smaller tetrahedra
  else {
    var ab = mix(a, b, 0.5)
    var ac = mix(a, c, 0.5)
    var ad = mix(a, d, 0.5)
    var bc = mix(b, c, 0.5)
    var bd = mix(b, d, 0.5)
    var cd = mix(c, d, 0.5)

    --count

    divideTetra(a, ab, ac, ad, count)
    divideTetra(ab, b, bc, bd, count)
    divideTetra(ac, bc, c, cd, count)
    divideTetra(ad, bd, cd, d, count)
  }
}

export function init3dTrangle(props: InintGlPractise) {
  const { canvasRef } = props
  const gl = canvasRef.getContext('webgl') as WebGLRenderingContext
  // gl.viewport(0, 0, window.innerWidth, window.innerHeight)

  const vertices = [vec3(0.0, 0.0, -1.0), vec3(0.0, 0.9428, 0.3333), vec3(-0.8165, -0.4714, 0.3333), vec3(0.8165, -0.4714, 0.3333)]

  console.log('vertices', vertices)

  divideTetra(vertices[0], vertices[1], vertices[2], vertices[3], NumTimesToSubdivide)

  const program = initShaders({ gl, fragmentSource: FragmentShader, vertexSource: VertexShader })

  const cBuffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer)
  gl.bufferData(gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW)

  const vColor = gl.getAttribLocation(program as WebGLProgram, 'vColor')
  gl.vertexAttribPointer(vColor, 3, gl.FLOAT, false, 0, 0)
  gl.enableVertexAttribArray(vColor)

  const vBuffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer)
  gl.bufferData(gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW)

  const vPosition = gl.getAttribLocation(program as WebGLProgram, 'vPosition')
  gl.vertexAttribPointer(vPosition, 3, gl.FLOAT, false, 0, 0)
  gl.enableVertexAttribArray(vPosition)

  const rotateMatrix = mat4.create()
  mat4.fromRotation(rotateMatrix, (30 / 180) * Math.PI, [1, 0, 1])
  const u_rotateMatrix = gl.getUniformLocation(program as WebGLProgram, 'u_rotateMatrix')
  gl.uniformMatrix4fv(u_rotateMatrix, false, rotateMatrix)

  // console.log('points', points, colors)
  gl.clearColor(0, 0, 0, 1.0)

  // enable hidden-surface removal
  gl.enable(gl.DEPTH_TEST)

  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
  gl.drawArrays(gl.TRIANGLES, 0, points.length)

  window.addEventListener('resize', () => {
    // gl.viewport(0, 0, window.innerWidth, window.innerHeight)
  })
}
