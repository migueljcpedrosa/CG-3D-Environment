import {  CGFappearance, CGFobject } from '../../lib/CGF.js';
import { MyPetal } from './MyPetal.js';
import { MyReceptacle } from './MyReceptacle.js';
import { MyStem } from './MyStem.js';
import { MyLeaf } from './MyLeaf.js';
/**
 * MyFlower
 * @constructor
 * @param scene - Reference to MyScene object
 * @param flowerDiameter - Overall diameter of the flower
 * @param numPetals - Number of petals the flower will have
 * @param petalColor - RGBA color of the petals
 * @param heartRadius - Radius of the flower's heart
 * @param heartColor - RGBA color of the flower's heart
 * @param stemRadius - Radius of the stem at its base
 * @param stemHeight - Height of the stem
 * @param stemColor - RGBA color of the stem
 * @param leafColor - RGBA color of the leaves
 * @param minPetalAngle - Minimum angle for the petal's initial rotation
 * @param maxPetalAngle - Maximum angle for the petal's initial rotation
 * @param numStemSegments - Number of segments the stem consists of
 * @param slices - Number of slices for tessellation of the stem and heart
 * @param stacks - Number of stacks for tessellation of the stem and heart
 *
 * This class encapsulates the concept of a flower as a 3D object within a scene.
 * It composes a flower from various parts such as petals, a central heart, a stem, and leaves.
 * The flower's properties like size, color, and the number of petals and stem segments are 
 * customizable. The class manages the creation of these components and handles their spatial
 * and rotational transformations to assemble the flower in a natural configuration. The 
 * appearance of each component can be controlled via parameters, allowing for a variety of 
 * flower types to be instantiated.
 */
export class MyFlower extends CGFobject {
    constructor(scene, flowerRadius, numPetals, petalColor, heartRadius, heartColor, stemRadius, stemHeight, stemColor, leafColor,minPetalAngle, maxPetalAngle, numStemSegments, slices, stacks, petalMaterial, stemMaterial, receptacleMaterial, leafMaterial) {
        super(scene);
        this.flowerRadius = flowerRadius;
        this.flowerDiameter = 2 * this.flowerRadius;
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
        this.numStemSegments = numStemSegments;
        this.slices = slices;
        this.stacks = stacks;
        this.petalMaterial = petalMaterial;
        this.stemMaterial = stemMaterial;
        this.receptacleMaterial = receptacleMaterial;
        this.leafMaterial = leafMaterial;

        //different colors for flower components
        this.shadesOfGreen = [[0.13, 0.2, 0.13, 1], [0.1, 0.35, 0.1, 1], [0, 0, 0, 1], [0.0, 0.25, 0.0, 1]];
        this.petalColors = [[1, 0.4, 0.8, 1], [0.8, 0.6, 1, 1], [1, 0.7, 0.8, 1], [0.4, 0.7, 1, 1], [1, 1, 0.8, 1], [1, 0.5, 0.6, 1], [1, 1, 1, 1], [0.7, 0.5, 1, 1]];
        
        //random values to choose flower colors
        let chooseColor = Math.floor(Math.random() * (3 - 0 + 0));
        let chooseColorPetal = Math.floor(Math.random() * 8);

        //generate petals with adequate parameters
        this.petals = [];
        this.angleBetweenPetals = 360 / this.numPetals;
        for (let i = 0; i < this.numPetals; i++) {
            let randomAngle = Math.random() * (this.maxPetalAngle - this.minPetalAngle) + this.minPetalAngle; // Randomize between minPetalAngle and maxPetalAngle
            this.petals.push(new MyPetal(scene, randomAngle, this.petalMaterial, this.petalColors[chooseColorPetal]));
        }

        //generate stem segments with adequate parameters
        this.stemSegments = [];
        for (let i = 0; i <= this.numStemSegments - 1; i++) {
            let stemRandHeight = Math.random() * (stemHeight - 1) + 1;
            if (i == 0){
                this.stemSegments.push(new MyStem(scene, stemRadius, stemRadius + 0.5 * stemRadius, stemRandHeight, slices, stacks, this.stemMaterial, this.shadesOfGreen[chooseColor])); //scene, baseRadius, topRadius, height, slices, stacks
            }
            else if (i == this.numStemSegments - 2) {
                this.stemSegments.push(new MyStem(scene, stemRadius + 0.5 * stemRadius, stemRadius, stemRandHeight, slices, stacks, this.stemMaterial, this.shadesOfGreen[chooseColor]));
            }
            else {
                this.stemSegments.push(new MyStem(scene, stemRadius, stemRadius, stemRandHeight, slices, stacks, this.stemMaterial, this.shadesOfGreen[chooseColor])); //scene, baseRadius, topRadius, height, slices, stacks
            }
        }
 
        //generate heart and top stem
        this.heart = new MyReceptacle(scene, heartRadius, 5, 1, this.receptacleMaterial);
        console.log(stemRadius, stemRadius, stemHeight, slices, stacks);
        this.stem = new MyStem(scene, stemRadius + 0.5 * stemRadius, stemRadius, stemHeight, slices, stacks, this.stemMaterial, this.shadesOfGreen[chooseColor]);

        //store lead angles and scales
        this.leafAngles = [];
        for (let i = 0; i < this.numStemSegments - 1; i++) {
            this.leafAngles.push(Math.random() * 360); // Store the random angle
        }

        this.leafScales = [];
        for (let i = 0; i < this.numStemSegments - 1; i++) {
            this.leafScales.push({
                x: Math.random() * (3 - 1) + 1, 
                y: Math.random() * (3 - 1) + 1,
                z: Math.random() * (3 - 1) + 1
            });
        }

        //generate leaves with adequate parameters
        this.leaves = [];
        for (let i = 0; i < this.numStemSegments - 1; i++) {
            this.leaves.push(new MyLeaf(scene, this.leafScales[i].x, this.leafScales[i].y, this.leafScales[i].z, stemHeight, this.leafMaterial, this.shadesOfGreen[chooseColor]));
        }

        //generate middle stems (these are used in the junctions of bigger stem segments)
        this.middleStems = [];
        for (let i = 0; i < this.numStemSegments - 1; i++) {
            this.middleStems.push(new MyStem(scene, stemRadius, stemRadius, 0.4, slices, stacks, this.stemMaterial, this.shadesOfGreen[chooseColor]));
        }

        //random rotation angle between stem segments to simulate curvature of the flower
        this.rotationAngleDegrees = Math.random() * (20 - 0) + 0;
    }

    display() {
        this.scene.pushMatrix();

        // Apply the cumulative transformations
        let cumulativeHeight = 0;
        let cumulativeForwardOffset = 0;
        const rotationAngleRadians = this.rotationAngleDegrees * Math.PI / 180;
        let cumulativeRotationAngle = 0;
        let finalI = 0;
        this.scene.translate(0, this.stemSegments[0].height, 0);
    
        for (let i = 0; i < this.numStemSegments-2; i++) {
            this.scene.pushMatrix();
    
            // Apply the cumulative transformations
            this.scene.translate(0, cumulativeHeight, cumulativeForwardOffset);
            // If the stem is supposed to be tilted, apply the rotation
 
            this.scene.rotate(cumulativeRotationAngle, 1, 0, 0);
            cumulativeRotationAngle += rotationAngleRadians;

            this.scene.setDiffuse(0, 0.3, 0, 1); // Darker green diffuse color
            this.scene.setAmbient(0.05, 0.2, 0.05, 1); // Even darker green for the ambient color
            this.stemSegments[i].display();
            this.leaf = new MyLeaf(this.scene);
            let leafAngle = this.leafAngles[i];
            this.scene.rotate(leafAngle * Math.PI / 180, 0, 1, 0);
            this.scene.pushMatrix();
            this.scene.translate(0, 0.2, 0);
            this.middleStems[i].display();
            this.scene.popMatrix();
            this.scene.translate(0, 0, -this.stemRadius);
            this.leaves[i].display();

            this.scene.popMatrix();
    
            // Update the cumulativeHeight and cumulativeForwardOffset for the next segment
            console.log(this.stemSegments[i].height);
            cumulativeHeight += Math.cos(cumulativeRotationAngle) * this.stemSegments[i+1].height;
            cumulativeForwardOffset += Math.sin(cumulativeRotationAngle) * this.stemSegments[i+1].height;
            finalI += 1;
        }

        this.scene.pushMatrix();
        this.scene.translate(0, cumulativeHeight, cumulativeForwardOffset);
        this.scene.rotate(cumulativeRotationAngle, 1, 0, 0);
        this.scene.pushMatrix();
        // Transformations for the heart
        this.scene.setDiffuse(1.0, 1.0, 0.0, 1); // Bright yellow diffuse color
        this.scene.setAmbient(0.6, 0.6, 0.1, 1.0); // Bright yellow ambient light
        this.heart.display();
        this.scene.pushMatrix();

        this.scene.setDiffuse(0, 0.3, 0, 1); // Darker green diffuse color
        this.scene.setAmbient(0.05, 0.2, 0.05, 1); // Even darker green for the ambient color
        this.stemSegments[finalI].display();
        this.scene.popMatrix();
        this.scene.popMatrix();

    
        this.scene.pushMatrix();
        this.scene.setDiffuse(1, 1, 1, 1);
        this.scene.setAmbient(0.3, 0.3, 0.3, 1.0); // Soft ambient light for the white petals
        let angleBefore = 0;

        // Display the petals (lower layer)
        for (let i = 0; i < this.numPetals; i++) {
            this.scene.pushMatrix();
            this.scene.rotate((angleBefore+this.angleBetweenPetals) * Math.PI / 180, 0, 1, 0);
            angleBefore += this.angleBetweenPetals;
            this.scene.translate(0, 0, -this.heartRadius + 0.3 * this.heartRadius);
            this.scene.scale((this.flowerDiameter-this.heartRadius)/2, (this.flowerDiameter-this.heartRadius)/2, (this.flowerDiameter-this.heartRadius)/2);
            this.scene.rotate(Math.PI/6, 1, 0, 0);
            this.petals[i].display();
            this.scene.popMatrix();
        }

        // Display the petals (upper layer)
        for (let i = 0; i < this.numPetals; i++) {
            this.scene.pushMatrix();
            this.scene.translate(0, 0.1 * this.heartRadius, -0.1 *this.heartRadius);
            this.scene.rotate((angleBefore+this.angleBetweenPetals + this.angleBetweenPetals/2) * Math.PI / 180, 0, 1, 0);
            angleBefore += this.angleBetweenPetals;
            this.scene.translate(0, 0, -this.heartRadius + 0.2);
            this.scene.scale((this.flowerDiameter-this.heartRadius)/2, (this.flowerDiameter-this.heartRadius)/2, (this.flowerDiameter-this.heartRadius)/2);
            this.scene.rotate(Math.PI/4, 1, 0, 0);
            this.petals[i].display();
            this.scene.popMatrix();
        }

        this.scene.popMatrix();

        this.scene.popMatrix();

        this.scene.popMatrix();


    }


}
