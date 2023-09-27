#define PI 3.1415926535897932384626433832795

precision mediump float;

uniform sampler2D texture;

varying vec2  vuv;

uniform vec3 deepColor;
uniform vec3 surfaceColor;



void main()
{
    gl_FragColor = vec4(deepColor, 1.0);
}