import { CGFobject } from '../lib/CGF.js';
import { MyQuad } from './MyQuad.js';
/**
 * MyUnitCubeQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCubeQuad extends CGFobject {
    constructor(scene, textureTop, textureFront, textureRight, textureLeft, textureBack, textureBottom) {
        super(scene);
        this.quad = new MyQuad(scene);
        this.textureTop = textureTop;
        this.textureFront = textureFront;
        this.textureRight = textureRight;
        this.textureLeft = textureLeft;
        this.textureBack = textureBack;
        this.textureBottom = textureBottom;
    }

    display() {
        this.scene.pushMatrix();
        this.scene.setDiffuse(0.1, 0.7, 1, 1.0);
        this.scene.setAmbient(1, 1, 1, 1.0);

        //Top view
        this.scene.pushMatrix();
        this.scene.translate(0, 0.5, 0);
        this.scene.rotate(-1 * Math.PI/2, 1, 0, 0);
        this.textureTop.bind();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.quad.display();
        this.textureTop.unbind();
        this.scene.popMatrix();

        //Front view
        this.scene.pushMatrix();
        this.scene.translate(0, 0, 0.5);
        //no need to rotate
        this.textureFront.bind();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.quad.display();
        this.textureFront.unbind();
        this.scene.popMatrix();

        //Back view
        this.scene.pushMatrix();
        this.scene.translate(0,0,-0.5);
        this.scene.rotate(Math.PI, 1, 0, 0); //rotate 180 degrees. quad only visible from one side
        this.scene.rotate(Math.PI, 0, 0, 1);
        this.textureBack.bind();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.quad.display();
        this.textureBack.unbind();
        this.scene.popMatrix();

        //Right view
        this.scene.pushMatrix();
        this.scene.translate(0.5, 0, 0);
        this.scene.rotate(Math.PI / 2, 0, 1, 0); //rotate around y axis
        this.textureRight.bind();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.quad.display();
        this.textureRight.unbind();
        this.scene.popMatrix();

        //Left view
        this.scene.pushMatrix();
        this.scene.translate(-0.5, 0, 0);
        this.scene.rotate(3 * Math.PI / 2, 0, 1, 0);
        this.textureLeft.bind();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.quad.display();
        this.textureLeft.unbind();
        this.scene.popMatrix();
        
        //Bottom view
        this.scene.pushMatrix();
        this.scene.translate(0, -0.5, 0);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.textureBottom.bind();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.quad.display();
        this.textureBottom.unbind();
        this.scene.popMatrix();

        this.scene.popMatrix();
    }
}