import { CGFappearance, CGFobject } from "../../lib/CGF.js";
import { MyCube } from "../shapes/MyCube.js";
import { MyPollen } from "./MyPollen.js";
 
export class MyHive extends CGFobject{
    constructor(scene, woodMaterial, honeyMaterial, pollenMaterial){
        super(scene);
        this.woodMaterial = woodMaterial;
        this.honeyMaterial = honeyMaterial;
        this.board = new MyCube(scene, woodMaterial);
        this.honey = new MyCube(scene, honeyMaterial);
        this.pollen = new MyPollen(scene, pollenMaterial);
        this.maxPollen = 40;
        this.pollenNum = 0;
    }

    display(){
        this.scene.pushMatrix();
        this.scene.translate(0, -93, -50);
        this.scene.scale(10, 10, 10);

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
        this.scene.translate(0, -0.52, 0.5);
        this.scene.scale(1.2, 1.2, 1.2);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.board.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, -0.52, -0.5);
        this.scene.scale(1.2, 1.2, 1.2);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.board.display();
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

        for(let i = 0; i < this.pollenNum; i++){
            let x = -.1 * (i % 20);
            let z = -.1 * Math.floor(i / 20);
            this.scene.pushMatrix();
            this.scene.translate(.95 + x, 1.15, .71 + z);
            this.scene.scale(.1, .1, .1);
            this.pollen.display();
            this.scene.popMatrix();            
        }

        //lid
        this.scene.pushMatrix();

        this.scene.translate(0, 1, 0.5);
        this.scene.rotate(-Math.PI/4, 1, 0, 0);

        this.scene.pushMatrix();
        this.scene.translate(0, 1.6, 0);
        this.scene.pushMatrix();
        this.scene.translate(0, 0, -0.9);
        this.board.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, 0.8, -0.9);
        this.board.display();
        this.scene.popMatrix();
        this.scene.popMatrix();

        this.scene.popMatrix();

        this.scene.popMatrix();
    }
}