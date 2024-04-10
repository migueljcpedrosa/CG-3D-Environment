import { CGFobject } from '../../lib/CGF.js';
import { MyFlower } from './MyFlower.js';

export class MyGarden extends CGFobject {
    constructor(scene, numRows, numCols) {
        super(scene);
        this.numRows = numRows;
        this.numCols = numCols;
        this.flowers = []; // Initialize the 2D array
        
        for (let row = 0; row < numRows; row++) {
            this.flowers[row] = []; // Initialize each row
            for (let col = 0; col < numCols; col++) {
                // Create a new MyFlower instance with random parameters for each position
                this.flowers[row][col] = new MyFlower(
                    scene,
                    Math.floor(Math.random() * (10 - 3 + 1)) + 3, // numPetals: Random between 3 and 10
                    5, // Assuming some parameters are constant, adjust as needed
                    [Math.random(), Math.random(), Math.random(), 1], // Random petalColor
                    Math.random() * (3 - 1) + 1, // heartRadius: Random between 1 and 3
                    [Math.random(), Math.random(), Math.random(), 1], // Random heartColor
                    0.5, // stemRadius: Constant in this example
                    Math.random() * (5 - 3) + 3, // stemHeight: Random between 3 and 5
                    [0, 1, 0, 1], // stemColor: Green, constant in this example
                    [0, 1, 0, 1], // leafColor: Green, constant in this example
                    100, // minPetalAngle: Constant in this example
                    150, // maxPetalAngle: Constant in this example
                    Math.floor(Math.random() * (7 - 2 + 1)) + 2, // numStemSegments: Random between 2 and 7
                    30, // slices: Constant in this example
                    30 // stacks: Constant in this example
                );
            }
        }
    }

    display() {
        const spacing = 20; // Define the spacing between the flowers
        
        for (let row = 0; row < this.numRows; row++) {
            for (let col = 0; col < this.numCols; col++) {
                this.scene.pushMatrix(); // Save the current state of the matrix

                // Calculate the position for each flower based on its row and column
                let xPosition = col * spacing;
                let zPosition = row * spacing;

                // Translate to the correct position
                this.scene.translate(xPosition, 0, zPosition);

                // Display the flower at this position
                this.flowers[row][col].display();
                
                this.scene.popMatrix(); // Restore the matrix state
            }
        }
    }
}
