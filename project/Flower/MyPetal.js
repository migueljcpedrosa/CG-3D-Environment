import { CGFappearance, CGFobject } from '../../lib/CGF.js';
/**
 * MyPetal
 * @constructor
 * @param scene - Reference to MyScene object
 * @param angle - Angle for the petal's rotation around its base, in degrees
 *
 * Represents a single petal of a flower with the ability to be rotated to a specified angle, 
 * which allows for the creation of varied flower shapes when combined with other petal instances. 
 * The petal's appearance, including its texture, is initialized in this class, and it 
 * is composed of two triangles that share a common base and are defined in 3D space. 
 * The petal material properties and texture are set in the initMaterial method, which can be 
 * customized to create different petal appearances.
 */
export class MyPetal extends CGFobject {
    constructor(scene, angle, petalMaterial) {
        super(scene);
        this.angle = angle; // Angle in degrees
        this.petalMaterial = petalMaterial;
        this.randomInsertionAngle = Math.random() * (10 - 5) + 5;
        this.randomInsertionAngleRad = this.randomInsertionAngle * Math.PI / 180;
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
        if (this.petalMaterial) {
            this.petalMaterial.apply();
        }

        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/4, 1, 0, 0); 

        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/4, 1, 0, 0); 
        this.scene.rotate (this.randomInsertionAngleRad, 1, 1, 0);
        this.scene.translate(-0.5, -0.8, 0);
        super.display(); // Triangle 1
        // The transformations are still in place for Triangle 2
        this.scene.rotate(this.angle * Math.PI / 180, 1, 0, 0); // Apply rotation to second triangle
        super.display(); // Triangle 2

        this.scene.popMatrix();

        this.scene.popMatrix();
    }
}