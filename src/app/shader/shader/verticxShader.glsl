uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;

attribute vec3 position;
attribute float myRandom;
varying float vRandom;

uniform vec2 frequency;
uniform float aTime;

attribute vec2 uv;
varying vec2 vuv;

varying float velevation;

void main()
{
  
  vRandom = myRandom;

  vec4 modelPosition = modelMatrix * vec4(position, 1.0);

  // modelPosition.z += sin(myRandom * 0.1);
  float elevation = sin(modelPosition.x * frequency.x + aTime) * 0.1;
  elevation += sin(modelPosition.y * frequency.y + aTime) * 0.1;

  modelPosition.z += elevation;
 

  vec4 viewPosition = viewMatrix * modelPosition;

  vec4 projectionPosition = projectionMatrix * viewPosition;

  gl_Position =  projectionPosition;

  vuv = uv;

  velevation = elevation;
}