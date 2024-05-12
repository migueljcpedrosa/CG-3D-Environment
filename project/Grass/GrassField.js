import { CGFobject } from '../../lib/CGF.js';
import { GrassBlade } from './grassBlade.js';

/**
 * GrassField
 * @constructor
 * @param scene - Reference to MyScene object
 * @param width - Width of the grass field
 * @param height - Height of the grass field
 * @param numBlades - Number of blades to populate the field
 *
 * Represents a field of grass by using multiple instances of GrassBlade. Each blade is positioned randomly within
 * the field and has varying angles to simulate randomness.
 */
export class GrassField extends CGFobject {
    constructor(scene, width, height, numBlades, grassMaterial1, grassMaterial2) {
        super(scene);
        this.width = width;
        this.height = height;
        this.numBlades = numBlades;
        this.grassMaterial1 = grassMaterial1;
        this.grassMaterial2 = grassMaterial2;
        this.blades = [];

        this.generateBlades();
    }

    generateBlades() {
        for (let i = 0; i < this.numBlades; i++) {
            // for random grass position within the width and height ranges
            //x and z represent the coordinates where each grass blade will be placed within the field
            const x = Math.random() * this.width - this.width / 2;
            const z = Math.random() * this.height - this.height / 2;

            // randomly choose a texture
            const randomMaterial = Math.random() > 0.5 ? this.grassMaterial1 : this.grassMaterial2;
            
            // constructor(scene, maxHeight = 0.8, maxWidth = 0.2, subdivisions = 4, grassMaterial)
            const blade = new GrassBlade(this.scene, 0.8, 0.2, 4, randomMaterial);
            this.blades.push({ blade, x, z });
        }
    }

    display() {
        const yOffset = -7; //  offset to lower grass blades on the y-axis

        for (const { blade, x, z } of this.blades) {
            this.scene.pushMatrix();
            this.scene.translate(x, yOffset, z); // grass position
            blade.display();
            this.scene.popMatrix();
        }
    }

}
