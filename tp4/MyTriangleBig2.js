import {CGFobject} from '../lib/CGF.js';
/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTriangleBig2 extends CGFobject {
	constructor(scene, textureCoords) {
        super(scene);
        this.texCoords = textureCoords;
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
			0.5, 0.5, 
            1, 0,
			1, 1, 
			0.5, 0.5, 
            1, 0,
			1, 1, 
		]

        
		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}

