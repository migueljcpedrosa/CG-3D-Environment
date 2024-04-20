import { CGFobject } from "../../lib/CGF.js";
import { MyCylinder } from "../shapes/MyCylinder.js";

export class BeeAntenna extends CGFobject{
    constructor(scene, material){
        super(scene);
        this.part1 = new MyCylinder(scene, 0.04, 0.03, 0.2, 6, 1);
        this.part2 = new MyCylinder(scene, 0.05, 0, 0.6, 6, 1);
        this.material = material;
    }

    display(){
        this.material.apply();
        this.scene.pushMatrix();
        this.part1.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();
        this.scene.translate(0, 0, 0.15);
        this.scene.rotate(Math.PI / 6, 1, 0, 0);
        this.part2.display();
        this.scene.popMatrix();
    }
    
}