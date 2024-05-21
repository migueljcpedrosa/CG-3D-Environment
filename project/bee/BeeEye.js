import { CGFobject } from "../../lib/CGF.js";
import { MyEllipsoid } from "../shapes/MyEllipsoid.js";

/**
 * BeeEye
 * @constructor
 * @param scene - Reference to MyScene object
 * @param material - Material to apply to the eye
 * Represents a bee eye object.
 * This class initializes the eye with a specified material.
 */

export class BeeEye extends CGFobject{
    constructor(scene, material){
        super(scene);
        this.eye = new MyEllipsoid(scene, 30, 15, 1, 3, 1);
        this.material = material;
    }
    display(){
        this.scene.pushMatrix();
        this.scene.scale(0.2, 0.2, 0.2);
        this.scene.rotate(-Math.PI/4, 1, 1, 0);
        this.material.apply();
        this.eye.display();
        this.scene.popMatrix();
    }
}