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

import { MyRockSet } from "./Rocks/MyRockSet.js";

import { MyPollen } from "./Pollen/MyPollen.js";
import { MyCube } from "./shapes/MyCube.js";
import { MyHive } from "./Pollen/MyHive.js";

/**
 * MyScene
 * @constructor
 */
export class MyScene extends CGFscene {
  constructor() {
    super();
    this.lastUpdate = 0;
  }
  init(application) {
    super.init(application);

    this.setUpdatePeriod(50); // Update every 50 milliseconds

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
    //changed here
    this.displayRockSet = true;
    this.displayGarden = true;
    this.displayBee = true;
    this.scaleFactor = 1;
    this.gardenRowsColumns = 5;

    this.displayPollen = true;

    this.enableTextures(true);

    this.texture = new CGFtexture(this, "images/terrain.jpg");
    this.panorama = new CGFtexture(this, "images/panorama4.jpg");
    this.appearance = new CGFappearance(this);
    this.appearance.setTexture(this.texture);
    this.appearance.setTextureWrap('REPEAT', 'REPEAT');
    this.sphereAppearance = new CGFappearance(this);

    this.rockAppearance1 = new CGFappearance(this);
    this.rockAppearance1.setAmbient(0.2, 0.2, 0.2, 1);  // Slightly brighter ambient reflectance
    this.rockAppearance1.setDiffuse(0.6, 0.6, 0.6, 1);  // Moderate diffuse reflectance
    this.rockAppearance1.setSpecular(0.3, 0.3, 0.3, 1); // Slightly higher specular reflectance
    this.rockAppearance1.setShininess(20.0);            // more shininess, for rough surfaces
    this.rockAppearance1.loadTexture('images/rock.jpg'); // rock texture image

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

    this.thoraxappearance = new CGFappearance(this);
    this.thoraxappearance.setAmbient(0.9, 0.8, 0.1, 1); // Bright, to reflect more ambient light
    this.thoraxappearance.setDiffuse(0.9, 0.8, 0.1, 1); // Primary color of the texture, assuming yellow is dominant
    this.thoraxappearance.setSpecular(0.5, 0.5, 0.1, 1); // Slightly reflective, giving a sheen to the bee's thorax    
    this.thoraxappearance.setShininess(10.0);
    this.thoraxappearance.loadTexture('images/beetexture.png');
    this.thoraxappearance.setTextureWrap('REPEAT', 'REPEAT');

    this.toraxappearance2 = new CGFappearance(this);
    this.toraxappearance2.setAmbient(0.9, 0.8, 0.1, 1); // Bright, to reflect more ambient light
    this.toraxappearance2.setDiffuse(0.9, 0.8, 0.1, 1); // Primary color of the texture, assuming yellow is dominant
    this.toraxappearance2.setSpecular(0.5, 0.5, 0.1, 1); // Slightly reflective, giving a sheen to the bee's thorax    
    this.toraxappearance2.setShininess(10.0);
    this.toraxappearance2.loadTexture('images/abdomentexture.jpg');
    this.toraxappearance2.setTextureWrap('REPEAT', 'REPEAT');

    this.wingappearance = new CGFappearance(this);
    this.wingappearance.setAmbient(0.9, 0.8, 0.1, 0.1); // Bright, to reflect more ambient light
    this.wingappearance.setDiffuse(0.9, 0.8, 0.1, 0.1); // Primary color of the texture, assuming yellow is dominant
    this.wingappearance.setSpecular(0.5, 0.5, 0.1, 0.1); // Slightly reflective, giving a sheen to the bee's thorax 
    this.wingappearance.setEmission(0.9, 0.8, 0.1, 0.1);
    this.wingappearance.setShininess(10.0);
    this.wingappearance.loadTexture('images/wing.jpg');
    this.wingappearance.setTextureWrap('REPEAT', 'REPEAT');

    this.headappearance = new CGFappearance(this);
    this.headappearance.setAmbient(0.7, 0.7, 0.1, 1); // Bright, to reflect more ambient light
    this.headappearance.setDiffuse(0.4, 0.4, 0.1, 1); // Primary color of the texture, assuming yellow is dominant
    this.headappearance.setSpecular(0.5, 0.5, 0.1, 1); // Slightly reflective, giving a sheen to the bee's thorax
    this.headappearance.setShininess(10.0);
    this.headappearance.loadTexture('images/head.jpg');
    this.headappearance.setTextureWrap('REPEAT', 'REPEAT');

    this.eyeappearance = new CGFappearance(this);
    this.eyeappearance.setAmbient(0.1, 0.1, 0.1, 1); // Bright, to reflect more ambient light
    this.eyeappearance.setDiffuse(0.1, 0.1, 0.1, 1); 
    this.eyeappearance.setSpecular(0.5, 0.5, 0.5, 1); 
    this.eyeappearance.setShininess(10.0);
    this.eyeappearance.loadTexture('images/eye.png');
    this.eyeappearance.setTextureWrap('REPEAT', 'REPEAT');

    this.stingerappearance = new CGFappearance(this);
    this.stingerappearance.setAmbient(0, 0, 0, 1); // Bright, to reflect more ambient light
    this.stingerappearance.setDiffuse(0, 0, 0, 1);
    this.stingerappearance.setSpecular(0.5, 0.5, 0.5, 1);
    this.stingerappearance.setShininess(10.0);

    this.woodappearance = new CGFappearance(this);
    this.woodappearance.setAmbient(0.2, 0.2, 0.2, 1); // Dim ambient light to simulate indirect lighting
    this.woodappearance.setDiffuse(0.6, 0.4, 0.2, 1); // Adjust diffuse to simulate wood color
    this.woodappearance.setSpecular(0.1, 0.1, 0.1, 1); // Reduce specular to make it less shiny
    this.woodappearance.setShininess(10); // Lower shininess for a more rough surface
    this.woodappearance.loadTexture('images/wood.png'); // Load wood texture
    this.woodappearance.setTextureWrap('REPEAT', 'REPEAT'); // Repeat texture to cover the object

    this.honeyappearance = new CGFappearance(this);
    this.honeyappearance.setAmbient(0.4, 0.2, 0, 1); // Adjust ambient color to a warm tone
    this.honeyappearance.setDiffuse(0.8, 0.4, 0, 1); // Adjust diffuse color to a deeper tone of honey
    this.honeyappearance.setSpecular(0.5, 0.3, 0, 1); // Adjust specular color to resemble honey
    this.honeyappearance.setShininess(10); // Set a moderate shininess for a glossy effect
    this.honeyappearance.loadTexture('images/honey.png'); // Load honey texture
    this.honeyappearance.setTextureWrap('REPEAT', 'REPEAT'); // Repeat texture to cover the object

    this.polenappearance = new CGFappearance(this);
    this.polenappearance.setAmbient(0.4, 0.2, 0, 1); // Adjust ambient color to a warm tone
    this.polenappearance.setDiffuse(0.8, 0.4, 0, 1); // Adjust diffuse color to a deeper tone of honey
    this.polenappearance.setSpecular(0.5, 0.3, 0, 1); // Adjust specular color to resemble honey
    this.polenappearance.setShininess(10); // Set a moderate shininess for a glossy effect
    this.polenappearance.loadTexture('images/pollen.png'); // Load honey texture
    this.polenappearance.setTextureWrap('REPEAT', 'REPEAT'); // Repeat texture to cover the object
    
    //Initialize scene objects
    this.axis = new CGFaxis(this);
    this.plane = new MyPlane(this,30);
    this.receptacle = new MyReceptacle(this, 1, 30, 30, this.receptacleAppearance);
    this.stem = new MyStem(this, 0.5, 0.5, 1, 30, 30, this.stemAppearance, [0, 1, 0, 1]);
    this.petal = new MyPetal(this, 100, this.petalAppearance1, [1, 0, 0, 1]);
    this.flower = new MyFlower(this, 3.5, 5, [1, 0, 0, 1], 1, [1, 0, 0, 1], 0.5, 5, [0, 1, 0, 1], [0, 1, 0, 1], 100, 150, 5, 30, 30, this.petalAppearance1, this.stemAppearance, this.receptacleAppearance, this.leafAppearance);
    this.leaf = new MyLeaf(this, 1, 1, 1, 3, this.leafAppearance, [0, 1, 0, 1]);
    this.garden = new MyGarden(this, this.gardenRowsColumns, this.gardenRowsColumns, this.petalAppearance1, this.petalAppearance2, this.stemAppearance, this.receptacleAppearance, this.leafAppearance);
    this.bee = new Mybee(this, this.headappearance, this.eyeappearance, this.thoraxappearance, this.toraxappearance2, this.wingappearance, this.stingerappearance);

    this.myPanorama = new MyPanorama(this, this.panorama);
    this.rockSet = new MyRockSet(this, 15, 3, this.rockAppearance1);

    this.pollen = new MyPollen(this, this.polenappearance);
    this.cube = new MyCube(this, this.woodappearance);
    this.hive = new MyHive(this, this.woodappearance, this.honeyappearance);
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

  //for bee and wings animation
  update(currTime) {
    console.log("Update called");
    if (this.lastUpdate === 0) {
        this.lastUpdate = currTime; // to avoid large deltaTime on the first frame
    }
    let deltaTime = (currTime - this.lastUpdate) / 1000.0; // to convert time to seconds
    this.lastUpdate = currTime;

    // update bee animation
    if (this.displayBee) {
        this.bee.update(deltaTime);
        // update the bee's wings
        this.bee.wing1.update(deltaTime);
        this.bee.wing2.update(deltaTime);
        this.bee.wing3.update(deltaTime);
        this.bee.wing4.update(deltaTime);
    }
    
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


    this.setUpdatePeriod(50);


    //this.garden.updateGarden(this.gardenRowsColumns, this.gardenRowsColumns)
    // Draw axis
    if (this.displayAxis) this.axis.display();
    //if (this.displayReceptacle) this.receptacle.display();
    //if (this.displayStem) this.stem.display();
    //if (this.displayPetal) this.petal.display();
    //if (this.displayFlower) this.flower.display();
    //if (this.displayLeaf) this.leaf.display();

    //if (this.displayRockSet) this.rockSet.display();
  
    if (this.displayGarden) this.garden.display();
    //if (this.displayBee) this.bee.display();

    if (this.displayPollen) this.pollen.display();

    //this.cube.display();
    //this.hive.display();
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

