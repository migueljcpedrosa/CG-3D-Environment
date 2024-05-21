#version 300 es
precision mediump float;

in vec3 position;
in vec2 texCoord;

uniform mat4 uMVPMatrix;

out vec2 vTexCoord;

void main(void) {
    gl_Position = uMVPMatrix * vec4(position, 1.0);
    vTexCoord = texCoord;
}
