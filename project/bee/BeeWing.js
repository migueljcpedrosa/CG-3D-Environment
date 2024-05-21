import { CGFobject } from "../../lib/CGF.js";

/**
 * BeeWing
 * @constructor
 * @param scene - Reference to MyScene object
 * @param left - Boolean to determine if the wing is the left or right wing
 * @param wingMaterial - Material to apply to the wing
 *
 * Represents a bee wing object.
 * This class initializes the wing with a specified material.
 * The wing can be animated to simulate flapping.
 */

export class BeeWing extends CGFobject {
    constructor(scene, left, wingMaterial) {
        super(scene);
        this.left = left;
        this.wingMaterial = wingMaterial;
        this.time = 0;  // time to manage animation
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [
            0, 0, 0, // 0
            0.6, 0, 2, // 1
            -0.6, 0, 2, // 2
            0, 0.3, 3, // 3
            0.7, 0, 2.5, // 4
            -0.7, 0, 2.5, // 5
            0.5, 0, 4, // 6
            -0.5, 0, 4, // 7
            0, 0, 4.5 // 8
        ];
    
        this.indices = [
            3, 1, 0,
            0, 1, 3,
            0, 2, 3,
            3, 2, 0,
            2, 3, 5,
            5, 3, 2,
            1, 3, 4,
            4, 3, 1,
            5, 3, 7,
            7, 3, 5,
            4, 3, 6,
            6, 3, 4,
            6, 3, 8,
            8, 3, 6,
            7, 3, 8,
            8, 3, 7,
        ];
    
        // Texture coordinates
        this.texCoords = [
            0.5, 0.5, // 0
            1, 0, // 1
            0, 0, // 2
            0.5, 1, // 3
            1, 0.5, // 4
            0, 0.5, // 5
            1, 1, // 6
            0, 1, // 7
            0.5, 1.5  // 8
        ];
    
        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers(); // Initialize WebGL buffers including texture coordinates
    }
    
    update(deltaTime) {
        this.time += deltaTime; 
        this.wingAngle = Math.sin(this.time * 10) * Math.PI / 8; // for wing flapping effect
    }
    

    display(){
        this.wingMaterial.apply();
        this.scene.pushMatrix();
        this.scene.translate(0, 0, 0); // ttranslate to the rotation point if necessary
        this.scene.rotate(this.left ? this.wingAngle : -this.wingAngle, 0, 0, 1);
        this.scene.rotate(this.left ? Math.PI/2 : -Math.PI/2, 0, 1, 0);
        super.display();
        this.scene.popMatrix();
    }
}
