import { CGFobject } from "../../lib/CGF.js";

export class BeeWing extends CGFobject {
    constructor(scene, left) {
        super(scene);
        this.left = left;
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [
            0, 0, 0, // 0
            .6, 0, 2, // 1
            -.6, 0, 2, // 2
            0, .3, 3, // 3
            .7, 0, 2.5, // 4
            -.7, 0, 2.5, // 5
            .5, 0, 4, // 6
            -.5, 0, 4, // 7
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

        this.primitiveType = this.scene.gl.TRIANGLES; // Define primitive type as triangles
        this.initGLBuffers(); // Initialize WebGL buffers
    }

    display(){
        this.scene.pushMatrix();
        this.scene.rotate(this.left ? Math.PI/12 : -Math.PI/12, 0, 0, 1);
        this.scene.rotate(this.left ? Math.PI/2 : -Math.PI/2, 0, 1, 0);
        super.display();
        this.scene.popMatrix();
    }
}
