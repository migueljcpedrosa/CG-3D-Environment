#ifdef GL_ES
precision highp float;
#endif

attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;      // Model-View matrix
uniform mat4 uPMatrix;       // Projection matrix
uniform mat4 uNMatrix;       // Normal matrix
uniform float timeFactor;    // Time factor to animate the grass
uniform float windStrength;  // Adjust amplitude of waving
uniform float randomness;    // Introduce some randomness for each blade

varying vec2 vTextureCoord;

void main() {
    // Calculate the waving angle using a sine function, adding some randomness per blade
    float waveAngle = sin(aVertexPosition.y * randomness + timeFactor) * windStrength;

    // Apply the waving to the x-coordinate to simulate bending
    vec3 offset = vec3(waveAngle, 0.0, 0.0);

    // Calculate final vertex position
    vec3 displacedPosition = aVertexPosition + offset;

    // Set the texture coordinates for the fragment shader
    vTextureCoord = aTextureCoord;

    // Apply the model-view and projection matrices
    gl_Position = uPMatrix * uMVMatrix * vec4(displacedPosition, 1.0);
}
