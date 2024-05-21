import { CGFobject } from "../../lib/CGF.js";
import { MyEllipsoid } from "../shapes/MyEllipsoid.js";

/**
 * BeeAbdomen
 * @constructor
 * @param scene - Reference to MyScene object
 * @param material - Material to apply to the abdomen
 * Represents a bee abdomen object.
 * This class initializes the abdomen with a specified material.
 */

export class BeeAbdomen extends CGFobject{
    constructor(scene, material){
        super(scene);
        this.torax = new MyEllipsoid(scene, 80, 40, 1, 2, 1);
        this.material = material;
    }

    display(){
        this.scene.gl.disable(this.scene.gl.CULL_FACE);
        this.material.apply();
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/3, 1, 0, 0);
        this.torax.display();
        this.scene.popMatrix();
        this.scene.gl.enable(this.scene.gl.CULL_FACE);
    }
}