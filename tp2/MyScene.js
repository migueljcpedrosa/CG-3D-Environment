import { CGFscene, CGFcamera, CGFaxis } from "../lib/CGF.js";
import { MyDiamond } from "./MyDiamond.js";
import { MyParallelogram } from "./MyParallelogram.js";
import { MyTriangle } from "./MyTriangle.js";
import { MyTriangleBig } from "./MyTriangleBig.js";
import { MyTriangleSmall } from "./MyTriangleSmall.js";
import { MyQuad } from "./MyQuad.js";
import { MyUnitCubeQuad } from "./MyUnitCubeQuad.js";
import { MyTangram } from "./MyTangram.js";

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
    this.quad = new MyQuad(this);
    this.MyUnitCubeQuad = new MyUnitCubeQuad(this);
    this.tangram = new MyTangram(this);
    
    //Objects connected to MyInterface
    this.displayAxis = true;
    this.displayDiamond = true;
    this.displayTriangle = true;
    this.displayParallelogram = true;
    this.displayTriangleBig = true;
    this.displayTriangleSmall = true;
    this.displayQuad = true;
    this.displayMyUnitCubeQuad = true;
    this.displayTangram = true;
    this.scaleFactor = 1;
  }
  initLights() {
    this.lights[0].setPosition(0, 0, 15, 1);
    this.lights[0].setDiffuse(0.5, 0.5, 0.5, 1.0);
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

    // ---- BEGIN Primitive drawing section

    //Unit Cube Quad
    this.pushMatrix();
    this.translate(0, 0, -5.1);
    this.scale(10, 10, 10);
    if(this.displayMyUnitCubeQuad) this.MyUnitCubeQuad.display();
    this.popMatrix();
      

    this.multMatrix(sca);
    //this.rotate(-Math.PI/2,1,0,0);

    //Tangram
    this.pushMatrix();
    if(this.displayTangram) this.tangram.display();
    this.popMatrix();

}
}