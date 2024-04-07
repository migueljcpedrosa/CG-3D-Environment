import { CGFobject } from '../../lib/CGF.js';
import { MyPetal } from './MyPetal.js';
import { MyReceptacle } from './MyReceptacle.js';
import { MyStem } from './MyStem.js';
import { MyLeaf } from './MyLeaf.js';

export class MyFlower extends CGFobject {
    constructor(scene, petalRadius, numPetals, petalColor, heartRadius, heartColor, stemRadius, stemHeight, stemColor, leafColor,minPetalAngle, maxPetalAngle, numStemSegments, slices, stacks) {
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

        this.stemSegments = [];
        this.leaves = [];
        this.numStemSegments = numStemSegments; // Number of stem segments

        // Create stem segments and leaves
        let segmentHeights = []; // Array to store the heights of each segment
        for (let i = 0; i < this.numStemSegments; i++) {
            // Random length for each stem segment, within 70-130% of the average segment height
            let segmentHeight = stemHeight * ((0.7 + Math.random() * 0.6) / this.numStemSegments);
            segmentHeights.push(segmentHeight);

            let stemSegment = new MyStem(scene, stemRadius, stemRadius, segmentHeight, slices, 1); // Create a segment with random height
            this.stemSegments.push(stemSegment);

            let leaf = new MyLeaf(scene); // Create a new leaf
            this.leaves.push(leaf);
        }
    }

    display() {
    
    }


}
