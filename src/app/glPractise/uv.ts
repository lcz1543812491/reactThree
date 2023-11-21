import { mat4 } from 'gl-matrix'

import { initShaders } from '../../components/initShader'
import { InintGlPractise } from './utils'

export function inintUv(props: InintGlPractise) {
  const { canvasRef } = props
  const webgl = canvasRef.getContext('webgl') as WebGLRenderingContext

  const vertexShader = `  
      attribute vec2 a_position;
      attribute vec3 a_color;
      attribute vec2 a_uv;
      varying vec2 v_uv;

      void main(){

       v_uv = a_uv;

       gl_Position = vec4(a_position, 0.0, 1.0);
       gl_PointSize = 10.0;
      }
    `

  const fragMentShader = `
      precision highp float;
      varying vec2 v_uv;
      uniform sampler2D u_sampler;

      void main(){

        vec4 color = texture2D(u_sampler, v_uv);
        gl_FragColor = color;
      }
    `
  const program = initShaders({ gl: webgl, fragmentSource: fragMentShader, vertexSource: vertexShader }) as WebGLProgram

  webgl?.clearColor(0.0, 0.0, 0.0, 1.0)
  webgl?.clear(webgl.COLOR_BUFFER_BIT)

  // const vertexts = new Float32Array([-0.5, 0.0, 0.5, 0.0, 0.0, 0.5])

  const vertexts = new Float32Array([
    -0.5, 0.5, 0.0,
    -0.5, -0.5, 0.0,
    0.5, -0.5, 0.0,
    0.5, 0.5, 0.0,
  ])

  const uvs = new Float32Array([
    0.0, 0.0,
    1.0, 0.0,
    1.0, 1.0,
    0.0, 1.0
  ])

  const buffer = webgl.createBuffer()
  webgl.bindBuffer(webgl.ARRAY_BUFFER, buffer)
  webgl.bufferData(webgl.ARRAY_BUFFER, vertexts, webgl.STATIC_DRAW)

  //console.log('buffer', buffer)
  console.log(vertexts.BYTES_PER_ELEMENT)

  const a_position = webgl.getAttribLocation(program, 'a_position')
  webgl.vertexAttribPointer(a_position, 3, webgl.FLOAT, false, 0, 0)
  webgl.enableVertexAttribArray(a_position)



  const uvbuffer = webgl.createBuffer()
  webgl.bindBuffer(webgl.ARRAY_BUFFER, uvbuffer)
  webgl.bufferData(webgl.ARRAY_BUFFER, uvs, webgl.STATIC_DRAW)

  const a_uv = webgl.getAttribLocation(program, 'a_uv')
  webgl.vertexAttribPointer(a_uv, 2, webgl.FLOAT, false, 2 * uvs.BYTES_PER_ELEMENT , 0)
  webgl.enableVertexAttribArray(a_uv)


  // const matrixs = [sx, 0, 0, 0, 0, sy, 0, 0, 0, 0, sz, 0, 0, 0, 0, 1]

  const matrixs = mat4.create()

  //mat4.fromScaling(matrixs, [2, 1, 1])
  // mat4.fromTranslation(matrixs, [0.2, 0.2, 0])
  mat4.fromRotation(matrixs, 90 / 180 * Math.PI, [0, 0, 1])



  const u_matrix = webgl.getUniformLocation(program, 'u_matrix')
  webgl.uniformMatrix4fv(u_matrix, false, matrixs)


  function draw(webgl: WebGLRenderingContext) {
    const n = 4

    // webgl.drawArrays(webgl.TRIANGLES, 0, 3)

    //webgl.drawArrays(webgl.POINTS, 0, n)
    //webgl.drawArrays(webgl.LINES, 0, 4)
    // webgl.drawArrays(webgl.LINE_LOOP, 0, 4)
    webgl.drawArrays(webgl.TRIANGLE_FAN, 0, n)
  }


  function initTexture(webgl: WebGLRenderingContext, program: WebGLProgram){
    const texture = webgl.createTexture()

    const u_sampler = webgl.getUniformLocation(program, 'u_sampler')
    const texture2DImage = new Image()
    texture2DImage.src = '/texture/texture/colors.png'

    texture2DImage.onload = () => {
       webgl.pixelStorei(webgl.UNPACK_FLIP_Y_WEBGL, true)
       webgl.activeTexture(webgl.TEXTURE)
       webgl.bindTexture(webgl.TEXTURE_2D, texture)

       webgl.texParameteri(webgl.TEXTURE_2D, webgl.TEXTURE_MIN_FILTER, webgl.LINEAR)

       webgl.texImage2D(webgl.TEXTURE_2D, 0, webgl.RGBA, webgl.RGBA, webgl.UNSIGNED_BYTE, texture2DImage)

       webgl.uniform1i(u_sampler, 0)
       draw(webgl)
    }

  }

  initTexture(webgl, program)
}
