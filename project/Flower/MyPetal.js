import { CGFappearance, CGFobject } from '../../lib/CGF.js';

export class MyPetal extends CGFobject {
    constructor(scene, angle) {
        super(scene);
        this.angle = angle; // Angle in degrees
        this.initBuffers();
        this.initMaterial();
    }

    initMaterial()  {
        this.petalAppearance = new CGFappearance(this.scene);
        this.petalAppearance.setAmbient(0.1, 0.1, 0.1, 1);
        this.petalAppearance.setDiffuse(0.9, 0.9, 0.9, 1);
        this.petalAppearance.setSpecular(0.1, 0.1, 0.1, 1);
        this.petalAppearance.setShininess(10.0);
        this.petalAppearance.loadTexture('images/pinkpetal.jpg');
        this.petalAppearance.setTextureWrap('REPEAT', 'REPEAT');
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

        this.texCoords = [
            // Triangle 1
            0, 1, // vertex 0
            1, 1, // vertex 1
            0.5, 0, // vertex 2
            
            // Triangle 2
            0, 1, // vertex 3
            1, 1, // vertex 4
            0.5, 0, // vertex 5
        ];

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

    display() {
        this.petalAppearance.apply();
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/4, 1, 0, 0); 

        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/4, 1, 0, 0); 
        this.scene.translate(-0.5, -1, 0);
        super.display(); // Triangle 1
        // The transformations are still in place for Triangle 2
        this.scene.rotate(this.angle * Math.PI / 180, 1, 0, 0); // Apply rotation to second triangle
        super.display(); // Triangle 2

        this.scene.popMatrix();

        this.scene.popMatrix();
    }
}