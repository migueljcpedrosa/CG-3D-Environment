import { CGFobject } from '../lib/CGF.js';
import { MyQuad } from './MyQuad.js';
/**
 * MyUnitCubeQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCubeQuad extends CGFobject {
    constructor(scene) {
        super(scene);
        this.quad = new MyQuad(scene);
    }

    display() {
        //Right view
        this.scene.pushMatrix()
        this.scene.translate(0.5, 0, 0)
        this.scene.rotate(Math.PI / 2, 0, 1, 0) //rotate around y axis
        this.quad.display()
        this.scene.popMatrix()

        //Left view
        this.scene.pushMatrix()
        this.scene.translate(-0.5, 0, 0)
        this.scene.rotate(3 * Math.PI / 2, 0, 1, 0)
        this.quad.display()
        this.scene.popMatrix()

        //Front view
        this.scene.pushMatrix()
        this.scene.translate(0, 0, 0.5)
        //no need to rotate
        this.quad.display()
        this.scene.popMatrix()

        //Back view
        this.scene.pushMatrix()
        this.scene.translate(0,0,-0.5)
        this.scene.rotate(Math.PI,1, 0, 0) //rotate 180 degrees. quad only visible from one side
        this.quad.display()
        this.scene.popMatrix()
    }
}