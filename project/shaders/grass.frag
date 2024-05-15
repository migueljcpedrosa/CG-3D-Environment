#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform sampler2D uSampler;  // Grass texture sampler

void main() {
    // Fetch the grass texture color
    vec4 color = texture2D(uSampler, vTextureCoord);

    // Set the output color
    gl_FragColor = color;
}

//usar coordenada do ponto no fragment shader pra alterar a iluminacao. mais escuro na base, mais claro na ponta