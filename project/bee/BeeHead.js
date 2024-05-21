import { CGFobject } from "../../lib/CGF.js";

/**
 * BeeHead
 * @constructor
 * @param scene - Reference to MyScene object
 * @param slices - Number of slices around the head
 * @param stacks - Number of stacks around the head
 * @param material - Material to apply to the head
 * Represents a bee head object.
 * This class initializes the head with a specified number of slices and stacks.
 * The appearance of the head including texture can be set using a material.
 */

export class BeeHead extends CGFobject{
    constructor(scene, slices, stacks, material) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.material = material;
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        for (let stack = 0; stack <= this.stacks; stack++) {
            let theta = stack * Math.PI / this.stacks;
            let sinTheta = Math.sin(theta);
            let cosTheta = Math.cos(theta);

            for (let slice = 0; slice <= this.slices; slice++) {
                let phi = slice * 2 * Math.PI / this.slices;
                let sinPhi = Math.sin(phi);
                let cosPhi = Math.cos(phi);

                let x = cosPhi * sinTheta;
                let y = cosTheta;
                let z = sinPhi * sinTheta;

                let u = slice / this.slices;
                let v = stack / this.stacks;

                // Apply distortion only to the upper half of the stacks
                if (stack > this.stacks / 2) {
                    y *= 1.5; // Adjust this value for the desired distortion
                }
                this.normals.push(x, y, z);
                this.texCoords.push(u, v);
                this.vertices.push(x, y, z);
                
            }
        }

        for (let stack = 0; stack < this.stacks; stack++) {
            for (let slice = 0; slice < this.slices; slice++) {
                let first = (stack * (this.slices + 1)) + slice;
                let second = first + this.slices + 1;

                this.indices.push(first, second, first + 1);
                this.indices.push(second, second + 1, first + 1);
                
            }
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

    display(){
        this.scene.gl.disable(this.scene.gl.CULL_FACE);
        this.scene.pushMatrix();
        this.material.apply();
        this.scene.rotate(-Math.PI / 4, 1, 1, 0);
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        super.display();
        this.scene.popMatrix();
        this.scene.gl.enable(this.scene.gl.CULL_FACE);
    }
}

