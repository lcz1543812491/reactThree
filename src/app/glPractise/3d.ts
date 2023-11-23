import { mat4 } from 'gl-matrix'

import { initShaders } from '../../components/initShader'
import { InintGlPractise } from './utils'
import { positions, colors as Vcolors } from './cube'

export function init3D(props: InintGlPractise) {
  const { canvasRef } = props
  const webgl = canvasRef.getContext('webgl') as WebGLRenderingContext

  const vertexShader = `  
    attribute vec3 a_position;
    attribute vec3 a_color;
    varying vec3 v_color;
    uniform mat4 u_translate;
    uniform mat4 u_rotateMatrix;
    uniform mat4 u_scaleMatrix;

    void main(){
     v_color = a_color;
     
     mat4 modelMatrix = u_rotateMatrix * u_translate * u_scaleMatrix;

     gl_Position = modelMatrix * vec4(a_position, 1.0);
     gl_PointSize = 10.0;
    }
  `

  const fragMentShader = `
  precision highp float;
  varying vec3 v_color;

  void main(){
    gl_FragColor = vec4(v_color, 1.0);
  }
`
  //   const vertexs = new Float32Array([
  //     -0.5, 0.5, 0.0,
  //     -0.5, -0.5, 0.0,
  //     0.5, -0.5, 0.0,
  //     0.5, 0.5, 0.0
  //   ])

  const vertexs = new Float32Array(positions)

  const program = initShaders({ gl: webgl, fragmentSource: fragMentShader, vertexSource: vertexShader })

  webgl?.clearColor(0.0, 0.0, 0.0, 1.0)
  webgl?.clear(webgl.COLOR_BUFFER_BIT)

  const buffer = webgl.createBuffer()
  webgl.bindBuffer(webgl.ARRAY_BUFFER, buffer)
  webgl.bufferData(webgl.ARRAY_BUFFER, vertexs, webgl.STATIC_DRAW)

  const a_position = webgl.getAttribLocation(program as WebGLProgram, 'a_position')
  webgl.vertexAttribPointer(a_position, 3, webgl.FLOAT, false, 3 * vertexs.BYTES_PER_ELEMENT, 0)
  webgl.enableVertexAttribArray(a_position)

  const buffer1 = webgl.createBuffer()
  webgl.bindBuffer(webgl.ARRAY_BUFFER, buffer1)
  webgl.bufferData(webgl.ARRAY_BUFFER, new Float32Array(Vcolors), webgl.STATIC_DRAW)
  const a_color = webgl.getAttribLocation(program as WebGLProgram, 'a_color')
  webgl.vertexAttribPointer(a_color, 3, webgl.FLOAT, false, 3 * vertexs.BYTES_PER_ELEMENT, 0)
  webgl.enableVertexAttribArray(a_color)

  const rotateMatrix = mat4.create()
  mat4.fromRotation(rotateMatrix, (45 / 180) * Math.PI, [1, 0, 1])
  const u_rotateMatrix = webgl.getUniformLocation(program as WebGLProgram, 'u_rotateMatrix')
  webgl.uniformMatrix4fv(u_rotateMatrix, false, rotateMatrix)


  const translate = mat4.create()
  mat4.fromTranslation(translate, [0, 0, 1])
  const u_translate = webgl.getUniformLocation(program as WebGLProgram, 'u_translate')
  webgl.uniformMatrix4fv(u_translate, false, translate)


  const scaleMatrix = mat4.create()
  mat4.fromScaling(scaleMatrix, [0.5, 1, 1])
  const u_scaleMatrix = webgl.getUniformLocation(program as WebGLProgram, 'u_scaleMatrix')
  webgl.uniformMatrix4fv(u_scaleMatrix, false, scaleMatrix)




  function draw(webgl: WebGLRenderingContext) {
    const n = 4

    // webgl.drawArrays(webgl.TRIANGLES, 0, 3)

    // webgl.drawArrays(webgl.POINTS, 0, n)
    //webgl.drawArrays(webgl.LINES, 0, 4)
    // webgl.drawArrays(webgl.LINE_LOOP, 0, 4)
    webgl.enable(webgl.DEPTH_TEST)

    for (let i = 0; i < 24; i += 4) {
      webgl.drawArrays(webgl.TRIANGLE_FAN, i, n)
    }
  }
  draw(webgl)

  let deg = 0

  //   function tick() {
  //     deg += 1
  //     mat4.fromRotation(rotateMatrix, (deg / 180) * Math.PI, [1, 0, 1])

  //     const u_rotateMatrix = webgl.getUniformLocation(program as WebGLProgram, 'u_rotateMatrix')
  //     webgl.uniformMatrix4fv(u_rotateMatrix, false, rotateMatrix)
  //     draw(webgl)
  //     requestAnimationFrame(tick)
  //   }

  // tick()
}
