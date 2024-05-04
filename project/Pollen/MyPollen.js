import { MySphere } from '../shapes/MySphere.js'; 

/**
 * Represents a pollen grain as a scaled sphere object in WebGL using the given framework.
 * @constructor
 * @param {Object} scene - Reference to MyScene object where the pollen will be drawn.
 * @param {number} slices - The number of subdivisions around the Z axis.
 * @param {number} stacks - The number of subdivisions from the top of the sphere to the bottom.
 * @param {number} scale - Uniform scaling factor applied to the sphere.
 * @param {boolean} reversed - If true, the sphere is viewed from inside, otherwise from outside.
 */
export class MyPollen extends MySphere {
    constructor(scene, slices, stacks, scale, reversed = true) {
        super(scene, slices, stacks, reversed);
        this.scale = scale; // Scale factor for the sphere
        this.initScaledBuffers(); // Initialize the scaled buffers for the sphere's geometry
    }

    initScaledBuffers() {
        // Apply scaling to the vertices calculated by the parent class's initBuffers method
        for (let i = 0; i < this.vertices.length; i += 3) {
            //this.vertices[i] *= this.scale;   // Scale x coordinate
            this.vertices[i+1] *= this.scale; // Scale y coordinate
            //this.vertices[i+2] *= this.scale; // Scale z coordinate
        }

        // Update WebGL buffers with the new scaled vertices
        this.initGLBuffers();
    }
}
