import { CGFobject } from '../lib/CGF.js';
import { MyDiamond } from "./MyDiamond.js";
import { MyParallelogram } from "./MyParallelogram.js";
import { MyTriangle } from "./MyTriangle.js";
import { MyTriangleBig } from "./MyTriangleBig.js";
import { MyTriangleSmall } from "./MyTriangleSmall.js";

/**
 * MyTangram
 * @constructor
 * @param scene - Reference to MyScene object
 */

export class MyTangram extends CGFobject {
    constructor(scene) {
        super(scene);

        this.diamond = new MyDiamond(scene);
        this.triangle = new MyTriangle(scene);
        this.parallelogram = new MyParallelogram(scene);
        this.triangleBig = new MyTriangleBig(scene);
        this.triangleSmall = new MyTriangleSmall(scene);
    }

    display() {
       

		var translation = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            -0.35, 0.95, 0, 1
		];
  
        var angleInRadians = 20 * (Math.PI / 180);

        var rotation = [
            Math.cos(angleInRadians), Math.sin(angleInRadians), 0, 0,
            -Math.sin(angleInRadians), Math.cos(angleInRadians), 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ];


        //Diamond Green
        this.scene.pushMatrix();
		this.scene.multMatrix(translation);
		this.scene.multMatrix(rotation);
        this.scene.setDiffuse(0, 1, 0, 1);
		this.diamond.display();
		this.scene.popMatrix();


        //Big Blue Triangle
        this.scene.pushMatrix();
        this.scene.translate(-0.85, -1.8, 0);
        this.scene.rotate(65 * Math.PI / 180, 0, 0, 1)
        this.scene.setDiffuse(0, 0, 1, 1.0);
        this.triangleBig.display();
        this.scene.popMatrix();


        //Big Orange Triangle
        this.scene.pushMatrix();
        this.scene.translate(1.45, 3.1, 0);
        this.scene.rotate(65 * Math.PI / 180, 0, 0, 1)
        this.scene.setDiffuse(1.1, 0.7, 0.3, 1);
        this.triangleBig.display();
        this.scene.popMatrix();
        

        /*
        //Paralelograma
        this.scene.pushMatrix();
        this.scene.translate(-1.33, 0.65, 0);
        this.scene.rotate(70 * Math.PI / 180, 0, 0, 1)
        this.scene.setDiffuse(0.9, 0.9, 0.0, 1.0);
        this.triangleBig.display();
        this.scene.popMatrix();
        
        */


        /* 
        
        */


        /*
        
        
        */

        /* 
        
        
        */
        
    }
}