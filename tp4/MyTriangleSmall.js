import {CGFobject} from '../lib/CGF.js';
/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTriangleSmall extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [
            0, 1, 0,  //0
            -1, 0, 0, //1
            1, 0, 0,  //2
			0, 1, 0,  //3
            -1, 0, 0, //4
            1, 0, 0,  //5
		];

		//Counter-clockwise reference of vertices
		this.indices = [
            0, 1, 2,
			5, 4, 3
		];

		this.normals = [
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,
			0, 0, -1,
			0, 0, -1,
			0, 0, -1,
		]

		this.texCoords = [
            0.5, 0.5,
			0.25, 0.75,
			0.75, 0.75,
			0.5, 0.5,
			0.25, 0.75,
			0.75, 0.75,           
        ]
		

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}

