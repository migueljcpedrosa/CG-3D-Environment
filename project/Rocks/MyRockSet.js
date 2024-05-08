import { CGFobject } from '../../lib/CGF.js';
import { MyRock } from './MyRock.js'; 


export class MyRockSet extends CGFobject {
    constructor(scene, numRocks, rockBaseSize, rockMaterial) {
        super(scene);
        this.numRocks = numRocks;
        this.rockBaseSize = rockBaseSize;
        this.rockMaterial = rockMaterial;
        this.rocks = [];
        this.generateRocks();
    }

    generateRocks() {

        for (let i = 0; i < this.numRocks; i++) {
            let rockSize = this.rockBaseSize; // Variation in size
            let scaleX = (3 - 2) * Math.random() + 2;
            let scaleY = (2 - 1) * Math.random() + 1;
            let scaleZ = (3 - 2) * Math.random() + 2;

            //updated here:
            let rock = new MyRock(this.scene, 15, 10, rockSize * 0.2, scaleX, scaleY, scaleZ, this.rockMaterial);
            
            this.rocks.push(rock);
        }
    }


    display() {
        this.scene.gl.disable(this.scene.gl.CULL_FACE);

        this.scene.pushMatrix(); // Save the current state of the matrix
        this.scene.scale(3, 3, 3);
        this.scene.translate(10, -32, 0); // Center the pyramid in the scene
        this.scene.pushMatrix(); // Save the current state of the matrix
        //this.scene.translate(-100, 0, -100); // Center the pyramid in the scene

        // Define an array that specifies the number of rocks per layer
        const layers = [5, 3, 1];
        let heightOffset = 0; // Starting height for the base layer
        let rockIndex = 0; // Index of the first rock in the current layer
        let radius = 3.5; // Define the radius for placing rocks in a circular pattern

        // Iterate over each layer specified in the layers array
        for (let currentLayer = 0; currentLayer < layers.length; currentLayer++) {
            let numRocksInLayer = layers[currentLayer];
            let angleIncrement = 360 / numRocksInLayer; // Angle increment based on number of rocks

            for (let i = 0; i < numRocksInLayer; i++) {
                this.scene.pushMatrix();

                // Calculate x and z positions based on circular coordinates
                let angle = angleIncrement * i; // Current angle for the rock
                let xPosition = radius * Math.cos(angle * Math.PI / 180);
                let zPosition = radius * Math.sin(angle * Math.PI / 180);

                this.scene.translate(xPosition, heightOffset, zPosition);
                //this.rocks[rockIndex++].display(); // Display the rock and increment index

                if (currentLayer == layers.length - 1) {
                    this.scene.translate(- radius/2, 0, - radius/2);
                    this.rocks[rockIndex++].display(); // Display the rock and increment index
                }
                else {
                    this.rocks[rockIndex++].display(); // Display the rock and increment index
                }

                this.scene.popMatrix();
            }

            radius -= 0.5; // Reduce the radius for the next layer to keep it centered
            heightOffset += 2.5; // Increment the height offset for the next layer
        }

        this.scene.popMatrix();

        this.scene.popMatrix(); // Restore the previous state of the matrix
        this.scene.gl.enable(this.scene.gl.CULL_FACE);
    }

}
