attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;     
uniform mat4 uPMatrix;     
uniform mat4 uNMatrix;     
uniform float timeFactor;  
uniform sampler2D waterMap; 

varying vec2 vTextureCoord;

void main() {
    vTextureCoord = aTextureCoord;

    float displacement = texture2D(waterMap, aTextureCoord + vec2(0.1 * timeFactor)).b;
    vec3 offset = aVertexNormal * 0.1 * displacement;

    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition + offset, 1.0);
}
