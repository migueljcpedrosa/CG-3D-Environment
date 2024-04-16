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
        this.flowers = []; // Initialize the 2D array
        this.rotationAngles = []; // 2D array for rotation angles
        this.petalMaterial1 = petalMaterial1;
        this.petalMaterial2 = petalMaterial2;
        this.stemMaterial = stemMaterial;
        this.receptacleMaterial = receptacleMaterial;
        this.leafMaterial = leafMaterial;

        for (let row = 0; row < numRows; row++) {
            this.flowers[row] = []; // Initialize each row
            this.rotationAngles[row] = []; // Initialize row for angles
            for (let col = 0; col < numCols; col++) {
                // Create a new MyFlower instance with random parameters for each position
                let flowerRadiusTemp = Math.random() * (3.5 - 1.5) + 1.5;
                let chosenPetalMaterial = Math.random() < 0.5 ? this.petalMaterial1 : this.petalMaterial2;
                this.flowers[row][col] = new MyFlower(
                    scene,
                    flowerRadiusTemp, // flowerDiameter: Random between 3 and 10
                    Math.floor(Math.random() * (7 - 3)) + 3, // Assuming some parameters are constant, adjust as needed
                    [Math.random(), Math.random(), Math.random(), 1], // Random petalColor
                    Math.random() * (0.35 - 0.3 * flowerRadiusTemp) + 0.3 * flowerRadiusTemp, // heartRadius: Random between 1 and half the flowerDiameter
                    [Math.random(), Math.random(), Math.random(), 1], // Random heartColor
                    Math.random() * (0.7 - 0.4) + 0.4, // stemRadius: Constant in this example
                    Math.random() * (12 - 10) + 10, // stemHeight: Random between 10 and 12
                    [0, 1, 0, 1], // stemColor
                    [0, 1, 0, 1], // leafColor
                    100, // minPetalAngle: Constant in this example
                    150, // maxPetalAngle: Constant in this example
                    Math.floor(Math.random() * (7 - 4)) + 4, // numStemSegments: Random between 4 and 7
                    30, // slices: Constant in this example
                    30, // stacks: Constant in this example
                    chosenPetalMaterial,
                    this.stemMaterial,
                    this.receptacleMaterial,
                    this.leafMaterial
                );
                this.rotationAngles[row][col] = Math.random() * 2 * Math.PI;
            }
        }
    }

    display() {
        this.scene.pushMatrix(); // Save the current state of the matrix
        this.scene.translate(-150, -100, -150); // Translate to the center of the garden
        const baseSpacing = 70; // Base spacing for 5x5 grid
        const baseSize = 5; // Base grid size for which the base spacing was determined
        const spacing = baseSpacing * (baseSize / Math.max(this.numRows, this.numCols));

        for (let row = 0; row < this.numRows; row++) {
            for (let col = 0; col < this.numCols; col++) {
                this.scene.pushMatrix(); // Save the current state of the matrix

                // Calculate the position for each flower based on its row and column
                let xPosition = col * spacing;
                let zPosition = row * spacing;

                // Translate to the correct position
                this.scene.translate(xPosition, 0, zPosition);
                
                // Rotate each flower by its stored random angle around the Y axis
                let angle = this.rotationAngles[row][col];
                this.scene.rotate(angle, 0, 1, 0);

                // Display the flower at this position
                this.flowers[row][col].display();

                this.scene.popMatrix(); // Restore the matrix state
            }
        }
        this.scene.popMatrix(); // Restore the matrix state
    }

    updateGarden(newNumRows, newNumCols) {
        this.numRows = newNumRows;
        this.numCols = newNumCols;
        this.flowers = [];
        this.rotationAngles = [];
    
        for (let row = 0; row < newNumRows; row++) {
            this.flowers[row] = [];
            this.rotationAngles[row] = [];
            for (let col = 0; col < newNumCols; col++) {
                // Similar flower creation logic as in the constructor
                let flowerRadiusTemp = Math.random() * (3.5 - 1.5) + 1.5;
                let chosenPetalMaterial = Math.random() < 0.5 ? this.petalMaterial1 : this.petalMaterial2;
                this.flowers[row][col] = new MyFlower(
                    this.scene,
                    flowerRadiusTemp,
                    Math.floor(Math.random() * (7 - 3)) + 3,
                    [Math.random(), Math.random(), Math.random(), 1],
                    Math.random() * (0.35 - 0.3* flowerRadiusTemp) + 0.3 * flowerRadiusTemp,
                    [Math.random(), Math.random(), Math.random(), 1],
                    Math.random() * (0.7 - 0.4) + 0.4,
                    Math.random() * (12 - 10) + 10,
                    [0, 1, 0, 1],
                    [0, 1, 0, 1],
                    100,
                    150,
                    Math.floor(Math.random() * (7 - 4)) + 4,
                    30,
                    30,
                    chosenPetalMaterial,
                    this.stemMaterial,
                    this.receptacleMaterial,
                    this.leafMaterial
                );
                this.rotationAngles[row][col] = Math.random() * 2 * Math.PI;
            }
        }
    }
}
