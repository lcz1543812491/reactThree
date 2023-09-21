precision mediump float;

varying vec2 vUv;
uniform vec3 color;
uniform float time;


void main()
{

    vec2 center = vec2(0.5, 0.5);
   
    vec2 pos = mod(vUv * 8.0, 1.0);

    float d = distance(pos, center);


    float mask = step(0.2 + sin(time + vUv.x * 0.5), d);

    vec3 mixColor = mix(color, vec3(1.0), mask);

    // mask = 1.0 - mask;

    gl_FragColor = vec4(vec3(mixColor), 1.0);

    // gl_FragColor = vec4(vec3(vUv.x + sin(time), vUv.y, vUv.y + cos(time)) * color , 1.0);
}