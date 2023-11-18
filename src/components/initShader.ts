interface InitShadersProps {
  gl: WebGLRenderingContext
  vertexSource: string
  fragmentSource: string
}

interface CreateShaderProps {
  gl: WebGLRenderingContext
  type: number
  source: string
}

interface CreateProgramProps {
  gl: WebGLRenderingContext
  vertexShader: WebGLShader
  fragmentShader: WebGLShader
}

export function initShaders(props: InitShadersProps) {
  const { gl, vertexSource, fragmentSource } = props

  const vertexShader = createShader({ gl, type: gl.VERTEX_SHADER, source: vertexSource })
  const fragmentShader = createShader({ gl, type: gl.FRAGMENT_SHADER, source: fragmentSource })

  const program = createProgram({ gl, vertexShader: vertexShader as WebGLShader, fragmentShader: fragmentShader as WebGLShader })

  if (program) {
    gl.useProgram(program)
    // 为了获得program的作用域，所以把他挂在gl对象上，作为一个属性
    // gl.program = program
    return program
  } else {
    console.log('Failed to create program.')
    return null
  }
}

/**
 * Create Shades
 */
function createShader(props: CreateShaderProps) {
  const { gl, type, source } = props

  const shader = gl.createShader(type)
  gl.shaderSource(shader as WebGLShader, source)

  gl.compileShader(shader as WebGLShader)

  // complie shader result
  let compiled = gl.getShaderParameter(shader as WebGLShader, gl.COMPILE_STATUS)
  if (compiled) {
    return shader
  } else {
    let error = gl.getShaderInfoLog(shader as WebGLShader)
    console.log('compile shaders error: ' + error)
    gl.deleteShader(shader)
    return null
  }
}

/**
 * Create Program
 */
function createProgram(props: CreateProgramProps) {
  const { gl, vertexShader, fragmentShader } = props

  const program = gl.createProgram()
  if (!program) return null

  gl.attachShader(program, vertexShader)
  gl.attachShader(program, fragmentShader)

  gl.linkProgram(program)
  // link prgram result
  let linked = gl.getProgramParameter(program, gl.LINK_STATUS)
  if (linked) {
    return program
  } else {
    let error = gl.getProgramInfoLog(program)
    console.log('link program error: ' + error)
    gl.deleteProgram(program)
    gl.deleteShader(vertexShader)
    gl.deleteShader(fragmentShader)
    return null
  }
}
