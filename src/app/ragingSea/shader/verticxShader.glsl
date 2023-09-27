
uniform vec2 frequency;
uniform float aTime;

varying vec2 vuv;

uniform float waveProps;

void main()
{

  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  modelPosition.y += sin(modelPosition.x) * waveProps;
 
  vec4 viewPosition = viewMatrix * modelPosition;

  vec4 projectionPosition = projectionMatrix * viewPosition;

  gl_Position =  projectionPosition;

  vuv = uv;
}