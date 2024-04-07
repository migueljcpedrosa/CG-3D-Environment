import { CGFobject } from '../lib/CGF.js';
import { MyPetal } from './MyPetal.js';
import { MyReceptacle } from './MyReceptacle.js';
import { MyStem } from './MyStem.js';

export class MyFlower extends CGFobject {
    constructor(scene, petalRadius, numPetals, petalColor, heartRadius, heartColor, stemRadius, stemHeight, stemColor, leafColor,minPetalAngle, maxPetalAngle, slices, stacks) {
        super(scene);
        this.petalRadius = petalRadius;
        this.numPetals = numPetals;
        this.petalColor = petalColor;
        this.heartRadius = heartRadius;
        this.heartColor = heartColor;
        this.stemRadius = stemRadius;
        this.stemHeight = stemHeight;
        this.stemColor = stemColor;
        this.leafColor = leafColor;
        this.minPetalAngle = minPetalAngle;
        this.maxPetalAngle = maxPetalAngle;
        this.slices = slices;
        this.stacks = stacks;

        this.petals = [];
        this.angleBetweenPetals = 360 / this.numPetals;
        for (let i = 0; i < this.numPetals; i++) {
            let randomAngle = Math.random() * (this.maxPetalAngle - this.minPetalAngle) + this.minPetalAngle; // Randomize between minPetalAngle and maxPetalAngle
            this.petals.push(new MyPetal(scene, randomAngle));
        }
        this.heart = new MyReceptacle(scene, heartRadius, slices, stacks);
        this.stem = new MyStem(scene, stemRadius, stemRadius, stemHeight, slices, stacks);

        // Define additional properties and objects for the stem's subdivisions, leaves, and other transformations
    }

    display() {
        // Apply transformations and display the heart
        this.scene.pushMatrix();
        // Transformations for the heart
        this.heart.display();
        this.scene.popMatrix();

        // Display each petal with its transformation
        for (let i = 0; i < this.numPetals; i++) {
            this.scene.pushMatrix();
            // Transformations for the petals
            this.scene.rotate(i * this.angleBetweenPetals * Math.PI / 180, 0, 0, 1); // Rotate each petal to its position
            this.scene.translate(0, this.petalRadius, 0); // Position the petal
            this.petals[i].display();
            this.scene.popMatrix();
        }

        // Apply transformations and display the stem
        this.scene.pushMatrix();
        // Transformations for the stem
        this.stem.display();
        this.scene.popMatrix();

        // Additional code for leaves and stem subdivisions if needed
    }

    // Additional methods for setting colors and other properties
}
