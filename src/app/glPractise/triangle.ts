import { initShaders } from '../../components/initShader' 
import { InintGlPractise } from './utils'


export function inintTriangle(props: InintGlPractise) {
    const { canvasRef } = props
    const webgl = canvasRef.getContext('webgl') as WebGLRenderingContext

    const vertexShader = `  
      attribute vec2 a_position;
      attribute vec3 a_color;
      varying vec3 v_color;

      void main(){
       v_color = a_color;
       gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `

    const fragMentShader = `
      precision highp float;
      varying vec3 v_color;
      void main(){
        gl_FragColor = vec4(v_color, 1.0);
      }
    `
  const program = initShaders({ gl: webgl, fragmentSource: fragMentShader, vertexSource: vertexShader }) as WebGLProgram

  webgl?.clearColor(0.0, 0.0, 0.0, 1.0)
  webgl?.clear(webgl.COLOR_BUFFER_BIT)

  const vertexts = new Float32Array([
    -0.5, 0.0, 1.0, 0.0, 0.0,
    0.5, 0.0, 0.0, 1.0, 0.0,
    0.0, 0.5, 0.0, 0.0, 1.0,
  ])

  const buffer = webgl.createBuffer()
  webgl.bindBuffer(webgl.ARRAY_BUFFER, buffer)
  webgl.bufferData(webgl.ARRAY_BUFFER, vertexts, webgl.STATIC_DRAW)

  //console.log('buffer', buffer)
  console.log(vertexts.BYTES_PER_ELEMENT)


  const a_position = webgl.getAttribLocation(program, 'a_position')
  webgl.vertexAttribPointer(a_position, 2, webgl.FLOAT, false, 5 * vertexts.BYTES_PER_ELEMENT, 0)
  webgl.enableVertexAttribArray(a_position)

  const a_color = webgl.getAttribLocation(program, 'a_color')
  webgl.vertexAttribPointer(a_color, 3, webgl.FLOAT, false, 5 * vertexts.BYTES_PER_ELEMENT, 2 * vertexts.BYTES_PER_ELEMENT)
  webgl.enableVertexAttribArray(a_color)

  webgl.drawArrays(webgl.TRIANGLES, 0, 3)
}