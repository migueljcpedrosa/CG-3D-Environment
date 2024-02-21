import { CGFscene, CGFcamera, CGFaxis } from "../lib/CGF.js";
import { MyDiamond } from "./MyDiamond.js";
import { MyParallelogram } from "./MyParallelogram.js";
import { MyTriangle } from "./MyTriangle.js";
import { MyTriangleBig } from "./MyTriangleBig.js";
import { MyTriangleSmall } from "./MyTriangleSmall.js";
import { MyUnitCube } from "./MyUnitCube.js";

/**
 * MyScene
 * @constructor
 */
export class MyScene extends CGFscene {
  constructor() {
    super();
  }
  init(application) {
    super.init(application);
    
    this.initCameras();
    this.initLights();

    //Background color
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);

    //Initialize scene objects
    this.axis = new CGFaxis(this);
    this.diamond = new MyDiamond(this);
    this.triangle = new MyTriangle(this);
    this.parallelogram = new MyParallelogram(this);
    this.triangleSmall = new MyTriangleSmall(this);
    this.triangleBig = new MyTriangleBig(this);
    this.unitCube = new MyUnitCube(this);

    //Objects connected to MyInterface
    this.displayAxis = true;
    this.displayDiamond = true;
    this.displayTriangle = true;
    this.displayParallelogram = true;
    this.displayTriangleBig = true;
    this.displayTriangleSmall = true;
    this.displayUnitCube = true;
    this.scaleFactor = 1;
  }
  initLights() {
    this.lights[0].setPosition(15, 2, 5, 1);
    this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[0].enable();
    this.lights[0].update();
  }
  initCameras() {
    this.camera = new CGFcamera(
      0.4,
      0.1,
      500,
      vec3.fromValues(15, 15, 15),
      vec3.fromValues(0, 0, 0)
    );
  }
  setDefaultAppearance() {
    this.setAmbient(0, 0, 0, 1.0);
    // this.setDiffuse(0.2, 0.4, 0.8, 1.0);
    this.setDiffuse(0.8, 0.4, 0.2, 1.0);
    this.setSpecular(0, 0, 0, 1.0);
    this.setShininess(10.0);
  }
  display() {
    // ---- BEGIN Background, camera and axis setup
    // Clear image and depth buffer everytime we update the scene
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    // Initialize Model-View matrix as identity (no transformation
    this.updateProjectionMatrix();
    this.loadIdentity();
    // Apply transformations corresponding to the camera position relative to the origin
    this.applyViewMatrix();

    // Draw axis
    if (this.displayAxis) this.axis.display();

    this.setDefaultAppearance();

    var sca = [
      this.scaleFactor,
      0.0,
      0.0,
      0.0,
      0.0,
      this.scaleFactor,
      0.0,
      0.0,
      0.0,
      0.0,
      this.scaleFactor,
      0.0,
      0.0,
      0.0,
      0.0,
      1.0,
    ];

    this.multMatrix(sca);

    //new code
    const toRadians = (angle) => {
        return Math.PI * angle / 180;
    }; 
  
    const rotateAroundZAxis = (angle) => {
        return [
            Math.cos(toRadians(angle)), -Math.sin(toRadians(angle)), 0, 0,
            Math.sin(toRadians(angle)), Math.cos(toRadians(angle)), 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ];
    };

    const rotateAroundYAxis = (angle) => {
        return [
            Math.cos(toRadians(angle)), 0, Math.sin(toRadians(angle)), 0,
            0, 1, 0, 0,
            -Math.sin(toRadians(angle)), 0, Math.cos(toRadians(angle)), 0,
            0, 0, 0, 1
        ];
    };
    
    
  
    const translate = (x, y, z) => {
    return [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        x, y, z, 1
    ];
    };
  
    const scale = (x, y, z) => {
    return [
        x, 0, 0, 0,
        0, y, 0, 0,
        0, 0, z, 0,
        0, 0, 0, 1
    ];
    }; 

    if(this.displayUnitCube) this.unitCube.display();

    // ---- BEGIN Primitive drawing section

    //this.pushMatrix();
    //this.multMatrix(translate(-0.35, 0.95, 0));
    //this.multMatrix(rotateAroundZAxis(-20));   
    //this.setDiffuse(0, 1, 0, 1.0);
    //if(this.displayDiamond) this.diamond.display();
    //this.popMatrix();

    /*
    this.pushMatrix();
    this.multMatrix(translate(-2.4, 1.4, 0));
    if(this.displayTriangleSmall) this.triangleSmall.display();
    this.popMatrix();

    this.pushMatrix();
    this.multMatrix(translate(-1.4, -1.4, 0));
    this.multMatrix(rotateAroundZAxis(45));
    if(this.displayTriangleBig) this.triangleBig.display();
    this.popMatrix();

    this.pushMatrix();
    this.multMatrix(translate(1.4, -1.4, 0));
    this.multMatrix(rotateAroundZAxis(-45));
    if(this.displayTriangleBig) this.triangleBig.display();
    this.popMatrix();

    this.pushMatrix();
    this.multMatrix(translate(-1, -2.8, 0));
    if(this.displayTriangleSmall) this.triangleSmall.display();
    this.popMatrix();

    this.pushMatrix();
    this.multMatrix(translate(0, -2.8, 0));
    this.multMatrix(rotateAroundZAxis(-90));
    if(this.displayTriangle) this.triangle.display();
    this.popMatrix();

    this.pushMatrix();
    this.multMatrix(translate(1.4, 0, 0));
    this.multMatrix(rotateAroundYAxis(180));
    this.multMatrix(rotateAroundZAxis(-135));
    if(this.displayParallelogram) this.parallelogram.display();
    this.popMatrix();
    */
  }
}