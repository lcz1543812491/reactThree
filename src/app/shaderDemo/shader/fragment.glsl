precision mediump float;

varying vec2 vUv;
uniform vec3 color;
uniform float time;


void main()
{
    vec2 q = vUv;
    q.x *= 2.0;

    vec2 center = vec2(0.5, 0.5);
   
    vec2 pos = mod(q * 8.0, 1.0);

    float d = distance(pos, center);


    float mask = step(0.25 + sin(time + vUv.x * 2.0) * 0.25, d);
    // float mask = step(0.25 + noise(vec3(q.xy, time)), d);
    mask = 1.0 - mask;

    vec3 mixColor = mix(color, vec3(1.0), mask);

    

    gl_FragColor = vec4(vec3(mixColor), 1.0);

    // gl_FragColor = vec4(vec3(vUv.x + sin(time), vUv.y, vUv.y + cos(time)) * color , 1.0);
}