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
import { MyHive } from "./Pollen/MyHive.js";
import { MyPollen } from "./Pollen/MyPollen.js";
import { GrassField } from "./Grass/GrassField.js";

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

    this.lastUpdate = 0;

    // Load textures
    this.grassTexture1 = new CGFtexture(this, 'images/grass3.png');
    this.grassTexture2 = new CGFtexture(this, 'images/grass4.png');

    // Initialize the grass shader
    this.grassShader = new CGFshader(this.gl, 'shaders/grass.vert', 'shaders/grass.frag');

    // Set initial uniform values
    //this.grassShader.setUniformsValues({ windStrength: 0.1, randomness: 2.0, uSampler: 0 });
    this.grassShader.setUniformsValues({ windStrength: 0.2, randomness: 2.0 });
    this.grassShader.setUniformsValues({ grassTex0: 0, grassTex1: 1 }); // Uniforms for texture units

    // Initial time setup
    this.lastUpdateTime = Date.now();

    // Update every 50 milliseconds
    this.setUpdatePeriod(50);

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
  
    this.speedFactor = 1;
    this.scaleFactor = 1;

    //objects connected to MyInterface
    this.displayAxis = false;
    this.displayReceptacle = true;
    this.displayStem = true;
    this.displayPetal = true;
    this.displayFlower = true;
    this.displayLeaf = true;
    this.displayGarden = true;
    this.displayBee = true;
    this.displayRockSet = true;
    this.scaleFactor = 1;
    this.gardenRowsColumns = 5;
    this.cameraLock = false;

    this.setUpdatePeriod(30);
    this.previousTime = Date.now();

    this.enableTextures(true);

    this.texture = new CGFtexture(this, "images/terrain4.png");
    this.panorama = new CGFtexture(this, "images/garden5.jpeg");
    this.appearance = new CGFappearance(this);
    this.appearance.setTexture(this.texture);
    this.appearance.setTextureWrap('REPEAT', 'REPEAT');
    this.sphereAppearance = new CGFappearance(this);

    // GRASS
    this.grassMaterial1 = new CGFappearance(this);
    this.grassMaterial1.setAmbient(0.9, 0.8, 0.1, 1); 
    this.grassMaterial1.setDiffuse(0.1, 0.35, 0.1, 1); 
    this.grassMaterial1.setSpecular(0.1, 0.1, 0.1, 1); 
    this.grassMaterial1.setShininess(10.0); // Low shininess for a softer highlight
    this.grassMaterial1.loadTexture('images/grass3.png'); // grass texture image

    this.grassMaterial2 = new CGFappearance(this);
    this.grassMaterial2.setAmbient(0.9, 0.8, 0.1, 1); 
    this.grassMaterial2.setDiffuse(0.1, 0.35, 0.1, 1); 
    this.grassMaterial2.setSpecular(0.1, 0.1, 0.1, 1); 
    this.grassMaterial2.setShininess(10.0);
    this.grassMaterial2.loadTexture('images/grass4.png');

    //ROCK
    this.rockAppearance = new CGFappearance(this);
    this.rockAppearance.setAmbient(0.2, 0.2, 0.2, 1);  // Slightly brighter ambient reflectance
    this.rockAppearance.setDiffuse(0.6, 0.6, 0.6, 1);  // Moderate diffuse reflectance
    this.rockAppearance.setSpecular(0.3, 0.3, 0.3, 1); // Slightly higher specular reflectance
    this.rockAppearance.setShininess(20.0);            // more shininess, for rough surfaces
    this.rockAppearance.loadTexture('images/rock.jpg'); // rock texture image

    //PETALS
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

    //STEM
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

    //LEAF
    this.leafAppearance = new CGFappearance(this);
    this.leafAppearance.setAmbient(0.1, 0.3, 0.1, 1);
    this.leafAppearance.setDiffuse(0.2, 0.5, 0.2, 1);
    this.leafAppearance.setSpecular(0.1, 0.1, 0.1, 1)
    this.leafAppearance.setShininess(10.0);
    this.leafAppearance.loadTexture('images/greenleaf.jpg');
    this.leafAppearance.setTextureWrap('REPEAT', 'REPEAT');

    //BEE
    this.thoraxAppearence = new CGFappearance(this);
    this.thoraxAppearence.setAmbient(0.9, 0.8, 0.1, 1); 
    this.thoraxAppearence.setDiffuse(0.9, 0.8, 0.1, 1);
    this.thoraxAppearence.setSpecular(0.5, 0.5, 0.1, 1); // Slightly reflective
    this.thoraxAppearence.setShininess(10.0);
    this.thoraxAppearence.loadTexture('images/beetexture.png');
    this.thoraxAppearence.setTextureWrap('REPEAT', 'REPEAT');

    this.toraxAppearence2 = new CGFappearance(this);
    this.toraxAppearence2.setAmbient(0.9, 0.8, 0.1, 1); 
    this.toraxAppearence2.setDiffuse(0.9, 0.8, 0.1, 1);
    this.toraxAppearence2.setSpecular(0.5, 0.5, 0.1, 1); 
    this.toraxAppearence2.setShininess(10.0);
    this.toraxAppearence2.loadTexture('images/abdomentexture.jpg');
    this.toraxAppearence2.setTextureWrap('REPEAT', 'REPEAT');

    this.wingAppearence = new CGFappearance(this);
    this.wingAppearence.setAmbient(0.9, 0.8, 0.1, 0.1);
    this.wingAppearence.setDiffuse(0.9, 0.8, 0.1, 0.1); 
    this.wingAppearence.setSpecular(0.5, 0.5, 0.1, 0.1); 
    this.wingAppearence.setEmission(0.9, 0.8, 0.1, 0.1);
    this.wingAppearence.setShininess(10.0);
    this.wingAppearence.loadTexture('images/wing.jpg');
    this.wingAppearence.setTextureWrap('REPEAT', 'REPEAT');

    this.headAppearence = new CGFappearance(this);
    this.headAppearence.setAmbient(0.7, 0.7, 0.1, 1);
    this.headAppearence.setDiffuse(0.4, 0.4, 0.1, 1);
    this.headAppearence.setSpecular(0.5, 0.5, 0.1, 1);
    this.headAppearence.setShininess(10.0);
    this.headAppearence.loadTexture('images/head.jpg');
    this.headAppearence.setTextureWrap('REPEAT', 'REPEAT');

    this.eyeAppearence = new CGFappearance(this);
    this.eyeAppearence.setAmbient(0.1, 0.1, 0.1, 1); // Bright, to reflect more ambient light
    this.eyeAppearence.setDiffuse(0.1, 0.1, 0.1, 1); 
    this.eyeAppearence.setSpecular(0.5, 0.5, 0.5, 1); 
    this.eyeAppearence.setShininess(10.0);
    this.eyeAppearence.loadTexture('images/eye.png');
    this.eyeAppearence.setTextureWrap('REPEAT', 'REPEAT');

    this.stingerAppearence = new CGFappearance(this);
    this.stingerAppearence.setAmbient(0, 0, 0, 1);
    this.stingerAppearence.setDiffuse(0, 0, 0, 1);
    this.stingerAppearence.setSpecular(0.5, 0.5, 0.5, 1);
    this.stingerAppearence.setShininess(10.0);

    this.woodappearance = new CGFappearance(this);
    this.woodappearance.setAmbient(0.2, 0.2, 0.2, 1);
    this.woodappearance.setDiffuse(0.6, 0.4, 0.2, 1);
    this.woodappearance.setSpecular(0.1, 0.1, 0.1, 1);
    this.woodappearance.setShininess(10); 
    this.woodappearance.loadTexture('images/wood.png'); 
    this.woodappearance.setTextureWrap('REPEAT', 'REPEAT');

    this.honeyappearance = new CGFappearance(this);
    this.honeyappearance.setAmbient(0.4, 0.2, 0, 1); 
    this.honeyappearance.setDiffuse(0.8, 0.4, 0, 1); 
    this.honeyappearance.setSpecular(0.5, 0.3, 0, 1); 
    this.honeyappearance.setShininess(10);
    this.honeyappearance.loadTexture('images/honey.png');
    this.honeyappearance.setTextureWrap('REPEAT', 'REPEAT');

    this.polenappearance = new CGFappearance(this);
    this.polenappearance.setAmbient(0.4, 0.2, 0, 1); 
    this.polenappearance.setDiffuse(0.8, 0.4, 0, 1); 
    this.polenappearance.setSpecular(0.5, 0.3, 0, 1); 
    this.polenappearance.setShininess(10); //glossy effect
    this.polenappearance.loadTexture('images/pollen.png'); //honey texture
    this.polenappearance.setTextureWrap('REPEAT', 'REPEAT'); //texture to cover the object


    //SCENE OBJECTS
    this.axis = new CGFaxis(this);
    this.plane = new MyPlane(this,30);
    this.receptacle = new MyReceptacle(this, 1, 30, 30, this.receptacleAppearance);
    this.stem = new MyStem(this, 0.5, 0.5, 1, 30, 30, this.stemAppearance, [0, 1, 0, 1]);
    this.petal = new MyPetal(this, 100, this.petalAppearance1, [1, 0, 0, 1]);
    this.flower = new MyFlower(this, 3.5, 5, [1, 0, 0, 1], 1, [1, 0, 0, 1], 0.5, 5, [0, 1, 0, 1], [0, 1, 0, 1], 100, 150, 5, 30, 30, this.petalAppearance1, this.stemAppearance, this.receptacleAppearance, this.leafAppearance, this.polenappearance);
    this.leaf = new MyLeaf(this, 1, 1, 1, 3, this.leafAppearance, [0, 1, 0, 1]);
    this.garden = new MyGarden(this, this.gardenRowsColumns, this.gardenRowsColumns, this.petalAppearance1, this.petalAppearance2, this.stemAppearance, this.receptacleAppearance, this.leafAppearance, this.polenappearance);
    this.bee = new Mybee(this, this.headAppearence, this.eyeAppearence, this.thoraxAppearence, this.toraxAppearence2, this.wingAppearence, this.stingerAppearence, this.polenappearance);

    this.myPanorama = new MyPanorama(this, this.panorama);
    this.rockSet = new MyRockSet(this, 15, 3, this.rockAppearance);

    this.grassField = new GrassField(this, 50, 50, 4000, this.grassMaterial1, this.grassMaterial2);
    this.hive = new MyHive(this, this.woodappearance, this.honeyappearance, this.polenappearance);
    this.pollen = new MyPollen(this, this.polenappearance);
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
      vec3.fromValues(0, 6, -15),
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
    // Clear image and depth buffer everytime we update the scene
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

    // Initialize Model-View matrix as identity (no transformation
    this.updateProjectionMatrix();
    this.loadIdentity();
    // Apply transformations corresponding to the camera position relative to the origin
    this.applyViewMatrix();

    this.setGlobalAmbientLight(1, 1, 1, 1);

    // UPDATE LIGHTS
    this.lights[0].update();
    this.lights[1].update();


    this.setUpdatePeriod(50);

    // Draw axis
    if (this.displayAxis) this.axis.display();

    //RockSet
    if (this.displayRockSet) this.rockSet.display();
  
    //Garden
    if (this.displayGarden) this.garden.display();

    //Bee
    if (this.displayBee) this.bee.display();
    this.hive.display();

  
    //Apply grass shader
    this.setActiveShader(this.grassShader);

    // Grass field
    this.grassField.display();

    // Restore default shader
    this.setActiveShader(this.defaultShader);

    this.pushMatrix();
    this.appearance.apply();
    this.translate(0,-100,0);
    this.scale(400,400,400);
    this.rotate(-Math.PI/2.0,1,0,0);
    this.plane.display();
    this.popMatrix();
    this.myPanorama.display();

  }

  updateGarden(value) {
    // Update the garden's rows and columns based on the slider value
    this.garden.updateGarden(this.gardenRowsColumns, this.gardenRowsColumns); // Update the garden
    this.redraw(); // Redraw the scene
  }

  redraw() {
    this.display();
  }

  checkKeys(){
    if (this.gui.isKeyPressed("KeyW")) {
      if(!this.bee.returnToHive)
        this.bee.accelerate(1);
    }
    if (this.gui.isKeyPressed("KeyS")) {
      if(!this.bee.returnToHive)
        this.bee.accelerate(-1);
    }
    if (this.gui.isKeyPressed("KeyA")) {
      if(!this.bee.returnToHive)
        this.bee.turn(Math.PI/32);
    }
    if (this.gui.isKeyPressed("KeyD")){
      if(!this.bee.returnToHive)
        this.bee.turn(-Math.PI/32);
    }
    if (this.gui.isKeyPressed("KeyR")){
      this.bee.reset();
      this.resetCamera();
      for(let pollen of this.garden.pollenAbsoluteOffsets){
        pollen.collected = false;
      }
    }
    if (this.gui.isKeyPressed("KeyY")){
      this.cameraLock = !this.cameraLock;
    }
    if(this.gui.isKeyPressed("KeyP")){
      if(!this.bee.returnToHive){
        for(let pollen of this.garden.pollenAbsoluteOffsets){
          if(this.bee.checkColision(pollen) && !this.bee.hasPollen){
            this.bee.hasPollen = true;
            pollen.flower.hasPollen = false;
            pollen.collected = true;
            this.bee.speed = this.oldSpeed;
          }
        }
        this.bee.isDescending = false;
        this.bee.isAscending = !this.bee.isAscending;        
      }
    }
    if(this.gui.isKeyPressed("KeyF")){
      if(!this.bee.returnToHive){
        this.bee.isDescending = !this.bee.isDescending;
        this.bee.isAscending = false;        
      }
    }
    if(this.gui.isKeyPressed("KeyO")){
      if(this.bee.hasPollen){
        this.bee.isAscending = false;
        this.bee.isDescending = false;
        this.bee.returnToHive = true;
      }
    }
  }

  update(t){
    
    console.log("Update called");
    if (this.lastUpdate === 0) {
        this.lastUpdate = t;
    }
    let deltaTime = (t - this.lastUpdate) / 1000.0; //time to seconds
    this.lastUpdate = t;


    this.checkKeys();
    if(this.cameraLock){
      this.updateCamera();
    }

    // update bee animation
    if (this.displayBee) {
      for(let pollen of this.garden.pollenAbsoluteOffsets){
        if(this.bee.checkColision(pollen) && !this.bee.hasPollen){
          if(this.bee.speed != 0)
            this.oldSpeed = this.bee.speed;
          this.bee.stop();
        }
      }

      if(this.bee.deliverPolen){
        this.bee.deliverPolen = false;
        this.bee.hasPollen = false;
        this.bee.returnToHive = false;
        this.hive.pollenNum++;
      }

      this.bee.update((t - this.lastUpdate)+40 / 1000.0);
      // update the bee's wings
      this.bee.wing1.update(deltaTime);
      this.bee.wing2.update(deltaTime);
      this.bee.wing3.update(deltaTime);
      this.bee.wing4.update(deltaTime);
    }

    //animate the grass
    this.grassShader.setUniformsValues({ timeFactor: t / 500 % 100 });
  }

  

  normalizeVector(vector) {
    const length = Math.sqrt(vector[0] * vector[0] + vector[1] * vector[1] + vector[2] * vector[2]);
    return [vector[0] / length, vector[1] / length, vector[2] / length];
  }

  updateCamera(){
    const normalized = this.normalizeVector(vec3.fromValues(-Math.sin(this.bee.orientation), 0, -Math.cos(this.bee.orientation)));

    this.camera.setPosition(vec3.fromValues(
      this.bee.position[0] + normalized[0] * 15,
      this.bee.stableY + 6,
      this.bee.position[2] + normalized[2] * 15, 
    ));


    this.camera.setTarget(vec3.fromValues(
      this.bee.position[0],
      this.bee.stableY,
      this.bee.position[2],
    ));
  }

  resetCamera(){
    this.camera.setPosition(vec3.fromValues(0, 6, -15));
    this.camera.setTarget(vec3.fromValues(0, 0, 0));
  }
  
}

