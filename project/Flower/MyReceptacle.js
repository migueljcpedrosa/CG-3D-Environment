import { CGFobject } from '../../lib/CGF.js';
/**
 * MyReceptacle
 * @constructor
 * @param scene - Reference to MyScene object
 * @param radius - Radius of the spherical receptacle
 * @param slices - Number of slices around the z-axis (similar to lines of longitude)
 * @param stacks - Number of stacks along the z-axis from the bottom to the top of the sphere (similar to lines of latitude)
 * 
 * Creates a spherical object meant to represent the receptacle of a flower, where the petals 
 * and other parts are attached. This geometry is created with specified radius, slices, and stacks 
 * to control the level of detail of the sphere. Texture coordinates are calculated to map a 2D 
 * texture onto the 3D surface. The normals are calculated for each vertex to ensure proper lighting 
 * effects across the curved surface.
 */
export class MyReceptacle extends CGFobject {
    constructor(scene, radius, slices, stacks) {
        super(scene);
        this.radius = radius;
        this.slices = slices;
        this.stacks = stacks;
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        for (let stack = 0; stack <= this.stacks; stack++) {
            let phi = stack * Math.PI / this.stacks;
            let sinPhi = Math.sin(phi);
            let cosPhi = Math.cos(phi);

            for (let slice = 0; slice <= this.slices; slice++) {
                let theta = slice * 2 * Math.PI / this.slices;
                let sinTheta = Math.sin(theta);
                let cosTheta = Math.cos(theta);

                let x = this.radius * cosTheta * sinPhi;
                let y = this.radius * cosPhi;
                let z = this.radius * sinTheta * sinPhi;
                let u = 1 - (slice / this.slices);
                let v = 1 - (stack / this.stacks);

                this.vertices.push(x, y, z);
                this.normals.push(x, y, z);
                this.texCoords.push(u, v);
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
}
