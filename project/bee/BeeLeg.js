import { CGFobject } from "../../lib/CGF.js";
import { MyCylinder } from "../shapes/MyCylinder.js";
import { MyEllipsoid } from "../shapes/MyEllipsoid.js";

/**
 * BeeLeg
 * @constructor
 * @param scene - Reference to MyScene object
 * @param left - Boolean to determine if the leg is the left or right leg
 * Represents a bee leg object.
 * This class initializes the leg with a specified left boolean.
 * The leg is composed of three parts: a cylinder, a larger cylinder, and an ellipsoid.
 */

export class BeeLeg extends CGFobject{
    constructor(scene, left){
        super(scene);
        this.part1 = new MyCylinder(scene, .1, .1, .9, 10, 1);
        this.part2 = new MyCylinder(scene, .1, .1, 1.35, 10, 1);
        this.part3 = new MyEllipsoid(scene, 10, 5, .2, .2, .2);
        this.left = left;
    }

    display(){
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/6, 1, 0, 0);
        this.scene.rotate(this.left ? Math.PI/3 : -Math.PI/3, 0, 1, 0);
        this.part1.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/6, 1, 0, 0);
        this.scene.rotate(this.left ? Math.PI/3 : -Math.PI/3, 0, 1, 0); 
        this.scene.translate(0, 0.08 , .9);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.part2.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/6, 1, 0, 0);
        this.scene.rotate(this.left ? Math.PI/3 : -Math.PI/3, 0, 1, 0); 
        this.scene.translate(0, 0.08 , .9);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.scene.translate(0, 0, 1.35);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.scene.scale(1, 2, 1);
        this.part3.display();
        this.scene.popMatrix();
    }
}