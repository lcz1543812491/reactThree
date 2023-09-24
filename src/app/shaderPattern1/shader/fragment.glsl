precision mediump float;

uniform sampler2D texture;

varying vec2  vuv;

float random(vec2 st)
{
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

void main()
{
    // gl_FragColor = vec4(vuv, 1.0, 1.0);
    // gl_FragColor = vec4(vuv.x, vuv.x, vuv.x, 1.0);
    // gl_FragColor = vec4(vec3(vuv.y), 1.0);
    // gl_FragColor = vec4(vec3(1.0 - vuv.y), 1.0);
    // gl_FragColor = vec4(vec3(vuv.y * 10.0), 1.0);

    // float strength = mod(vuv.y * 10.0, 1.0);

    // strength = step(0.5, strength);

    // float strength = mod(vuv.x * 10.0, 1.0);

    // strength = step(0.5, strength);

    // float strength = step(0.8, mod(vuv.x * 10.0, 1.0));
    // strength += step(0.8, mod(vuv.y * 10.0, 1.0));


    // float strength = step(0.2, mod(vuv.x * 10.0, 1.0));
    // strength += step(0.2, mod(vuv.y * 10.0, 1.0));
    // strength =  1.0 - strength;

    // float strength = step(0.2, mod(vuv.x * 10.0, 1.0));
    // strength *= step(0.8, mod(vuv.y * 10.0, 1.0));


    // float barX = step(0.2, mod(vuv.x * 10.0, 1.0));
    // barX *= step(0.8, mod(vuv.y * 10.0, 1.0));

    // float barY = step(0.8, mod(vuv.x * 10.0, 1.0));
    // barY *= step(0.2, mod(vuv.y * 10.0, 1.0));

    // float strength = barX + barY;



    // float barX = step(0.4, mod(vuv.x * 10.0, 1.0));
    // barX *= step(0.8, mod(vuv.y * 10.0 + 0.2, 1.0));

    // float barY = step(0.8, mod(vuv.x * 10.0 + 0.2, 1.0));
    // barY *= step(0.4, mod(vuv.y * 10.0, 1.0));
 
    // float strength = barX + barY;



    // float strength = abs(vuv.x - 0.5);


    // float strength = min(abs(vuv.x - 0.5), abs(vuv.y -  0.5));


    // float strength = max(abs(vuv.x - 0.5), abs(vuv.y -  0.5));

    // float strength = step(0.25, max(abs(vuv.x - 0.5), abs(vuv.y -  0.5)));



    // float strength1 = step(0.2, max(abs(vuv.x - 0.5), abs(vuv.y -  0.5)));
    // float strength2 = 1.0 - step(0.25, max(abs(vuv.x - 0.5), abs(vuv.y -  0.5)));
    
    // float strength = strength1 * strength2;


    // float strength = floor(vuv.x * 10.0) / 10.0;


    // float strength = floor(vuv.x * 10.0) / 10.0;
    // strength *= floor(vuv.y * 10.0) / 10.0;


    // float strength = random(vuv);


    // vec2 grid = vec2(floor(vuv.x * 10.0) / 10.0, floor(vuv.y * 10.0) / 10.0);

    // float strength = random(grid);



    // vec2 grid = vec2(floor(vuv.x * 10.0) / 10.0, floor((vuv.y + vuv.x * 0.4) * 10.0) / 10.0);

    // float strength = random(grid);


    // float strength = length(vuv - 0.5);

    float strength = 1.0 - distance(vuv, vec2(0.5, 0.5));

    gl_FragColor = vec4(vec3(strength), 1.0);
}