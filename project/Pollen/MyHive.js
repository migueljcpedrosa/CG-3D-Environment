import { CGFappearance, CGFobject } from "../../lib/CGF.js";
import { MyCube } from "../shapes/MyCube.js";
 
export class MyHive extends CGFobject{
    constructor(scene, woodMaterial, honeyMaterial){
        super(scene);
        this.woodMaterial = woodMaterial;
        this.honeyMaterial = honeyMaterial;
        this.board = new MyCube(scene, woodMaterial);
        this.honey = new MyCube(scene, honeyMaterial);
    }

    display(){
        this.scene.pushMatrix();
        this.scene.translate(0, 0, 0.9);
        this.board.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, 0, -0.9);
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
        this.scene.translate(0, 0, 0.9);
        this.board.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, 0, -0.9);
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

        this.scene.pushMatrix();
        this.scene.scale(1, 2, 1);    
        this.scene.translate(0, 0.2, 0);
        this.honey.display();
        this.scene.popMatrix();
       
        this.scene.pushMatrix();
        this.scene.scale(1, 2, 1);    
        this.scene.translate(0, 0.2, 0.4);
        this.honey.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.scale(1, 2, 1);    
        this.scene.translate(0, 0.2, -0.4);
        this.honey.display();
        this.scene.popMatrix();
       
    }
}