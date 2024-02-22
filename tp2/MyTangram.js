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
        this.triangleBigLeft = new MyTriangleBig(scene);
        this.triangleBigRight = new MyTriangleBig(scene);
        this.triangleSmallTop = new MyTriangleSmall(scene);
        this.triangleSmallBottom = new MyTriangleSmall(scene);
    }

    display() {

        /*
        
          this.pushMatrix();
    this.multMatrix(translate(-0.35, 0.95, 0));
    this.multMatrix(rotateAroundZAxis(-20));   
    this.setDiffuse(0, 1, 0, 1.0);
    //this.setAmbient(0, 1, 0, 1.0);
    if(this.displayDiamond) this.diamond.display();
    this.popMatrix();

    
    this.pushMatrix();
    this.multMatrix(translate(-2.38, 3.5, 0));
    this.multMatrix(rotateAroundZAxis(160));   
    this.setDiffuse(0.7, 0, 0.7, 1.0);
    //this.setAmbient(0.7, 0, 0.7, 1.0);
    if(this.displayTriangleSmall) this.triangleSmall.display();
    this.popMatrix();

    
    this.pushMatrix();
    this.multMatrix(translate(-0.85, -1.8, 0));
    this.multMatrix(rotateAroundZAxis(-65));
    this.setDiffuse(0, 0, 0.6, 1.0);
    //this.setAmbient(0, 0, 0.6, 1.0);
    if(this.displayTriangleBig) this.triangleBig.display();
    this.popMatrix();

    
    this.pushMatrix();
    this.multMatrix(translate(1.45, 3.1, 0));
    this.multMatrix(rotateAroundZAxis(-65));
    this.setDiffuse(1.1, 0.7, 0.3, 1.0);
    //this.setAmbient(1.1, 0.7, 0.3, 1.0);
    if(this.displayTriangleBig) this.triangleBig.display();
    this.popMatrix();

    
    this.pushMatrix();
    this.multMatrix(translate(1.28, 0.2, 0));
    this.multMatrix(rotateAroundZAxis(-110));
    this.multMatrix(scale(1.5, 1.5, 0));
    this.setDiffuse(0.3, 0.1, 0.2, 1.0);
    //this.setAmbient(0.3, 0.1, 0.2, 1.0);
    if(this.displayTriangleSmall) this.triangleSmall.display();
    this.popMatrix();

    
    this.pushMatrix();
    this.multMatrix(translate(1.85, 1.1, 0));
    this.multMatrix(rotateAroundZAxis(-20));
    this.setDiffuse(1, 0, 0, 1.0);
    //this.setAmbient(1, 0, 0, 1.0);
    this.multMatrix(scale(0.8, 0.8, 0));
    if(this.displayTriangle) this.triangle.display();
    this.popMatrix();

    
    this.pushMatrix();
    this.multMatrix(translate(-1.33, 0.65, 0));
    this.multMatrix(rotateAroundYAxis(180));
    this.multMatrix(rotateAroundZAxis(-70));
    this.setDiffuse(0.9, 0.9, 0.0, 1.0);
    this.setAmbient(0.9, 0.9, 0.0, 1.0);
    if(this.displayParallelogram) this.parallelogram.display();
    this.popMatrix();
        
        
        
        */


    }
}