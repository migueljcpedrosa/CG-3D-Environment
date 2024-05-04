import { CGFappearance, CGFobject } from "../../lib/CGF.js";
import { MySphere } from "../shapes/MySphere.js";
 
export class MyPollen extends CGFobject{
    constructor(scene, material){
        super(scene);
        this.material = material;   
        this.grain = new MySphere(scene, 16, 8, false);
;
    }

    display(){
        this.scene.gl.disable(this.scene.gl.CULL_FACE);
        this.scene.pushMatrix();
        this.material.apply();
        this.scene.scale(0.5, 1, 0.5);
        this.grain.display();
        this.scene.popMatrix();
        this.scene.gl.enable(this.scene.gl.CULL_FACE);
    }
}