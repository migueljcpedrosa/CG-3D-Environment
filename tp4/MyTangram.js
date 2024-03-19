import { CGFobject, CGFappearance } from '../lib/CGF.js';
import { MyDiamond } from "./MyDiamond.js";
import { MyParallelogram } from "./MyParallelogram.js";
import { MyTriangle } from "./MyTriangle.js";
import { MyTriangleBig } from "./MyTriangleBig.js";
import { MyTriangleBig2 } from "./MyTriangleBig2.js";
import { MyTriangleSmall } from "./MyTriangleSmall.js";
/**
 * MyTriangle
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTangram extends CGFobject {
    constructor(scene) {
        super(scene);
        this.diamond = new MyDiamond(this.scene);
        this.triangle = new MyTriangle(this.scene);
        this.triangleBigBlue = new MyTriangleBig(this.scene);
        this.triangleBigOrange = new MyTriangleBig2(this.scene);
        this.triangleSmall = new MyTriangleSmall(this.scene);
        this.parallelogram = new MyParallelogram(this.scene);
        this.initMaterials();
    }

    initMaterials() {

        // green
        this.green = new CGFappearance(this.scene);
        this.green.setAmbient(0, 1, 0, 1.0); 
        this.green.setDiffuse(0, 1, 0, 1.0); 
        this.green.setSpecular(0.9, 0.9, 0.9, 1.0);
        this.green.setShininess(10.0);

        // purple
        this.purple = new CGFappearance(this.scene);
        this.purple.setAmbient(0.298, 0, 0.6, 1.0);
        this.purple.setDiffuse(0.298, 0, 0.6, 1.0); 
        this.purple.setSpecular(0.9, 0.9, 0.9, 1.0);
        this.purple.setShininess(10.0);

        // pink
        this.pink = new CGFappearance(this.scene);
        this.pink.setAmbient(1.0, 0.6, 0.8, 1.0);
        this.pink.setDiffuse(1.0, 0.6, 0.8, 1.0); 
        this.pink.setSpecular(0.9, 0.9, 0.9, 1.0);
        this.pink.setShininess(10.0);

        // orange
        this.orange = new CGFappearance(this.scene);
        this.orange.setAmbient(1.0, 0.502, 0, 1.0);
        this.scene.setDiffuse(1.1, 0.7, 0.3, 1);
        this.orange.setSpecular(0.9, 0.9, 0.9, 1.0);
        this.orange.setShininess(10.0);

        // blue
        this.blue = new CGFappearance(this.scene);
        this.blue.setAmbient(0.1, 0.8, 1, 1.0); 
        this.scene.setDiffuse(0.1, 0.5, 1, 1.0);
        this.scene.setAmbient(1, 0.5, 1, 1.0);
        this.blue.setShininess(10.0);

        // red
        this.red = new CGFappearance(this.scene);
        this.red.setAmbient(1, 0, 0, 1.0); 
        this.red.setDiffuse(1, 0, 0, 1.0); 
        this.red.setSpecular(0.9, 0.9, 0.9, 1.0);
        this.red.setShininess(10.0);

        // yellow
        this.yellow = new CGFappearance(this.scene);
        this.yellow.setAmbient(1, 1, 0, 1.0); 
        this.yellow.setDiffuse(1, 1, 0, 1.0); 
        this.yellow.setSpecular(0.9, 0.9, 0.9, 1.0);
        this.yellow.setShininess(10.0);

        this.diamondTexture = new CGFappearance(this.scene);
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
        //this.green.apply();
		this.diamond.display();
		this.scene.popMatrix();


        //Big Blue Triangle
        this.scene.pushMatrix();
        this.scene.translate(-0.85, -1.8, 0);
        this.scene.rotate(65 * Math.PI / 180, 0, 0, 1)
        //this.blue.apply();
        this.triangleBigBlue.display();
        this.scene.popMatrix();


        //Big Orange Triangle
        this.scene.pushMatrix();
        this.scene.translate(1.45, 3.1, 0);
        this.scene.rotate(65 * Math.PI / 180, 0, 0, 1);
        //this.orange.apply();    
        this.triangleBigOrange.display();
        this.scene.popMatrix();
        
      
        //Parallelogram
        this.scene.pushMatrix();
        this.scene.translate(-1.4, 3.8, 0);
        this.scene.rotate(110 * Math.PI / 180, 0, 0, 1);
        this.scene.scale(-1, 1, 0);
        //this.yellow.apply();
        this.parallelogram.display();
        this.scene.popMatrix();
   
    
        //Small Purple Triangle
        this.scene.pushMatrix();
        this.scene.translate(-2.38, 3.5, 0);
        this.scene.rotate(200 * Math.PI / 180, 0, 0, 1);
        //this.purple.apply();
        this.triangleSmall.display();
        this.scene.popMatrix();

        //Small Red Triangle
        this.scene.pushMatrix();
        this.scene.translate(1.7, 1.1, 0);
        this.scene.rotate(155 * Math.PI / 180, 0, 0, 1);
        //this.red.apply();
        this.triangleSmall.display();
        this.scene.popMatrix();
    
       
        //Pink Triangle
        this.scene.pushMatrix();
        this.scene.translate(1.23, 0.2, 0);
        this.scene.rotate(-25 * Math.PI / 180, 0, 0, 1);
        //this.pink.apply();
        this.triangle.display();
        this.scene.popMatrix();
        
    }

    enableNormalViz(){
        this.diamond.enableNormalViz()
        this.triangle.enableNormalViz()
        this.triangleBig.enableNormalViz()
        this.triangleSmall.enableNormalViz()
        this.parallelogram.enableNormalViz()
    };

    disableNormalViz(){
        this.diamond.disableNormalViz()
        this.triangle.disableNormalViz()
        this.triangleBig.disableNormalViz()
        this.triangleSmall.disableNormalViz()
        this.parallelogram.disableNormalViz()
    };


}
