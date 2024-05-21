import { CGFobject } from '../../lib/CGF.js';

/**
 * GrassBlade
 * @constructor
 * @param scene - Reference to MyScene object
 * @param maxHeight - Maximum height of the grass blade
 * @param maxWidth - Maximum width of the grass blade
 * @param subdivisions - Number of subdivisions for the grass blade
 * @param grassMaterial - Material to apply to the grass blade
 * 
 * Represents a single blade of grass with some randomness in shape and a triangular taper towards the tip.
 */
export class GrassBlade extends CGFobject {
    constructor(scene, maxHeight, maxWidth, subdivisions, grassMaterial) {
        super(scene);
        // randomized parameters for each grass blade
        this.height = Math.random() * (maxHeight - 0.4) + 0.4; // random height between 0.4 and maxHeight
        this.baseWidth = Math.random() * (maxWidth - 0.02) + 0.02; // random base width between 0.02 and maxWidth
        this.tipWidth = 0.01; // fixed width at the tip (converges to a point)
        this.angle = Math.random() * Math.PI * 2; // random initial angle for wind effect
        this.subdivisions = subdivisions; // number of segments for smoother curvature
        this.grassMaterial = grassMaterial;

        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        // compute vertices, normals, and texture coordinates with subdivisions
        const step = this.height / this.subdivisions;
        let index = 0;

        for (let i = 0; i <= this.subdivisions; i++) {
            const y = i * step;
            // narrow the width towards the tip
            const width = this.baseWidth - (this.baseWidth - this.tipWidth) * (i / this.subdivisions);

            const xOffset = Math.sin((i / this.subdivisions) * Math.PI) * 0.1 * this.baseWidth; // curvature effect

            // 2 vertices per subdivision level (left and right)
            this.vertices.push(-width / 2 + xOffset, y, 0);
            this.vertices.push(width / 2 + xOffset, y, 0);

            // normals pointing in the positive z-direction
            this.normals.push(0, 0, 1, 0, 0, 1);

            // texture coordinates
            const t = i / this.subdivisions;
            this.texCoords.push(0, t, 1, t);

            // indices for each subdivision level
            if (i < this.subdivisions) {
                this.indices.push(index, index + 1, index + 2);
                this.indices.push(index + 1, index + 3, index + 2);
                index += 2;
            }
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

    display() {
        this.grassMaterial.apply();
        this.scene.pushMatrix();
        this.scene.rotate(this.angle, 0, 1, 0); // rotate each blade for the wind effect
        super.display(); 
        this.scene.popMatrix();
    }

    setAngle(angle) {
        this.angle = angle;
    }
}
