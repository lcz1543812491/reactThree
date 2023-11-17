import { mat4 } from 'gl-matrix'

interface InintGlPractise {
  canvasRef: HTMLCanvasElement
}

export function inintGlPractise(props: InintGlPractise) {
  const { canvasRef } = props

  // console.log('canvasRef', canvasRef)

  const canvasRefDom = document.getElementById('galaxy')
  const webgl = (canvasRefDom as HTMLCanvasElement).getContext('webgl')

  // webgl?.viewport(0, 0, window.innerWidth, window.innerHeight)
  // webgl?.viewport(0, 0, canvasRefDom?.clientWidth || 0, canvasRefDom?.clientHeight || 0);
  console.log('@@@', webgl)
  console.log('mat4', mat4)
//   const projectMatrix = mat4.create()
//   mat4.ortho(projectMatrix, 0, window.innerWidth, window.innerHeight, 0, -1, 1)

  const vertShader = `
  attribute vec4 a_position;
  uniform     mat4    proj;
  void main(){
      gl_Position = vec4(0.0, 0.0, 0.0, 1.0);
      gl_PointSize = 40.0;
  }
  `;

  const fragShader = `void main(){
    gl_FragColor = vec4(0.0, 0.0, 1.0, 1.0);
  }`

  const vertShader1 = webgl?.createShader(webgl.VERTEX_SHADER) || ''
  const fragShader1 = webgl?.createShader(webgl.FRAGMENT_SHADER) || ''

  webgl?.shaderSource(vertShader1, vertShader)
  webgl?.shaderSource(fragShader1, fragShader)

  webgl?.compileShader(vertShader1)
  webgl?.compileShader(fragShader1)

  const program = webgl?.createProgram()

  webgl?.attachShader(program as WebGLProgram, vertShader1)
  webgl?.attachShader(program as WebGLProgram, fragShader1)

  webgl?.linkProgram(program as WebGLProgram)
  webgl?.useProgram(program as WebGLProgram)

//   const positions = new Float32Array([0.3, 0.5, 0.1, 1.0, 0.0, 1.0])

//   const aPosition = webgl?.getAttribLocation(program as WebGLProgram, 'a_position') || 0

//   webgl?.vertexAttrib4fv(aPosition, positions)


//   const proj1 = webgl?.getUniformLocation(program as WebGLProgram, 'proj')

//   webgl?.uniformMatrix4fv(proj1 as  WebGLUniformLocation, false, projectMatrix)



  webgl?.clearColor(0.0, 0.0, 0.0, 1.0)
  webgl?.clear(webgl.COLOR_BUFFER_BIT)
  webgl?.drawArrays(webgl.POINTS, 0, 1)
}
