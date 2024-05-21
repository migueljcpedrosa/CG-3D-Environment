import { CGFappearance, CGFobject } from '../../lib/CGF.js';

/**
 * BeeStinger
 * @constructor
 * @param scene - Reference to MyScene object
 * @param height - Height of the cone
 * @param baseRadius - Radius of the cone's base
 * @param slices - Number of slices around the cone
 *
 * Represents a cone object resembles the stinger of a bee.
 * This class initializes the cone with a specified height, base radius, and number of slices.
 * The appearance of the cone including texture can be set using a material.
 */
export class BeeStinger extends CGFobject {
    constructor(scene, height, baseRadius, slices, material) {
        super(scene);
        this.height = height;
        this.baseRadius = baseRadius;
        this.slices = slices;
        this.material = material;
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        // Base center vertex
        this.vertices.push(0, 0, 0);
        this.normals.push(0, -1, 0);
        this.texCoords.push(0.5, 0.5);

        for (let i = 0; i <= this.slices; i++) {
            let angle = i * 2 * Math.PI / this.slices;
            let x = Math.cos(angle);
            let y = Math.sin(angle);

            // Base perimeter vertices
            this.vertices.push(x * this.baseRadius, y * this.baseRadius, 0);
            this.normals.push(0, -1, 0);
            this.texCoords.push(x * 0.5 + 0.5, y * 0.5 + 0.5);
        }

        // Cone tip vertex
        this.vertices.push(0, 0, this.height);
        this.normals.push(0, 0, 1);
        this.texCoords.push(0.5, 0);

        for (let i = 0; i < this.slices; i++) {
            // Indices for the base
            this.indices.push(0, i + 1, (i + 1) % this.slices + 1);
            // Indices for the sides
            this.indices.push(i + 1, (i + 1) % this.slices + 1, this.slices + 2);
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

    display() {
        if (this.material) {
            this.material.apply();
        }
        super.display();
    }
}
