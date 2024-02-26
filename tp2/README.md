# CG 2023/2024

## Group T03G05

## TP 2 Notes

### Exercise 1

Exercise 1 involved creating a Tangram figure by applying geometric transformations to individual geometric shapes. 

The first step was to create an instance of the MyDiamond class and position it on the XY plane using matrix multiplication operations. This involved declaring transformation matrices and using the multMatrix() function to apply the transformations.

Using the geometric transformation methods provided by the WebCGF library, the remaining Tangram pieces were placed in the scene. These transformations were applied relative to the origin, with the help of pushMatrix() and popMatrix() functions to manage the transformation state.

A new class, MyTangram, was created as a subclass of CGFobject to serve as a composite object encompassing all the individual Tangram pieces. The display() method of MyTangram was implemented to organize and display the entire Tangram figure.

In the MyScene class, an instance of MyTangram was created in the init() method, and the display() method was updated to invoke the display() method of the MyTangram object. This ensures that the entire Tangram figure is rendered correctly within the scene.


![Tangram](cg-t03g05-tp2-1.png)

*Figure 1. Final Result of Tangram figure after applying geometric transformations*

### Exercise 2 
Exercise 2 involved creating a unitary cube centered at the origin with a single mesh of triangles.

The first step was to declare the 8 vertices of the cube:
```js
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
```

and define the triangles, in this case they are all double sided:
```js
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
```

Then, using the geometric transformations provided by the WebCGF library, the cube was placed parallel to the xz axis to be a base for the tangram, with the top left vertex on the origin (0,0,0).

![Cube and Tangram](cg-t03g05-tp2-2.png)

*Figure 2. Unit cube base for tangram*

### Exercise 3
Exercise 3 entailed the construction of a cube similar to that in Exercise 2, employing six quads rather than a singular mesh as previously done.

- MyQuad:
```js
import { CGFobject } from '../lib/CGF.js';
/**
 * MyQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyQuad extends CGFobject {
    constructor(scene) {
        super(scene);
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [
            0.5, -0.5, 0,	    //0 
            0.5, 0.5, 0,	    //1
            -0.5, 0.5, 0,	    //2
            -0.5, -0.5, 0,	    //3
        ];

        //Counter-clockwise reference of vertices
        this.indices = [
            0, 1, 3,
            3, 1, 2
        ];

        //The defined indices (and corresponding vertices)
        //will be read in groups of three to draw triangles
        this.primitiveType = this.scene.gl.TRIANGLES;

        this.initGLBuffers();
    }
}
```

- MyUnitCubeQuad
```js
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
        this.scene.pushMatrix();
        this.scene.setDiffuse(0.1, 0.7, 1, 1.0);
        this.scene.setAmbient(1, 1, 1, 1.0);

        //Front view
        this.scene.pushMatrix();
        this.scene.translate(0, 0, 0.5);
        //no need to rotate
        this.quad.display();
        this.scene.popMatrix();

        //Back view
        this.scene.pushMatrix();
        this.scene.translate(0,0,-0.5);
        this.scene.rotate(Math.PI, 1, 0, 0); //rotate 180 degrees. quad only visible from one side
        this.quad.display();
        this.scene.popMatrix();

        //Top view
        this.scene.pushMatrix();
        this.scene.translate(0, 0.5, 0);
        this.scene.rotate(-1 * Math.PI/2, 1, 0, 0);
        this.quad.display();
        this.scene.popMatrix();

        //Bottom view
        this.scene.pushMatrix();
        this.scene.translate(0, -0.5, 0);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.quad.display();
        this.scene.popMatrix();
        //Right view
        this.scene.pushMatrix();
        this.scene.translate(0.5, 0, 0);
        this.scene.rotate(Math.PI / 2, 0, 1, 0); //rotate around y axis
        this.quad.display();
        this.scene.popMatrix();

        //Left view
        this.scene.pushMatrix();
        this.scene.translate(-0.5, 0, 0);
        this.scene.rotate(3 * Math.PI / 2, 0, 1, 0);
        this.quad.display();
        this.scene.popMatrix();

        this.scene.popMatrix();
    }
}
```

After successfully creating the cube with its center in the origin, we were requested to position it behind the tangram. This setup allowed for the rotation of the object ensemble until the upper left vertex of the cube's base aligned with the origin of the reference coordinate system.

```js
// Apply transformations to both objects together
    
    this.multMatrix(sca);
    this.pushMatrix();
    this.translate(4, 0, 5);
    this.rotate(-Math.PI / 2, 1, 0, 0);
    
    //Unit Cube Quad
    this.pushMatrix();
    this.translate(0.5, 0.5, -1.1);
    this.scale(9, 9, 2);
    if(this.displayMyUnitCubeQuad) this.MyUnitCubeQuad.display();
    this.popMatrix();
      

    this.multMatrix(sca);

    //Tangram
    this.pushMatrix();
    if(this.displayTangram) this.tangram.display();
    this.popMatrix();

    this.popMatrix();
```


![CubeQuad and Tangram](cg-t03g05-tp2-3.jpg)
