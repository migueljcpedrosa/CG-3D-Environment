import { CGFappearance, CGFobject } from "../lib/CGF.js";
import { MySphere } from "./shapes/MySphere.js";

/**
* MyPanorama
* @constructor
* @param scene - Reference to MyScene object
* @param texture - Texture to apply to the panorama
* Represents a panorama object.
* This class initializes the panorama with a specified texture.
*/

export class MyPanorama extends CGFobject{
    constructor(scene, texture){
        super(scene);
        this.texture = texture;
        this.sphere = new MySphere(scene, 10, 5);
        this.initMaterial();
    }

    initMaterial(){
        this.panorama = new CGFappearance(this.scene);
        this.panorama.setEmission(1, 1, 1, 1);
        this.panorama.setTexture(this.texture);
        this.panorama.setTextureWrap('REPEPEAT', 'REPEAT');
    }

    display(){
        this.scene.pushMatrix();
        this.scene.translate(this.scene.camera.position[0], this.scene.camera.position[1], this.scene.camera.position[2]);
        this.scene.scale(200, 200, 200);
        this.panorama.apply();
        this.sphere.display();
        this.scene.popMatrix();
    }
}