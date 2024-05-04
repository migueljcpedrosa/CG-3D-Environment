import { CGFobject } from '../../lib/CGF.js';

export class MyCube extends CGFobject {
    constructor(scene, material) {
        super(scene);
        this.initBuffers();
        this.material = material;
    }

    initBuffers() {
        // Define the vertices of a unit cube
        this.vertices = [
            // Front face
            -0.5, -0.5, 0.5,   // 0
            0.5, -0.5, 0.5,    // 1
            0.5, 0.5, 0.5,     // 2
            -0.5, 0.5, 0.5,    // 3
            // Back face
            -0.5, -0.5, -0.5,  // 4
            0.5, -0.5, -0.5,   // 5
            0.5, 0.5, -0.5,    // 6
            -0.5, 0.5, -0.5    // 7
        ];

        // Define the indices for the triangles
        this.indices = [
            // Front face
            0, 1, 2,
            2, 3, 0,
            // Back face
            4, 6, 5,
            4, 7, 6,
            // Top face
            3, 2, 6,
            3, 6, 7,
            // Bottom face
            0, 5, 1,
            0, 4, 5,
            // Right face
            1, 5, 2,
            2, 5, 6,
            // Left face
            0, 3, 7,
            0, 7, 4
        ];

        // Define the normals for each vertex
        this.normals = [
            // Front face
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            // Back face
            0, 0, -1,
            0, 0, -1,
            0, 0, -1,
            0, 0, -1,
            // Top face
            0, 1, 0,
            0, 1, 0,
            0, 1, 0,
            0, 1, 0,
            // Bottom face
            0, -1, 0,
            0, -1, 0,
            0, -1, 0,
            0, -1, 0,
            // Right face
            1, 0, 0,
            1, 0, 0,
            1, 0, 0,
            1, 0, 0,
            // Left face
            -1, 0, 0,
            -1, 0, 0,
            -1, 0, 0,
            -1, 0, 0
        ];

        // Define the texture coordinates for each vertex
        this.texCoords = [
            // Front face
            0, 1,
            1, 1,
            1, 0,
            0, 0,
            // Back face
            0, 1,
            1, 1,
            1, 0,
            0, 0,
            // Top face
            0, 0,
            1, 0,
            1, 1,
            0, 1,
            // Bottom face
            0, 1,
            1, 1,
            1, 0,
            0, 0,
            // Right face
            0, 0,
            1, 0,
            1, 1,
            0, 1,
            // Left face
            0, 0,
            1, 0,
            1, 1,
            0, 1
        ];

        // Set primitive type to triangles
        this.primitiveType = this.scene.gl.TRIANGLES;

        // Initialize buffers
        this.initGLBuffers();
    }

    display() {
        this.material.apply();
        this.scene.pushMatrix();
        this.scene.scale(2, 0.8, 0.2);
        super.display();
        this.scene.popMatrix();
    }
}
