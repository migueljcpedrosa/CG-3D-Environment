import {CGFobject} from '../lib/CGF.js';
/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTriangleBig extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [
            0, 2, 0,  //0
            -2, 0, 0, //1
            2, 0, 0,  //2
			0, 2, 0,  //3
            -2, 0, 0, //4
            2, 0, 0,  //5
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
			0.5, 0,  // Top middle for vertex 0
			0, 1,    // Bottom left for vertex 1
			1, 1,    // Bottom right for vertex 2
			0.5, 0,  // Top middle for vertex 3 (same as vertex 0)
			0, 1,    // Bottom left for vertex 4 (same as vertex 1)
			1, 1,    // Bottom right for vertex 5 (same as vertex 2)
		];
		
	
		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}

