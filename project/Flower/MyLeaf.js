import { CGFobject } from '../../lib/CGF.js';

export class MyLeaf extends CGFobject {
    constructor(scene, xScale, yScale, zScale, stemHeight) {
        super(scene);
        this.xScale = xScale;
        this.yScale = yScale;
        this.zScale = zScale;
        this.stemHeight = stemHeight;
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
        this.scene.pushMatrix();
        this.scene.scale(this.xScale, this.yScale, this.zScale);
        this.scene.translate(-0.5, 0, -0.8);
        this.scene.rotate(Math.PI/2, 1, 0, 0); 
        
        super.display(); // Triangle 1
        // The transformations are still in place for Triangle 2
        this.scene.rotate(120 * Math.PI / 180, 1, 0, 0); // Apply rotation to second triangle
        super.display(); // Triangle 2

        this.scene.popMatrix();
    }
}