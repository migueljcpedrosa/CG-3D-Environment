import { CGFobject } from '../../lib/CGF.js';
import { MyPetal } from './MyPetal.js';
import { MyReceptacle } from './MyReceptacle.js';
import { MyStem } from './MyStem.js';
import { MyLeaf } from './MyLeaf.js';

export class MyFlower extends CGFobject {
    constructor(scene, flowerDiameter, numPetals, petalColor, heartRadius, heartColor, stemRadius, stemHeight, stemColor, leafColor,minPetalAngle, maxPetalAngle, numStemSegments, slices, stacks) {
        super(scene);
        this.flowerDiameter = flowerDiameter;
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

        this.petals = [];
        this.angleBetweenPetals = 360 / this.numPetals;
        for (let i = 0; i < this.numPetals; i++) {
            let randomAngle = Math.random() * (this.maxPetalAngle - this.minPetalAngle) + this.minPetalAngle; // Randomize between minPetalAngle and maxPetalAngle
            this.petals.push(new MyPetal(scene, randomAngle));
        }
        this.heart = new MyReceptacle(scene, heartRadius, 10, 10);
        console.log(stemRadius, stemRadius, stemHeight, slices, stacks);
        this.stem = new MyStem(scene, stemRadius, stemRadius, stemHeight, slices, stacks);
       
    }

    display() {

        this.scene.pushMatrix();
        // Transformations for the heart
        this.scene.setDiffuse(1.0, 1.0, 0.0, 1); // Bright yellow diffuse color
        this.scene.setAmbient(0.6, 0.6, 0.1, 1.0); // Bright yellow ambient light
        this.heart.display();
        this.scene.pushMatrix();
        //green color
        this.scene.setDiffuse(0, 0.3, 0, 1); // Darker green diffuse color
        this.scene.setAmbient(0.05, 0.2, 0.05, 1); // Even darker green for the ambient color
        this.stem.display();
        this.scene.popMatrix();
        this.scene.popMatrix();

    
        this.scene.pushMatrix();
        //white color
        this.scene.setDiffuse(1, 1, 1, 1);
        this.scene.setAmbient(0.3, 0.3, 0.3, 1.0); // Soft ambient light for the white petals
        let angleBefore = 0;
        /*
        for (let i = 0; i < this.numPetals; i++) {
            this.scene.pushMatrix();
            let randomAngle = Math.random() * (this.maxPetalAngle - this.minPetalAngle) + this.minPetalAngle; // Randomize between minPetalAngle and maxPetalAngle
            this.scene.rotate(randomAngle * Math.PI / 180, 0, 1, 0);
            this.scene.rotate((angleBefore+this.angleBetweenPetals) * Math.PI / 180, 0, 1, 0);
            angleBefore += this.angleBetweenPetals;
            this.scene.translate(0, 0, -this.heartRadius);
            this.scene.scale((this.flowerDiameter-this.heartRadius)/2, (this.flowerDiameter-this.heartRadius)/2, (this.flowerDiameter-this.heartRadius)/2);
            this.scene.rotate(Math.PI/4, 1, 0, 0);
            this.petals[i].display();
            this.scene.popMatrix();
        }*/

        for (let i = 0; i < this.numPetals; i++) {
            this.scene.pushMatrix();
            this.scene.rotate((angleBefore+this.angleBetweenPetals) * Math.PI / 180, 0, 1, 0);
            angleBefore += this.angleBetweenPetals;
            this.scene.translate(0, 0, -this.heartRadius);
            this.scene.scale((this.flowerDiameter-this.heartRadius)/2, (this.flowerDiameter-this.heartRadius)/2, (this.flowerDiameter-this.heartRadius)/2);
            this.scene.rotate(Math.PI/4, 1, 0, 0);
            this.petals[i].display();
            this.scene.popMatrix();
        }


        this.scene.popMatrix();

    }


}
