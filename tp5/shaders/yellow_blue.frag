#ifdef GL_ES
precision highp float;
#endif

varying vec4 coords;

void main() {
    if (coords.y > 0.5)
        gl_FragColor = vec4(1, 1, 0, 1);
    else
        gl_FragColor = vec4(0, 0, 1, 1);
}