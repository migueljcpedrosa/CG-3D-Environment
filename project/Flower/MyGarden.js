import { CGFappearance, CGFobject } from '../../lib/CGF.js';
import { MyFlower } from './MyFlower.js';
/**
 * MyGarden
 * @constructor
 * @param scene - Reference to MyScene object
 * @param numRows - The number of rows of flowers in the garden
 * @param numCols - The number of columns of flowers in the garden
 * 
 * This class represents a garden with a grid of flowers. It generates a specified number 
 * of flowers arranged in rows and columns, each flower being an instance of MyFlower with 
 * randomly generated attributes for variety. The garden handles the positioning and 
 * rendering of each flower, placing them at regular intervals and applying a random 
 * rotation to each for a more natural look.
 */
export class MyGarden extends CGFobject {
    constructor(scene, numRows, numCols, petalMaterial1, petalMaterial2, stemMaterial, receptacleMaterial, leafMaterial) {
        super(scene);
        this.numRows = numRows;
        this.numCols = numCols;
        this.petalMaterial1 = petalMaterial1;
        this.petalMaterial2 = petalMaterial2;
        this.stemMaterial = stemMaterial;
        this.receptacleMaterial = receptacleMaterial;
        this.leafMaterial = leafMaterial;

        // Initialize arrays for random values and flowers
        this.initRandomValuesAndFlowers();
    }

    // Generate flower anywhere within their matrix square
    initRandomValuesAndFlowers() {
        this.flowers = [];
        this.rotationAngles = [];
        this.randomDivisors = [];

        for (let row = 0; row < this.numRows; row++) {
            this.flowers[row] = [];
            this.rotationAngles[row] = [];
            for (let col = 0; col < this.numCols; col++) {
                this.randomDivisors.push(Math.random() * (2 - 1) + 1);

                let flowerRadiusTemp = Math.random() * (3.5 - 1.5) + 1.5;
                let chosenPetalMaterial = Math.random() < 0.5 ? this.petalMaterial1 : this.petalMaterial2;
                this.flowers[row][col] = new MyFlower(
                    this.scene,
                    flowerRadiusTemp,
                    Math.floor(Math.random() * (5 - 3)) + 3,
                    [Math.random(), Math.random(), Math.random(), 1],
                    0.4 * flowerRadiusTemp,
                    [Math.random(), Math.random(), Math.random(), 1],
                    Math.random() * (0.4 - 0.2) + 0.2,
                    Math.random() * (10 - 8) + 8,
                    [0, 1, 0, 1],
                    [0, 1, 0, 1],
                    100,
                    150,
                    Math.floor(Math.random() * (6 - 4)) + 4,
                    6,
                    1,
                    chosenPetalMaterial,
                    this.stemMaterial,
                    this.receptacleMaterial,
                    this.leafMaterial
                );
                this.rotationAngles[row][col] = Math.random() * 2 * Math.PI;
            }
        }
    }

    // Update the number of rows and columns in the garden
    updateGarden(newNumRows, newNumCols) {
        this.numRows = newNumRows;
        this.numCols = newNumCols;
        // Regenerate random values and flowers
        this.initRandomValuesAndFlowers();
    }

    // Display the garden
    display() {
        this.scene.pushMatrix(); // Save the current state of the matrix
        this.scene.translate(-185, -100, -185); // Center the garden
        const baseSpacing = 70;
        const baseSize = 5;
        const spacing = baseSpacing * (baseSize / Math.max(this.numRows, this.numCols));

        // Loop through each flower in the garden
        for (let row = 0; row < this.numRows; row++) {
            for (let col = 0; col < this.numCols; col++) {
                this.scene.pushMatrix();
                let xPosition = col * spacing + spacing / this.randomDivisors[row * this.numCols + col]; // Random offset within each flower's matrix square limits
                let zPosition = row * spacing + spacing / this.randomDivisors[row * this.numCols + col]; // Random offset within each flower's matrix square limits
                this.scene.translate(xPosition, 0, zPosition);
                this.scene.rotate(this.rotationAngles[row][col], 0, 1, 0);
                this.flowers[row][col].display();
                this.scene.popMatrix();
            }
        }
        this.scene.popMatrix();
    }
}
