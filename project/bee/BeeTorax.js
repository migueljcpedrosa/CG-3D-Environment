import { CGFobject } from "../../lib/CGF.js";
import { MySphere } from "../shapes/MySphere.js";

/**
 * BeeTorax
 * @constructor
 * @param scene - Reference to MyScene object
 * @param material - Material to apply to the torax
 * Represents a bee torax object.
 * This class initializes the torax with a specified material.
 */
export class BeeTorax extends CGFobject{
    constructor(scene, material){
        super(scene);
        this.abdomen = new MySphere(scene, 30, 15, false);
        this.material = material;
    }

    display(){
        this.scene.gl.disable(this.scene.gl.CULL_FACE);
        this.material.apply();
        this.abdomen.display();
        this.scene.gl.enable(this.scene.gl.CULL_FACE);
    }

}