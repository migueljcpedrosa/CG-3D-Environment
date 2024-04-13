import { CGFobject } from '../../lib/CGF.js';
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
    constructor(scene, numRows, numCols) {
        super(scene);
        this.numRows = numRows;
        this.numCols = numCols;
        this.flowers = []; // Initialize the 2D array
        this.rotationAngles = []; // 2D array for rotation angles

        for (let row = 0; row < numRows; row++) {
            this.flowers[row] = []; // Initialize each row
            this.rotationAngles[row] = []; // Initialize row for angles
            for (let col = 0; col < numCols; col++) {
                // Create a new MyFlower instance with random parameters for each position
                this.flowers[row][col] = new MyFlower(
                    scene,
                    Math.floor(Math.random() * (10 - 3 + 1)) + 3, // flowerDiameter: Random between 3 and 10
                    Math.floor(Math.random() * (7 - 4 + 1)) + 4, // Assuming some parameters are constant, adjust as needed
                    [Math.random(), Math.random(), Math.random(), 1], // Random petalColor
                    Math.random() * (2 - 1) + 1, // heartRadius: Random between 1 and 3
                    [Math.random(), Math.random(), Math.random(), 1], // Random heartColor
                    Math.random() * (0.7 - 0.4) + 0.4, // stemRadius: Constant in this example
                    Math.random() * (5 - 3) + 3, // stemHeight: Random between 3 and 5
                    [0, 1, 0, 1], // stemColor
                    [0, 1, 0, 1], // leafColor
                    100, // minPetalAngle: Constant in this example
                    150, // maxPetalAngle: Constant in this example
                    Math.floor(Math.random() * (7 - 2 + 1)) + 2, // numStemSegments: Random between 2 and 7
                    30, // slices: Constant in this example
                    30 // stacks: Constant in this example
                );
                this.rotationAngles[row][col] = Math.random() * 2 * Math.PI;
            }
        }
    }

    display() {
        this.scene.pushMatrix(); // Save the current state of the matrix
        this.scene.translate(-150, -100, -150); // Translate to the center of the garden
        const spacing = 70; // Define the spacing between the flowers

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
}
