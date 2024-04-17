import { CGFobject } from '../../lib/CGF.js';

export class MyRock extends CGFobject {
    constructor(scene, slices, stacks, variation = 0.1, rockMaterial) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.variation = variation; // Reduced variation for subtler effect
        this.rockMaterial = rockMaterial;
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

                // Original vertex positions
                this.vertices.push(x, y, z);

                // Adjust normals for a rough texture
                let nx = x + Math.random() * this.variation - this.variation / 2;
                let ny = y + Math.random() * this.variation - this.variation / 2;
                let nz = z + Math.random() * this.variation - this.variation / 2;
                
                this.normals.push(nx, ny, nz);
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

    display() {
        this.rockMaterial.apply();
        super.display();
    }
}