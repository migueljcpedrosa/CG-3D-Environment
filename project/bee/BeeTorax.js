import { CGFobject } from "../../lib/CGF.js";
import { MySphere } from "../shapes/MySphere.js";

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