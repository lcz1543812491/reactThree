#define PI 3.1415926535897932384626433832795

precision mediump float;

uniform sampler2D texture;

varying vec2  vuv;



void main()
{
    gl_FragColor = vec4(vec3(0.5, 0.8, 1.0), 1.0);
}