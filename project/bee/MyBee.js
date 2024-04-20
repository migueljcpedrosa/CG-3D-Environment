import { CGFappearance, CGFobject } from "../../lib/CGF.js";
import { BeeHead } from "./BeeHead.js";
import { BeeEye } from "./BeeEye.js";
import { BeeAntenna } from "./BeeAntenna.js";
import { BeeTorax } from "./BeeTorax.js";
import { BeeAbdomen } from "./BeeAbdomen.js";
import { BeeLeg } from "./BeeLeg.js";
import { BeeWing } from "./BeeWing.js";

export class Mybee extends CGFobject{
    constructor(scene, torsoMaterial){
        super(scene);
        this.torsoMaterial = torsoMaterial;
        this.initMaterials();
        this.head = new BeeHead(scene, 20, 10, this.yellow);
        this.eye1 = new BeeEye(scene, this.black);
        this.eye2 = new BeeEye(scene, this.black);
        this.antenna1 = new BeeAntenna(scene, this.black);
        this.antenna2 = new BeeAntenna(scene, this.black);
        this.abdomen = new BeeAbdomen(scene, this.yellow);
        this.torax = new BeeTorax(scene, this.torsoMaterial);
        this.leg1 = new BeeLeg(scene, true);
        this.leg2 = new BeeLeg(scene, false);
        this.leg3 = new BeeLeg(scene, true);
        this.leg4 = new BeeLeg(scene, false);
        this.leg5 = new BeeLeg(scene, true);
        this.leg6 = new BeeLeg(scene, false);
        this.wing1 = new BeeWing(scene, true);
        this.wing2 = new BeeWing(scene, false);
        this.wing3 = new BeeWing(scene, true);
        this.wing4 = new BeeWing(scene, false);
    }

    initMaterials(){
        this.yellow = new CGFappearance(this.scene);
        this.yellow.setAmbient(1, 1, 0, 1);
        this.yellow.setDiffuse(1, 1, 0, 1);

        this.black = new CGFappearance(this.scene);
        this.black.setAmbient(0, 0, 0, 1);
        this.black.setDiffuse(0, 0, 0, 1);

        this.cyan = new CGFappearance(this.scene);
        this.cyan.setAmbient(0, 1, 1, .1);
        this.cyan.setDiffuse(0, 1, 1, .1);
        this.cyan.setSpecular(0, 1, 1, .1);
        this.cyan.setEmission(0, 1, 1, .1);
    }

    display(){
        this.head.display();

        this.scene.pushMatrix();
        this.scene.translate(.5, .35, .7);  
        this.scene.translate(0, -0.1, 0);   
        this.scene.scale(1.7, 1, 1);
        this.eye1.display();
        this.scene.popMatrix(); 

        this.scene.pushMatrix();
        this.scene.translate(-.5, .35, .7);
        this.scene.translate(0, -0.1, 0);   
        this.scene.scale(-1, 1, 1);
        this.scene.scale(1.7, 1, 1);
        this.eye2.display();
        this.scene.popMatrix(); 

        this.scene.pushMatrix();
        this.scene.translate(.4, .85, .1);
        this.scene.scale(2, 2, 2);
        this.scene.rotate(-Math.PI/4, 1, 0, 0);
        this.antenna1.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-.4, .85, .1);
        this.scene.scale(2, 2, 2);
        this.scene.rotate(-Math.PI/4, 1, 0, 0);
        this.antenna2.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, 0.5, -1.8);
        this.scene.scale(1, 1.1, 1.4);
        this.scene.rotate(-Math.PI/2, 0, 0, 1);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.torax.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, -0.5, -3.7);
        this.scene.scale(1, 1.2, 1.2);
        this.abdomen.display();
        this.scene.popMatrix();

        this.black.apply();
        
        this.scene.pushMatrix();
        this.scene.translate(0.5, 0.2, -1.5);
        this.scene.rotate(-Math.PI/4, 1, 0, 0);
        this.scene.rotate(Math.PI/3, 0, 1, 0);
        this.leg1.display();
        this.scene.popMatrix();
        
        this.scene.pushMatrix();
        this.scene.translate(-0.5, .2, -1.5);
        this.scene.rotate(-Math.PI/4, 1, 0, 0);
        this.scene.rotate(-Math.PI/3, 0, 1, 0);
        this.leg2.display();
        this.scene.popMatrix();
        
        this.scene.pushMatrix();
        this.scene.translate(.5, -.5, -3);
        this.scene.rotate(-Math.PI/5, 1, 0, 0);
        this.scene.rotate(Math.PI/5, 0, 1, 0);
        this.leg3.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-.5, -.5, -3);
        this.scene.rotate(-Math.PI/5, 1, 0, 0);
        this.scene.rotate(-Math.PI/5, 0, 1, 0);
        this.leg4.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(.5, -.7, -4);
        this.scene.rotate(-Math.PI/6, 1, 0, 0);
        this.scene.rotate(Math.PI/5, 0, 1, 0);
        this.leg5.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-.5, -.7, -4);
        this.scene.rotate(-Math.PI/6, 1, 0, 0);
        this.scene.rotate(-Math.PI/5, 0, 1, 0);
        this.scene.scale(1, 1, 1.2);
        this.leg6.display();
        this.scene.popMatrix();

        this.cyan.apply();

        this.scene.pushMatrix();
        this.scene.translate(.5, 1.45, -1.6);
        this.scene.scale(0.7, 1, 1);
        this.wing1.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-.5, 1.45, -1.6);
        this.scene.scale(0.7, 1, 1);
        this.wing2.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(.7, 1.2, -2.3);
        this.scene.scale(0.56, .8, .8);
        this.wing3.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-.7, 1.2, -2.3);
        this.scene.scale(0.56, .8, .8);
        this.wing4.display();
        this.scene.popMatrix();
    }
}