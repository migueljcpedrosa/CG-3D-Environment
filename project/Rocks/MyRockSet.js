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
            let rockSize = this.rockBaseSize * (Math.random() * 0.5 + 0.75); // Variation in size
            let scaleX = (2 - 0.5) * Math.random() + 0.5;
            let scaleY = (2 - 0.5) * Math.random() + 0.5;
            let scaleZ = (2 - 0.5) * Math.random() + 0.5;

            //updated here:
            let rock = new MyRock(this.scene, 15, 10, rockSize * 0.2, scaleX, scaleY, scaleZ, this.rockMaterial);
            
            this.rocks.push(rock);
        }
    }

    /*
    display() {
        this.scene.gl.disable(this.scene.gl.CULL_FACE);

        let accumulatedScaleY = 0;
        
        for (let i = 0; i < this.numRocks; i++) {
            this.scene.pushMatrix();
            
            
            if(i>0){
                accumulatedScaleY += 2;

                //this.scene.translate(0, this.rocks[i - 1].scaleY * this.rocks[i - 1].rocksize / 2, 0);
                this.scene.translate(0, accumulatedScaleY, 0);
            }
            else{
                continue;
            }
            //this.scene.rotate(Math.random() * 2 * Math.PI, 0, 1, 0);
            this.rocks[i].display();
            this.scene.popMatrix();
        }
        this.scene.gl.enable(this.scene.gl.CULL_FACE);
    } 
    display() {
        this.scene.pushMatrix(); // Save the current state of the matrix
        this.scene.translate(-100, 0, -100); // Center the pyramid in the scene
    
        let baseSpacing = 40; // Initial horizontal spacing between rocks
        let heightOffset = 0; // Starting height for the base layer
    
        // Determine the maximum number of layers for the pyramid structure
        let layer = 0, totalRocksUsed = 0;
        while (totalRocksUsed + (layer + 1) <= this.numRocks) {
            layer++;
            totalRocksUsed += layer; // Simulates building each layer with one additional rock than the previous
        }
    
        // Index of the first rock in the current layer
        let rockIndex = 0;
    
        for (let currentLayer = 1; currentLayer <= layer; currentLayer++) {
            // Calculate horizontal offset to center the current layer
            let horizontalOffset = (layer - currentLayer) * baseSpacing / 2;
    
            for (let i = 0; i < currentLayer; i++) {
                this.scene.pushMatrix();
    
                // Calculate x and z positions to distribute rocks evenly within the current layer
                let xPosition = horizontalOffset + i * baseSpacing;
                let zPosition = horizontalOffset; // Keeping z constant for simplicity
    
                this.scene.translate(xPosition, heightOffset, zPosition);
                this.rocks[rockIndex].display(); // Access the single-dimensional array of rocks
                this.scene.popMatrix();
    
                rockIndex++; // Move to the next rock in the array
            }
    
            // Assume a constant height per layer, adjust if varying
            heightOffset += 20; // Increment the height offset for the next layer
        }
        this.scene.popMatrix();
    } 
    display() {
        this.scene.pushMatrix(); // Save the current state of the matrix
        this.scene.translate(-100, 0, -100); // Center the pyramid in the scene
    
        let baseSpacing = 20; // Reduced horizontal spacing between rocks for a tighter layout
        let heightOffset = 0; // Starting height for the base layer
    
        // Determine the maximum number of layers for the pyramid structure
        let layer = 0, totalRocksUsed = 0;
        while (totalRocksUsed + (layer + 1) <= this.numRocks) {
            layer++;
            totalRocksUsed += layer; // Simulates building each layer with one additional rock than the previous
        }
    
        // Index of the first rock in the current layer
        let rockIndex = 0;
    
        for (let currentLayer = 1; currentLayer <= layer; currentLayer++) {
            // Calculate horizontal offset to center the current layer
            let horizontalOffset = (layer - currentLayer) * baseSpacing / 2;
    
            for (let i = 0; i < currentLayer; i++) {
                this.scene.pushMatrix();
    
                // Calculate x and z positions to distribute rocks evenly within the current layer
                let xPosition = horizontalOffset + i * baseSpacing;
                let zPosition = horizontalOffset; // Keeping z constant for simplicity
    
                this.scene.translate(xPosition, heightOffset, zPosition);
                this.rocks[rockIndex].display(); // Access the single-dimensional array of rocks
                this.scene.popMatrix();
    
                rockIndex++; // Move to the next rock in the array
            }
    
            // Assume a constant height per layer, adjust if varying
            heightOffset += 10; // Reduced height increment for a tighter pyramid
        }
        this.scene.popMatrix();
    } 

    display() {
        this.scene.pushMatrix(); // Save the current state of the matrix
        this.scene.translate(-100, 0, -100); // Center the pyramid in the scene
    
        // Define an array that specifies the number of rocks per layer
        const layers = [5, 3, 1];
        let heightOffset = 0; // Starting height for the base layer
        let rockIndex = 0; // Index of the first rock in the current layer
        let baseSpacing = 20; // Horizontal spacing between rocks
    
        // Iterate over each layer specified in the layers array
        for (let currentLayer = 0; currentLayer < layers.length; currentLayer++) {
            let numRocksInLayer = layers[currentLayer];
            let horizontalOffset = (layers[0] - numRocksInLayer) * baseSpacing / 2;
    
            for (let i = 0; i < numRocksInLayer; i++) {
                this.scene.pushMatrix();
    
                // Calculate x and z positions to distribute rocks evenly within the current layer
                let xPosition = horizontalOffset + i * baseSpacing;
                let zPosition = horizontalOffset; // Keeping z constant for simplicity
    
                this.scene.translate(xPosition, heightOffset, zPosition);
                this.rocks[rockIndex++].display(); // Display the rock and increment index
                this.scene.popMatrix();
            }
    
            heightOffset += 20; // Increment the height offset for the next layer
        }
    
        this.scene.popMatrix();
    }
    display() {
        this.scene.pushMatrix(); // Save the current state of the matrix
        this.scene.translate(-100, 0, -100); // Center the pyramid in the scene
    
        // Define an array that specifies the number of rocks per layer
        const layers = [5, 3, 1];
        let heightOffset = 0; // Starting height for the base layer
        let rockIndex = 0; // Index of the first rock in the current layer
        let radius = 50; // Define the radius for placing rocks in a circular pattern
    
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
                this.rocks[rockIndex++].display(); // Display the rock and increment index
                this.scene.popMatrix();
            }
    
            radius -= 15; // Reduce the radius for the next layer to keep it centered
            heightOffset += 20; // Increment the height offset for the next layer
        }
    
        this.scene.popMatrix();
    } */

    display() {
        this.scene.gl.disable(this.scene.gl.CULL_FACE);
        this.scene.pushMatrix(); // Save the current state of the matrix
        //this.scene.translate(-100, 0, -100); // Center the pyramid in the scene

        // Define an array that specifies the number of rocks per layer
        const layers = [5, 3, 1];
        let heightOffset = 0; // Starting height for the base layer
        let rockIndex = 0; // Index of the first rock in the current layer
        let radius = 2; // Define the radius for placing rocks in a circular pattern

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
                this.rocks[rockIndex++].display(); // Display the rock and increment index
                this.scene.popMatrix();
            }

            radius -= 0.5; // Reduce the radius for the next layer to keep it centered
            heightOffset += 2; // Increment the height offset for the next layer
        }

        
        this.scene.popMatrix();
        this.scene.gl.enable(this.scene.gl.CULL_FACE);
    }
}
