import { mat4 } from 'gl-matrix'

import { initShaders } from '../../components/initShader'
import { InintGlPractise } from './utils'

export function inintAnimate(props: InintGlPractise) {
  const { canvasRef } = props
  const webgl = canvasRef.getContext('webgl') as WebGLRenderingContext

  const vertexShader = `  
      attribute vec2 a_position;
      attribute vec3 a_color;
      uniform vec4 u_translate;
      uniform mat4 u_matrix;

      void main(){
       gl_Position = u_matrix * vec4(a_position, 0.0, 1.0) + u_translate;
       gl_PointSize = 10.0;
      }
    `

  const fragMentShader = `
      precision highp float;

      void main(){
        gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
      }
    `
  const program = initShaders({ gl: webgl, fragmentSource: fragMentShader, vertexSource: vertexShader }) as WebGLProgram

  webgl?.clearColor(0.0, 0.0, 0.0, 1.0)
  webgl?.clear(webgl.COLOR_BUFFER_BIT)

  const vertexts = new Float32Array([-0.5, 0.0, 0.5, 0.0, 0.0, 0.5])

  // const vertexts = new Float32Array([
  //   -0.5, 0.5, 1.0, 0.0, 0.0,
  //   -0.5, -0.5, 0.0, 1.0, 0.0,
  //   0.5, -0.5, 0.0, 0.0, 1.0,
  //   0.5, 0.5, 1.0, 0.0, 0.0,
  // ])

  const buffer = webgl.createBuffer()
  webgl.bindBuffer(webgl.ARRAY_BUFFER, buffer)
  webgl.bufferData(webgl.ARRAY_BUFFER, vertexts, webgl.STATIC_DRAW)

  //console.log('buffer', buffer)
  console.log(vertexts.BYTES_PER_ELEMENT)

  const a_position = webgl.getAttribLocation(program, 'a_position')
  webgl.vertexAttribPointer(a_position, 2, webgl.FLOAT, false, 2 * vertexts.BYTES_PER_ELEMENT, 0)
  webgl.enableVertexAttribArray(a_position)

  const sx = 1,
    sy = 2,
    sz = 1

  // const matrixs = [sx, 0, 0, 0, 0, sy, 0, 0, 0, 0, sz, 0, 0, 0, 0, 1]

  const matrixs = mat4.create()

  //mat4.fromScaling(matrixs, [2, 1, 1])
  // mat4.fromTranslation(matrixs, [0.2, 0.2, 0])
  mat4.fromRotation(matrixs, 90 / 180 * Math.PI, [0, 0, 1])



  const u_matrix = webgl.getUniformLocation(program, 'u_matrix')
  webgl.uniformMatrix4fv(u_matrix, false, matrixs)

  //   const a_color = webgl.getAttribLocation(program, 'a_color')
  //   webgl.vertexAttribPointer(a_color, 3, webgl.FLOAT, false, 5 * vertexts.BYTES_PER_ELEMENT, 2 * vertexts.BYTES_PER_ELEMENT)
  //   webgl.enableVertexAttribArray(a_color)

  function draw(webgl: WebGLRenderingContext) {
    const n = 3

    // webgl.drawArrays(webgl.TRIANGLES, 0, 3)

    webgl.drawArrays(webgl.POINTS, 0, n)
    //webgl.drawArrays(webgl.LINES, 0, 4)
    // webgl.drawArrays(webgl.LINE_LOOP, 0, 4)
    webgl.drawArrays(webgl.TRIANGLE_FAN, 0, n)
  }

  let tx = 0
  let ty = 0

  let speed_x = 0.01
  let speed_y = 0.01

  function tick() {
    tx += speed_x
    ty += speed_y

    if (tx > 0.5 || tx < -0.5) {
      speed_x *= -1
    }

    if (ty > 0.5 || ty < -0.5) {
      speed_y *= -1
    }

    const u_translate = webgl.getUniformLocation(program, 'u_translate')

    webgl.uniform4f(u_translate, tx, ty, 0.0, 0.0)
    draw(webgl)
    requestAnimationFrame(tick)
  }

  // tick()
  draw(webgl)
}
