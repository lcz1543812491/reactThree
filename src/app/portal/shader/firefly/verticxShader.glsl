uniform float pixelRation;
attribute float aScale;
uniform float uTime;

void main(){
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    
    modelPosition.y += sin(modelPosition.x * 100.0 + uTime) * aScale * 0.1;

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectionPosition = projectionMatrix * viewPosition;

    gl_Position = projectionPosition;
    gl_PointSize = 80.0 * aScale * pixelRation;

    gl_PointSize *= (1.0/ -viewPosition.z);
}