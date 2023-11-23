import { mat4 } from 'gl-matrix'

import { initShaders } from '../../components/initShader'
import { InintGlPractise } from './utils'

export function init3D(props: InintGlPractise) {
  const { canvasRef } = props
  const webgl = canvasRef.getContext('webgl') as WebGLRenderingContext

  const vertexShader = `  
    attribute vec3 a_position;
    attribute vec3 a_color;
    uniform vec4 u_translate;
    uniform mat4 u_rotateMatrix;

    void main(){
     gl_Position = u_rotateMatrix * vec4(a_position, 1.0);
     gl_PointSize = 10.0;
    }
  `

  const fragMentShader = `
  precision highp float;

  void main(){
    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
  }
`
  const vertexs = new Float32Array([
    -0.5, 0.5, 0.0, 
    -0.5, -0.5, 0.0, 
    0.5, -0.5, 0.0, 
    0.5, 0.5, 0.0
  ])

  const program = initShaders({ gl: webgl, fragmentSource: fragMentShader, vertexSource: vertexShader })

  webgl?.clearColor(0.0, 0.0, 0.0, 1.0)
  webgl?.clear(webgl.COLOR_BUFFER_BIT)

  const buffer = webgl.createBuffer()
  webgl.bindBuffer(webgl.ARRAY_BUFFER, buffer)
  webgl.bufferData(webgl.ARRAY_BUFFER, vertexs, webgl.STATIC_DRAW)

  const a_position = webgl.getAttribLocation(program as WebGLProgram, 'a_position')
  webgl.vertexAttribPointer(a_position, 3, webgl.FLOAT, false, 3 * vertexs.BYTES_PER_ELEMENT, 0)
  webgl.enableVertexAttribArray(a_position)


  const rotateMatrix  = mat4.create()


  function draw(webgl: WebGLRenderingContext) {
    const n = 4

    // webgl.drawArrays(webgl.TRIANGLES, 0, 3)

    // webgl.drawArrays(webgl.POINTS, 0, n)
    //webgl.drawArrays(webgl.LINES, 0, 4)
    // webgl.drawArrays(webgl.LINE_LOOP, 0, 4)
    webgl.drawArrays(webgl.TRIANGLE_FAN, 0, n)
  }

  let deg = 0

  function  tick(){
    
    deg += 1


    mat4.fromRotation(rotateMatrix, deg / 180 * Math.PI,  [1, 0, 1])

    const u_rotateMatrix = webgl.getUniformLocation(program as WebGLProgram, 'u_rotateMatrix')
    webgl.uniformMatrix4fv(u_rotateMatrix, false, rotateMatrix)
    draw(webgl)
    requestAnimationFrame(tick)
  }

  tick()
}
