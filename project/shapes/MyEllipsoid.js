import { CGFobject } from "../../lib/CGF.js";
/**
 * MyEllipsoid
 * @constructor
 * @param scene - Reference to MyScene object
 * @param slices - Number of slices around the ellipsoid
 * @param stacks - Number of stacks around the ellipsoid
 * @param radiusX - Radius of the ellipsoid on the X axis
 * @param radiusY - Radius of the ellipsoid on the Y axis
 * @param radiusZ - Radius of the ellipsoid on the Z axis
 * Represents an ellipsoid object.
 * This class initializes the ellipsoid with the specified parameters.
 * The ellipsoid is created by generating vertices, normals and indices for the ellipsoid.
 */
export class MyEllipsoid extends CGFobject {
    constructor(scene, slices, stacks, radiusX, radiusY, radiusZ) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.radiusX = radiusX;
        this.radiusY = radiusY;
        this.radiusZ = radiusZ;
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        for (let stack = 0; stack <= this.stacks; stack++) {
            let theta = stack + Math.PI / this.stacks;
            let sinTheta = Math.sin(theta);
            let cosTheta = Math.cos(theta);

            for(let slice = 0; slice <= this.slices; slice++) {
                let phi = slice * 2 * Math.PI /this.slices;
                let sinPhi = Math.sin(phi);
                let cosPhi = Math.cos(phi);

                let x = cosPhi * sinTheta;
                let y = cosTheta;
                let z = sinPhi * sinTheta;

                x *= this.radiusX;
                y *= this.radiusY;
                z *= this.radiusZ;

                let nx = x/this.radiusX;
                let ny = y/this.radiusY;
                let nz = z/this.radiusZ;
                let length = Math.sqrt(nx*nx + ny*ny + nz*nz);
                nx /= length;
                ny /= length;
                nz /= length;

                let u = 1 - (slice / this.slices);
                let v = 1 - (stack / this.stacks);

                this.normals.push(nx, ny, nz);
                this.texCoords.push(u, v);
                this.vertices.push(x, y, z);
            }
        }
        for(let stack = 0; stack < this.stacks; stack++) {
            for(let slice = 0; slice < this.slices; slice++) {
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