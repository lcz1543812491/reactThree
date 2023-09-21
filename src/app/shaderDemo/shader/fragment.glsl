precision mediump float;

varying vec2 vUv;
uniform vec3 color;


void main()
{
    gl_FragColor = vec4(vec3(vUv.x) * color , 1.0);
}