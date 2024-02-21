import {CGFobject} from '../lib/CGF.js';
/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCube extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [
            0.5, 0.5, 0.5, //0
            0.5, 0.5, -0.5, //1
            0.5, -0.5, 0.5, //2
            0.5, -0.5, -0.5, //3

            -0.5, 0.5, 0.5, //4
            -0.5, 0.5, -0.5, //5
            -0.5, -0.5, 0.5, //6
            -0.5, -0.5, -0.5, //7
		];

		//Counter-clockwise reference of vertices
		this.indices = [
            1, 0, 2,
            2, 0, 1,
            3, 1, 2,
            2, 1, 3,

            6, 4, 5,
            5, 4, 6,
            6, 5, 7,
            7, 5, 6,

            0, 1, 4,
            4, 1, 0,
            1, 5, 4,
            4, 5, 1,

            0, 4, 2,
            2, 4, 0,
            2, 4, 6,
            6, 4, 2,

            1, 5, 3,
            3, 5, 1,
            3, 5, 7, 
            7, 5, 3,

            2, 3, 6,
            6, 3, 2,
            3, 7, 6, 
            6, 7, 3
		];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}
