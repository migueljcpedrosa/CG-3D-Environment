import { CGFappearance, CGFobject } from "../../lib/CGF.js";
import { MyCube } from "../shapes/MyCube.js";
 
export class MyHive extends CGFobject{
    constructor(scene, material){
        super(scene);
        this.material = material;
        this.board = new MyCube(scene, material);
    }

    display(){
        this.scene.pushMatrix();
        this.scene.translate(0, 0, 1.1);
        this.board.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, 0, -1.1);
        this.board.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.scene.translate(0, 0, 1.1);
        this.board.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI/2, 0, 1, 0);
        this.scene.translate(0, 0, 1.1);
        this.board.display();
        this.scene.popMatrix();

        

        this.scene.pushMatrix();
        this.scene.translate(0, 0.8, 0);

        this.scene.pushMatrix();
        this.scene.translate(0, 0, 1.1);
        this.board.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, 0, -1.1);
        this.board.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.scene.translate(0, 0, 1.1);
        this.board.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI/2, 0, 1, 0);
        this.scene.translate(0, 0, 1.1);
        this.board.display();
        this.scene.popMatrix();

        this.scene.popMatrix();
    }
}