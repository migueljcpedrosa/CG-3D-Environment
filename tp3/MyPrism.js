import { CGFobject } from '../lib/CGF.js';
/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyPrism extends CGFobject {
    constructor(scene, slices, stacks) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.initBuffers();
    }

    initBuffers() {
        
        this.vertices = [];
        this.indices = [];
        this.normals = [];

        let index = 0;
        let incrementAngle = 2 * Math.PI / this.slices;
        for (let sliceIterator = 0 ; sliceIterator < this.slices ; sliceIterator++) {

            //Point1 (beggining of this slice)
            let x1 = Math.cos(sliceIterator*incrementAngle);
            let y1 = Math.sin(sliceIterator*incrementAngle);

            //Point2 (end of this slice, beggining of next slice)
            let x2 = Math.cos((sliceIterator+1)*incrementAngle);
            let y2 = Math.sin((sliceIterator+1)*incrementAngle);
            
            //Intermediate point in slice 
            let x = Math.cos((sliceIterator+0.5)* incrementAngle);
            let y = Math.sin((sliceIterator+0.5)*incrementAngle);
            let size = Math.sqrt(x*x + y*y);

            this.vertices.push(x1, y1, 0,
                               x2, y2, 0, 
                               x1, y1, 1, 
                               x2, y2, 1);

            this.indices.push(index+2, index, index+1,    //triangle1
                              index+1, index+3, index+2); //triangle2

            this.normals.push(x/size, y/size, 0,
                              x/size, y/size, 0, 
                              x/size, y/size, 0, 
                              x/size, y/size, 0);

            index+=4; //each slice has 4 vertices (strt in index and end in index+3)
           
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}