import { CGFappearance, CGFobject } from "../../lib/CGF.js";
import { BeeHead } from "./BeeHead.js";
import { BeeEye } from "./BeeEye.js";
import { BeeAntenna } from "./BeeAntenna.js";
import { BeeTorax } from "./BeeTorax.js";
import { BeeAbdomen } from "./BeeAbdomen.js";
import { BeeLeg } from "./BeeLeg.js";
import { BeeWing } from "./BeeWing.js";
import { BeeStinger } from "./BeeStinger.js";
import { MyEllipsoid } from "../shapes/MyEllipsoid.js";
import { MyPollen } from "../Pollen/MyPollen.js";

/**
 * MyBee
 * @constructor
 * @param scene - Reference to MyScene object
 * @param headMaterial - Material for the bee's head
 * @param eyeMaterial - Material for the bee's eyes
 * @param thoraxMaterial - Material for the bee's thorax
 * @param torsoMaterial - Material for the bee's torso
 * @param wingMaterial - Material for the bee's wings
 * @param stingerMaterial - Material for the bee's stinger
 * @param pollenAppearance - Appearance for the pollen object
 *
 * Represents a bee.
 * This class initializes the bee with materials for its head, eyes, thorax, torso, wings, and stinger.
 * The bee's body parts are represented by separate objects.
 * The bee can move, turn, accelerate, and stop.
 * The bee can also oscillate vertically and display pollen.
 * The bee can check for collisions with objects.
 * The bee can return to the hive and deliver pollen, in a parabolic trajectory.
 * The bee can also ascend and descend in a parabolic trajectory.
 * 
 */

export class Mybee extends CGFobject {
    constructor(scene, headMaterial, eyeMaterial, thoraxMaterial, torsoMaterial, wingMaterial, stingerMaterial, pollenAppearance) {
        super(scene);
        this.speedCap = 100 * this.scene.speedFactor;
        this.position = vec3.fromValues(0, 0, 0);
        this.orientation = 0;
        this.velocity = vec3.fromValues(0, 0, 0);
        this.speed = 0;
        this.headMaterial = headMaterial;
        this.eyeMaterial = eyeMaterial;
        this.thoraxMaterial = thoraxMaterial;
        this.torsoMaterial = torsoMaterial;
        this.wingMaterial = wingMaterial;
        this.stingerMaterial = stingerMaterial;
        this.pollenAppearance = pollenAppearance;
        this.initMaterials();
        this.head = new BeeHead(scene, 20, 10, this.headMaterial);
        this.eye1 = new BeeEye(scene, this.eyeMaterial);
        this.eye2 = new BeeEye(scene, this.eyeMaterial);
        this.antenna1 = new BeeAntenna(scene, this.black);
        this.antenna2 = new BeeAntenna(scene, this.black);
        this.abdomen = new BeeAbdomen(scene, this.torsoMaterial);
        this.torax = new BeeTorax(scene, this.thoraxMaterial);
        this.leg1 = new BeeLeg(scene, true);
        this.leg2 = new BeeLeg(scene, false);
        this.leg3 = new BeeLeg(scene, true);
        this.leg4 = new BeeLeg(scene, false);
        this.leg5 = new BeeLeg(scene, true);
        this.leg6 = new BeeLeg(scene, false);
        this.wing1 = new BeeWing(scene, true, this.wingMaterial);
        this.wing2 = new BeeWing(scene, false, this.wingMaterial);
        this.wing3 = new BeeWing(scene, true, this.wingMaterial);
        this.wing4 = new BeeWing(scene, false, this.wingMaterial);
        this.stinger = new BeeStinger(scene, 1, 0.5, 5, this.stingerMaterial);
        this.tooth1 = new MyEllipsoid(scene, 10, 5, .2, .2, .2);
        this.tooth2 = new MyEllipsoid(scene, 10, 5, .2, .2, .2);
        this.pollen = new MyPollen(this.scene, this.pollenAppearance);

        this.time = 0; // Add this line
        this.isDescending = false;
        this.stableY = 0;
        this.hasPollen = false;
        this.isAscending = false;
        this.hivePos = vec3.fromValues(0.6, -77.5, -43);
        this.returnToHive = false;
        this.deliverPolen = false;
    }

    initMaterials() {
        this.black = new CGFappearance(this.scene);
        this.black.setAmbient(0, 0, 0, 1);
        this.black.setDiffuse(0, 0, 0, 1);
    }

    oscillatePosition() {
        this.verticalOscillation = 3 + Math.sin(this.time * 2 * Math.PI) * 0.5; // oscillation amplitude of 0.5
    }

    display() {
        this.scene.pushMatrix();
        this.scene.translate(this.position[0], this.position[1], this.position[2]);
        this.scene.rotate(this.orientation, 0, 1, 0);
        this.scene.scale(this.scene.scaleFactor, this.scene.scaleFactor, this.scene.scaleFactor);

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
        this.scene.rotate(-Math.PI / 4, 1, 0, 0);
        this.antenna1.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-.4, .85, .1);
        this.scene.scale(2, 2, 2);
        this.scene.rotate(-Math.PI / 4, 1, 0, 0);
        this.antenna2.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, 0.5, -1.8);
        this.scene.scale(1, 1.1, 1.4);
        this.scene.rotate(-Math.PI / 2, 0, 0, 1);
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        this.torax.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, -0.5, -3.7);
        this.scene.rotate(-Math.PI / 2, 0, 1, 0);
        this.scene.rotate(-Math.PI / 3, 0, 0, 1);
        this.scene.scale(1.2, 1.4, 1.2);
        this.torax.display();
        this.scene.popMatrix();

        this.black.apply();

        this.scene.pushMatrix();
        this.scene.translate(0.5, 0.2, -1.5);
        this.scene.rotate(-Math.PI / 4, 1, 0, 0);
        this.scene.rotate(Math.PI / 3, 0, 1, 0);
        this.leg1.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.5, .2, -1.5);
        this.scene.rotate(-Math.PI / 4, 1, 0, 0);
        this.scene.rotate(-Math.PI / 3, 0, 1, 0);
        this.leg2.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(.5, -.5, -3);
        this.scene.rotate(-Math.PI / 5, 1, 0, 0);
        this.scene.rotate(Math.PI / 5, 0, 1, 0);
        this.leg3.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-.5, -.5, -3);
        this.scene.rotate(-Math.PI / 5, 1, 0, 0);
        this.scene.rotate(-Math.PI / 5, 0, 1, 0);
        this.leg4.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(.5, -.7, -4);
        this.scene.rotate(-Math.PI / 6, 1, 0, 0);
        this.scene.rotate(Math.PI / 5, 0, 1, 0);
        this.leg5.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-.5, -.7, -4);
        this.scene.rotate(-Math.PI / 6, 1, 0, 0);
        this.scene.rotate(-Math.PI / 5, 0, 1, 0);
        this.scene.scale(1, 1, 1.2);
        this.leg6.display();
        this.scene.popMatrix();


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

        this.scene.pushMatrix();
        this.scene.translate(0, -0.7, 0.3);
        this.scene.translate(0, -0.5, -5);
        this.scene.rotate(Math.PI - Math.PI / 5, 1, 0, 0);
        this.stinger.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, -1.2, 0.8);
        this.scene.scale(1, 3, 1);
        this.tooth1.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.3, -1.2, 0.8);
        this.scene.scale(1, 3, 1);
        this.tooth2.display();
        this.scene.popMatrix();

        if (this.hasPollen) {
            this.scene.pushMatrix();
            this.scene.translate(0, -2, -1.5);
            this.scene.rotate(Math.PI / 4, 1, 0, 0);
            this.pollen.display()
            this.scene.popMatrix();
        }

        this.scene.popMatrix();
    }

    update(t) {
        const T_peak = 5000; // Time to reach peak height in ms
        const totalTime = T_peak * 2; // Total time for the parabolic motion
        const amplitude = 10; // Amplitude of the parabolic motion

        // Calculate elapsed time
        let elapsedTime = this.time % totalTime;

        // Calculate parabolic modulation factor
        let modulation;
        if (elapsedTime <= T_peak) {
            modulation = 1 - Math.pow((elapsedTime / T_peak - 1), 2);
        } else {
            let t_descending = elapsedTime - T_peak;
            modulation = 1 - Math.pow((t_descending / T_peak - 1), 2);
        }

        if (this.returnToHive) {
            this.speed = 10;
            let direction = vec3.create();
            vec3.subtract(direction, this.hivePos, this.position);
            let distance = vec3.length(direction);
            vec3.normalize(direction, direction);
            let angle = Math.atan2(direction[0], direction[2]);
            this.orientation = angle;

            this.velocity[0] = this.speed * direction[0];
            this.velocity[1] = this.speed *10 * direction[1] * modulation * amplitude;
            this.velocity[2] = this.speed * direction[2];

            this.position[0] += this.velocity[0] * t;
            this.position[1] += this.velocity[1] * t;
            this.stableY = this.position[1];
            this.position[2] += this.velocity[2] * t;

            if (distance <= this.speed * t) {
                this.position = vec3.clone(this.hivePos);
                this.returnToHive = false;
                this.speed = 0;
                this.deliverPolen = true;
            }
        } else {
            this.time += t;
            this.velocity[0] = this.speed * Math.sin(this.orientation);
            this.velocity[2] = this.speed * Math.cos(this.orientation);

            this.velocity[1] = this.speed * modulation * amplitude; // Apply parabolic motion to velocity[1]

            this.position[0] += this.velocity[0] * t;
            this.position[1] += this.velocity[1] * t;
            this.position[2] += this.velocity[2] * t;

            if (this.isDescending) {
                if (this.stableY > -95) {
                    this.position[1]--;
                    this.stableY--;
                } else {
                    this.isDescending = false;
                }
            } else if (this.isAscending) {
                if (this.stableY < 0) {
                    this.position[1]++;
                    this.stableY++;
                } else {
                    this.isAscending = false;
                }
            } else {
                this.oscillatePosition();
                this.position[1] = this.stableY + this.verticalOscillation;
            }
        }
    }

    turn(v) {
        this.orientation += v * this.scene.speedFactor;
    }

    accelerate(v) {
        this.speed += v * this.scene.speedFactor;
        if (this.speed >= this.speedCap) this.speed = this.speedCap;
        else if (this.speed <= 0) this.speed = 0;
    }

    stop() {
        this.speed = 0;
        this.isDescending = false;
        this.isAscending = false;
    }

    reset() {
        this.position = vec3.fromValues(0, 0, 0);
        this.orientation = 0;
        this.velocity = vec3.fromValues(0, 0, 0);
        this.speed = 0;
        this.stableY = 0;
        this.isDescending = false;
        this.hasPollen = false;
        this.returnToHive = false;
    }

    checkColision(object) {
        let distance = Math.sqrt(Math.pow(this.position[0] - object.x, 2) + Math.pow(this.position[1] - object.y, 2) + Math.pow(this.position[2] - object.z, 2));

        if (distance <= 4 && !object.collected)
            return true;
        return false;
    }
}

