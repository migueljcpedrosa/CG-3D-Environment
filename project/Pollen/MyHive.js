import { CGFappearance, CGFobject } from "../../lib/CGF.js";
import { MyCube } from "../shapes/MyCube.js";
 
export class MyHive extends CGFobject{
    constructor(scene){
        super(scene);
        this.board = new MyCube(scene);
    }

    initMaterials(){
        this.yellow = new CGFappearance(this.scene);
        this.yellow.setAmbient(1, 1, 0, 1);
        this.yellow.setDiffuse(1, 1, 0, 1);

        this.black = new CGFappearance(this.scene);
        this.black.setAmbient(0, 0, 0, 1);
        this.black.setDiffuse(0, 0, 0, 1);

        this.cyan = new CGFappearance(this.scene);
        this.cyan.setAmbient(0, 1, 1, .1);
        this.cyan.setDiffuse(0, 1, 1, .1);
        this.cyan.setSpecular(0, 1, 1, .1);
        this.cyan.setEmission(0, 1, 1, .1);
    }

    display(){
        this.board.display();
    }
}