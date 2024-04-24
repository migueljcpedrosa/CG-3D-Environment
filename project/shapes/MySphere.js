import { CGFobject } from '../../lib/CGF.js';
/**
 * Represents a sphere object in WebGL using the given framework.
 * @constructor
 * @param {Object} scene - Reference to MyScene object where the sphere will be drawn.
 * @param {number} slices - The number of subdivisions around the Z axis (like the slices of an orange).
 * @param {number} stacks - The number of subdivisions from the top of the sphere to the bottom (like the layers of an onion).
 */
export class MySphere extends CGFobject {
    constructor(scene, slices, stacks, reversed = true) {
        super(scene); // Calls the constructor of the superclass CGFobject with the scene.
        this.slices = slices; // Number of slices (subdivisions around the Z axis).
        this.stacks = stacks; // Number of stacks (subdivisions from top to bottom).
        this.reversed = reversed; // Boolean to determine if the sphere should be seen from inside or outside.
        this.initBuffers(); // Initialize the buffers for the sphere's geometry.
    }

    initBuffers() {
        // Initialize the arrays for the sphere's vertices, indices for the vertices, normals, and texture coordinates.
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        // Loop through each stack (from bottom to top).
        for (let stack = 0; stack <= this.stacks; stack++) {
            let theta = stack * Math.PI / this.stacks; // Angle from the bottom of the sphere to the current stack.
            let sinTheta = Math.sin(theta); // Compute sin(theta) once for efficiency.
            let cosTheta = Math.cos(theta); // Compute cos(theta) once for efficiency.

            // Loop through each slice (segment around the sphere's axis).
            for (let slice = 0; slice <= this.slices; slice++) {
                let phi = slice * 2 * Math.PI / this.slices; // Angle around the Z axis for the current slice.
                let sinPhi = Math.sin(phi); // Compute sin(phi) once for efficiency.
                let cosPhi = Math.cos(phi); // Compute cos(phi) once for efficiency.

                // Calculate the x, y, z coordinates based on the angles phi and theta.
                let x = cosPhi * sinTheta;
                let y = cosTheta;
                let z = sinPhi * sinTheta;

                // Calculate the texture coordinates for the vertex.
                let u =  (slice / this.slices);
                let v =  (stack / this.stacks);

                // Push the normal, texture coordinate, and vertex to their respective arrays.
                if(this.reversed){
                    this.normals.push(-z, -y, -x);
                    this.texCoords.push(u, v);
                    this.vertices.push(z, y, x);
                }else {
                    this.normals.push(x, y, z);
                    this.texCoords.push(u, v);
                    this.vertices.push(x, y, z);
                }
            }
        }

        // Loop through each stack and slice to calculate the indices for the sphere's faces.
        for (let stack = 0; stack < this.stacks; stack++) {
            for (let slice = 0; slice < this.slices; slice++) {
                // Calculate the indices for the four vertices of the current segment's face.
                let first = (stack * (this.slices + 1)) + slice;
                let second = first + this.slices + 1;

                // Push the two triangles that form the segment of the sphere's face to the indices array.
                if(this.reversed){
                    this.indices.push(first + 1, second, first);
                    this.indices.push(first + 1, second + 1, second);
                } else {
                    this.indices.push(first, second, first + 1);
                    this.indices.push(second, second + 1, first + 1);
                }   
            }
        }

        // Set the primitive type for drawing the sphere to triangles.
        this.primitiveType = this.scene.gl.TRIANGLES;
        // Pass the data to WebGL buffers for rendering.
        this.initGLBuffers();
    }
}