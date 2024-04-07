import { CGFobject } from '../lib/CGF.js';

export class MyPetal extends CGFobject {
    constructor(scene, angle) {
        super(scene);
        this.angle = angle; // Angle in degrees
        this.initBuffers();
    }

    initBuffers() {
        // Define vertices for the two triangles
        this.vertices = [
            // Triangle 1
            0, 0, 0, // vertex 0: base
            1, 0, 0, // vertex 1: base
            0.5, 1, 0, // vertex 2: top
            
            // Triangle 2 (will be rotated)
            0, 0, 0, // vertex 3: base (same as vertex 0)
            1, 0, 0, // vertex 4: base (same as vertex 1)
            0.5, 1, 0, // vertex 5: top (same as vertex 2)
        ];

        // Indices to define the two triangles
        this.indices = [
            0, 1, 2, // Triangle 1
            3, 5, 4, // Triangle 2
        ];

        // Normals
        this.normals = [
            // Normals for Triangle 1
            0, 0, 1, // vertex 0
            0, 0, 1, // vertex 1
            0, 0, 1, // vertex 2
            
            // Normals for Triangle 2
            0, 0, -1, // vertex 3
            0, 0, -1, // vertex 4
            0, 0, -1, // vertex 5
        ];

        this.texCoords = [];

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

    display() {
        // Display Triangle 1 (no transformation needed)
        this.scene.pushMatrix();
        this.scene.translate(0, 0, 0);
        this.scene.popMatrix();
        super.display();

        // Display Triangle 2 (rotated around the base)
        this.scene.pushMatrix();
        this.scene.translate(0.5, 0, 0); // Translate to the center of the base
        this.scene.rotate(this.angle * Math.PI / 180, 1, 0, 0); // Rotate by the given angle
        this.scene.translate(-0.5, 0, 0); // Translate back
        super.display();
        this.scene.popMatrix();
    }
}