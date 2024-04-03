import { CGFobject } from '../lib/CGF.js';
/**
 * MyReceptacle
 * @constructor
 * @param scene - Reference to MyScene object
 */

export class MyReceptacle extends CGFobject {
    constructor(scene, slices, stacks) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.initBuffers();
    }

    initBuffers() {
        // Initialize arrays
        this.vertices = [];
        this.indices = [];
        this.normals = [];

        // Angle between each slice
        let incrementAngle = 2 * Math.PI / this.slices;
        // Increment along the cylinder's height
        let incrementStacks = 1 / this.stacks;

        // Loop through each stack
        for (let stackIterator = 0; stackIterator <= this.stacks; stackIterator++) {
            // Loop through each slice
            for (let sliceIterator = 0; sliceIterator < this.slices; sliceIterator++) {
                // Calculate the x and y coordinates for the vertex on the circle
                let x = Math.cos(sliceIterator * incrementAngle);
                let y = Math.sin(sliceIterator * incrementAngle);

                // Add the vertex at the current stack level
                this.vertices.push(x, y, stackIterator * incrementStacks);
                // Normal is the same as the vertex position on the circle, but normalized (z is 0 because it's along the cylinder's surface)
                this.normals.push(x, y, 0);
            }
        }

        // Creating two triangles for each face of the cylinder
        for (let stackIterator = 0; stackIterator < this.stacks; stackIterator++) {
            for (let sliceIterator = 0; sliceIterator < this.slices; sliceIterator++) {
                // Current and next slice vertices indices
                let current = stackIterator * this.slices + sliceIterator;
                let next = stackIterator * this.slices + ((sliceIterator + 1) % this.slices);

                // Indices for the quad's two triangles
                this.indices.push(current, next, current + this.slices);
                this.indices.push(next, next + this.slices, current + this.slices);
            }
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
} 

