import { mat4 } from 'gl-matrix'

import { initShaders } from '../../components/initShader'
import { InintGlPractise } from './utils'
import { colors, positions } from './cube'

// @ts-ignore
import VertexShader from './shader/cubeShader/vertexShader.glsl'
// @ts-ignore
import FragmentShader from './shader/cubeShader/fragmentShader.glsl'

export function initCubeRotate(props: InintGlPractise) {
  const { canvasRef } = props
  const gl = canvasRef.getContext('webgl') as WebGLRenderingContext
  // console.log('canvasRef', canvasRef)
  const program = initShaders({ gl, fragmentSource: FragmentShader, vertexSource: VertexShader })

  gl.clearColor(0.0, 0.0, 0.0, 1.0)
  gl.clear(gl.COLOR_BUFFER_BIT)
  // console.log('program', program)

  const positionsArray = new Float32Array(positions)

  const positionsBuffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, positionsBuffer)
  gl.bufferData(gl.ARRAY_BUFFER, positionsArray, gl.STATIC_DRAW)

  const vPosition = gl.getAttribLocation(program as WebGLProgram, 'vPosition')
  gl.vertexAttribPointer(vPosition, 3, gl.FLOAT, false, 3 * positionsArray.BYTES_PER_ELEMENT, 0)
  gl.enableVertexAttribArray(vPosition)




  const colorsArray = new Float32Array(colors)
  const colorsBuffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, colorsBuffer)
  gl.bufferData(gl.ARRAY_BUFFER, colorsArray, gl.STATIC_DRAW)

  const vColor = gl.getAttribLocation(program as WebGLProgram, 'vColor')
  gl.vertexAttribPointer(vColor, 3, gl.FLOAT, false, 3 * colorsArray.BYTES_PER_ELEMENT, 0)
  gl.enableVertexAttribArray(vColor)


  





  function draw(gl: WebGLRenderingContext) {
    const n = 4

    // webgl.drawArrays(webgl.TRIANGLES, 0, 3)

    // webgl.drawArrays(webgl.POINTS, 0, n)
    //webgl.drawArrays(webgl.LINES, 0, 4)
    // webgl.drawArrays(webgl.LINE_LOOP, 0, 4)
    gl.enable(gl.DEPTH_TEST)

    for (let i = 0; i < 24; i += 4) {
      gl.drawArrays(gl.TRIANGLE_FAN, i, n)
    }
  }

  // draw(gl)
  let deg = 0

  function tick(){
   
    deg += 1
    const uRotateMatrix = mat4.create()
    mat4.fromRotation(uRotateMatrix, deg / 180 * Math.PI * 2 ,[1, 1, 0])

    const u_rotateMatrix = gl.getUniformLocation(program as WebGLProgram, 'u_rotateMatrix')
    gl.uniformMatrix4fv(u_rotateMatrix, false, uRotateMatrix)

    gl.clearColor(0.0, 0.0, 0.0, 1.0)
    gl.clear(gl.COLOR_BUFFER_BIT)
    draw(gl)
    requestAnimationFrame(tick)
  }

  tick()
}
