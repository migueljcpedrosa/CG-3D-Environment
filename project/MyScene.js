import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFshader, CGFtexture } from "../lib/CGF.js";
import { MyPanorama } from "./MyPanorama.js";
import { MyPlane } from "./shapes/MyPlane.js";
import { MyReceptacle } from "./Flower/MyReceptacle.js";
import { MyStem } from "./Flower/MyStem.js";
import { MyPetal } from "./Flower/MyPetal.js";
import { MyFlower } from "./Flower/MyFlower.js";
import { MyLeaf } from "./Flower/MyLeaf.js";
import { MyGarden } from "./Flower/MyGarden.js";
import { Mybee } from "./bee/MyBee.js";

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

    this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
    this.gl.enable(this.gl.BLEND);
    
    this.initCameras();
    this.initLights();

    //Background color
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);
    //(scene, flowerDiameter, numPetals, petalColor, heartRadius, heartColor, stemRadius, stemHeight, stemColor, leafColor,minPetalAngle, maxPetalAngle, numStemSegments, slices, stacks) {
    
    //Objects connected to MyInterface
    this.displayAxis = true;
    this.displayReceptacle = true;
    this.displayStem = true;
    this.displayPetal = true;
    this.displayFlower = true;
    this.displayLeaf = true;
    this.displayGarden = true;
    this.displayBee = true;
    this.scaleFactor = 1;
    this.gardenRowsColumns = 5;

    this.enableTextures(true);

    this.texture = new CGFtexture(this, "images/terrain.jpg");
    this.panorama = new CGFtexture(this, "images/panorama.jpg");
    this.appearance = new CGFappearance(this);
    this.appearance.setTexture(this.texture);
    this.appearance.setTextureWrap('REPEAT', 'REPEAT');this.sphereAppearance = new CGFappearance(this);

    this.petalAppearance1 = new CGFappearance(this);
    this.petalAppearance1.setAmbient(0.1, 0.1, 0.1, 1);
    this.petalAppearance1.setSpecular(0.1, 0.1, 0.1, 1);
    this.petalAppearance1.setShininess(10.0);
    this.petalAppearance1.loadTexture('images/pinkpetal.jpg');
    this.petalAppearance1.setTextureWrap('REPEAT', 'REPEAT');

    this.petalAppearance2 = new CGFappearance(this);
    this.petalAppearance2.setAmbient(0.1, 0.1, 0.1, 1);
    this.petalAppearance2.setSpecular(0.1, 0.1, 0.1, 1);
    this.petalAppearance2.setShininess(10.0);
    this.petalAppearance2.loadTexture('images/bluepetal.jpg');

    this.stemAppearance = new CGFappearance(this);
    this.stemAppearance.setDiffuse(0.1, 0.35, 0.1, 1);
    this.stemAppearance.setSpecular(0.1, 0.1, 0.1, 0.5)
    this.stemAppearance.setShininess(10.0);
    this.stemAppearance.loadTexture('images/greenstem.png');
    this.stemAppearance.setTextureWrap('REPEAT', 'REPEAT');

    this.receptacleAppearance = new CGFappearance(this);
    this.receptacleAppearance.setAmbient(0.1, 0.3, 0.1, 1);
    this.receptacleAppearance.setDiffuse(0.2, 0.5, 0.2, 1);
    this.receptacleAppearance.setSpecular(0.1, 0.1, 0.1, 1)
    this.receptacleAppearance.setShininess(10.0);
    this.receptacleAppearance.loadTexture('images/yellowreceptacle.png');
    this.receptacleAppearance.setTextureWrap('REPEAT', 'REPEAT');

    this.leafAppearance = new CGFappearance(this);
    this.leafAppearance.setAmbient(0.1, 0.3, 0.1, 1);
    this.leafAppearance.setDiffuse(0.2, 0.5, 0.2, 1);
    this.leafAppearance.setSpecular(0.1, 0.1, 0.1, 1)
    this.leafAppearance.setShininess(10.0);
    this.leafAppearance.loadTexture('images/greenleaf.jpg');
    this.leafAppearance.setTextureWrap('REPEAT', 'REPEAT');

    //Initialize scene objects
    this.axis = new CGFaxis(this);
    this.plane = new MyPlane(this,30);
    this.receptacle = new MyReceptacle(this, 1, 30, 30, this.receptacleAppearance);
    this.stem = new MyStem(this, 0.5, 0.5, 1, 30, 30, this.stemAppearance, [0, 1, 0, 1]);
    this.petal = new MyPetal(this, 100, this.petalAppearance1, [1, 0, 0, 1]);
    this.flower = new MyFlower(this, 3.5, 5, [1, 0, 0, 1], 1, [1, 0, 0, 1], 0.5, 5, [0, 1, 0, 1], [0, 1, 0, 1], 100, 150, 5, 30, 30, this.petalAppearance1, this.stemAppearance, this.receptacleAppearance, this.leafAppearance);
    this.leaf = new MyLeaf(this, 1, 1, 1, 3, this.leafAppearance, [0, 1, 0, 1]);
    this.garden = new MyGarden(this, this.gardenRowsColumns, this.gardenRowsColumns, this.petalAppearance1, this.petalAppearance2, this.stemAppearance, this.receptacleAppearance, this.leafAppearance);
    this.bee = new Mybee(this);

    this.myPanorama = new MyPanorama(this, this.panorama);
  }

  initLights() {
    this.lights[0].setPosition(15, 0, 5, 1);
    this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[0].enable();
    this.lights[0].update();

    this.lights[1].setPosition(0, 15, 5, 1);
    this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[1].enable();
    this.lights[1].update();
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

    //this.garden.updateGarden(this.gardenRowsColumns, this.gardenRowsColumns)
    // Draw axis
    if (this.displayAxis) this.axis.display();
    //if (this.displayReceptacle) this.receptacle.display();
    //if (this.displayStem) this.stem.display();
    //if (this.displayPetal) this.petal.display();
    //if (this.displayFlower) this.flower.display();
    //if (this.displayLeaf) this.leaf.display();
    if (this.displayGarden) this.garden.display();
    if (this.displayBee) this.bee.display();
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

  updateGarden(value) {
    // Update the garden's rows and columns based on the slider value
    this.garden.updateGarden(this.gardenRowsColumns, this.gardenRowsColumns); // Update the garden
    this.redraw(); // Redraw the scene
  }

  redraw() {
    this.display();
  }
}

