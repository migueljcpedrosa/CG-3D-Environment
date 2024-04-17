import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFshader, CGFtexture } from "../lib/CGF.js";
import { MyPanorama } from "./MyPanorama.js";
import { MyPlane } from "./MyPlane.js";
import { MyReceptacle } from "./Flower/MyReceptacle.js";
import { MyStem } from "./Flower/MyStem.js";
import { MyPetal } from "./Flower/MyPetal.js";
import { MyFlower } from "./Flower/MyFlower.js";
import { MyLeaf } from "./Flower/MyLeaf.js";

import { MyRockSet } from "./Rocks/MyRockSet.js";

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
    this.plane = new MyPlane(this,30);
    this.receptacle = new MyReceptacle(this, 1, 30, 30);
    this.stem = new MyStem(this, 0.5, 0.5, 1, 30, 30);
    this.petal = new MyPetal(this, 100);
    this.flower = new MyFlower(this, 7, 5, [1, 0, 0, 1], 1, [1, 0, 0, 1], 0.5, 3, [0, 1, 0, 1], [0, 1, 0, 1], 100, 150, 5, 30, 30);
    this.leaf = new MyLeaf(this, 1, 1, 1, 3);
    //(scene, flowerDiameter, numPetals, petalColor, heartRadius, heartColor, stemRadius, stemHeight, stemColor, leafColor,minPetalAngle, maxPetalAngle, numStemSegments, slices, stacks) {
  

    //Objects connected to MyInterface
    this.displayAxis = true;
    this.displayReceptacle = true;
    this.displayStem = true;
    this.displayPetal = true;
    this.displayFlower = true;
    this.displayLeaf = true;
    //changed here
    this.displayRockSet = true;
    this.scaleFactor = 1;

    this.enableTextures(true);

    this.texture = new CGFtexture(this, "images/terrain.jpg");
    this.panorama = new CGFtexture(this, "images/panorama.png");
    this.appearance = new CGFappearance(this);
    this.appearance.setTexture(this.texture);
    this.appearance.setTextureWrap('REPEAT', 'REPEAT');this.sphereAppearance = new CGFappearance(this);

    this.rockAppearance1 = new CGFappearance(this);
    this.rockAppearance1.setAmbient(0.2, 0.2, 0.2, 1);  // Slightly brighter ambient reflectance
    this.rockAppearance1.setDiffuse(0.6, 0.6, 0.6, 1);  // Moderate diffuse reflectance
    this.rockAppearance1.setSpecular(0.3, 0.3, 0.3, 1); // Slightly higher specular reflectance
    this.rockAppearance1.setShininess(20.0);            // more shininess, for rough surfaces
    this.rockAppearance1.loadTexture('images/rock.jpg'); // rock texture image

    this.myPanorama = new MyPanorama(this, this.panorama);
    this.rockSet = new MyRockSet(this, 10, 3, this.rockAppearance1);
  }

  initLights() {
    this.lights[0].setPosition(15, 0, 5, 1);
    this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[0].enable();
    this.lights[0].update();
  }
  initCameras() {
    this.camera = new CGFcamera(
      1.5,
      0.1,
      1000,
      vec3.fromValues(50, 10, 15),
      vec3.fromValues(0, 0, 0)
    );
  }
  setDefaultAppearance() {
    this.setAmbient(0.2, 0.4, 0.8, 1.0);
    this.setDiffuse(0.2, 0.4, 0.8, 1.0);
    this.setSpecular(0.2, 0.4, 0.8, 1.0);
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

    this.setGlobalAmbientLight(1, 1, 1, 1);
    // Draw axis
    if (this.displayAxis) this.axis.display();
    if (this.displayReceptacle) this.receptacle.display();
    if (this.displayStem) this.stem.display();
    if (this.displayPetal) this.petal.display();
    if (this.displayFlower) this.flower.display();
    if (this.displayLeaf) this.leaf.display();

    //changed here
    if (this.displayRockSet) this.rockSet.display();
  
    // ---- BEGIN Primitive drawing section


    this.pushMatrix();
    this.appearance.apply();
    this.translate(0,-100,0);
    this.scale(400,400,400);
    this.rotate(-Math.PI/2.0,1,0,0);
    this.plane.display();
    this.popMatrix();
    this.myPanorama.display();


    // ---- END Primitive drawing section
  }
}

