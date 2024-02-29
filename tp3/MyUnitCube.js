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
            //vertices must be defined for each face
            this.vertices = [
                  // Face 1
                  -0.5, 0.5, 0.5,
                  0.5, 0.5, 0.5,
                  0.5, -0.5, 0.5,
                  -0.5, -0.5, 0.5,
                  // Face 2
                  -0.5, 0.5, -0.5,
                  0.5, 0.5, -0.5,
                  0.5, 0.5, 0.5,
                  -0.5, 0.5, 0.5,
                  // Face 3
                  0.5, 0.5, 0.5,
                  0.5, 0.5, -0.5,
                  0.5, -0.5, -0.5,
                  0.5, -0.5, 0.5,
                  // Face 4
                  -0.5, -0.5, 0.5,
                  0.5, -0.5, 0.5,
                  0.5, -0.5, -0.5,
                  -0.5, -0.5, -0.5,
                  // Face 5
                  -0.5, 0.5, -0.5,
                  -0.5, 0.5, 0.5,
                  -0.5, -0.5, 0.5,
                  -0.5, -0.5, -0.5,
                  // Face 6
                  0.5, 0.5, -0.5,
                  -0.5, 0.5, -0.5,
                  -0.5, -0.5, -0.5,
                  0.5, -0.5, -0.5
            ];
      
              //Counter-clockwise reference of vertices 
            this.indices = [
                  // Face 1
                  0, 2, 1,
                  0, 3, 2,
                  // Face 2
                  4, 6, 5,
                  4, 7, 6,
                  // Face 3
                  8, 10, 9,
                  8, 11, 10,
                  // Face 4
                  12, 14, 13,
                  12, 15, 14,
                  // Face 5
                  16, 18, 17,
                  16, 19, 18,
                  // Face 6
                  20, 22, 21,
                  20, 23, 22,
            ];

            this.normals = [
                  //face1
                  0, 0, 1,
                  0, 0, 1,
                  0, 0, 1,
                  0, 0, 1,
                  //face2
                  0, 1, 0,
                  0, 1, 0,
                  0, 1, 0,
                  0, 1, 0,
                  //face3
                  1, 0, 0,
                  1, 0, 0,
                  1, 0, 0, 
                  1, 0, 0,
                  //face4
                  0, -1, 0,
                  0, -1, 0,
                  0, -1, 0, 
                  0, -1, 0,
                  //face5
                  -1, 0, 0,
                  -1, 0, 0,
                  -1, 0, 0,
                  -1, 0, 0, 
                  //face6
                  0, 0, -1,
                  0, 0, -1, 
                  0, 0, -1, 
                  0, 0, -1
            ]

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}
