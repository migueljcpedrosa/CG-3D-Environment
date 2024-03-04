import { CGFobject } from '../lib/CGF.js';
/**
 * MyPrism
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
        //initialize arrays
        this.vertices = [];
        this.indices = [];
        this.normals = [];

        //slice cycle
        let index = 0;
        let incrementAngle = 2 * Math.PI / this.slices;

        let incrementStacks = 1 / this.stacks; //height of column is 1, so each stack has a height of 1/stacks 

        for (let stackIterator = 0 ; stackIterator < this.stacks ; stackIterator++) {
            for (let sliceIterator = 0 ; sliceIterator < this.slices ; sliceIterator++) {

                //Point1 (beginning of this slice)
                let x1 = Math.cos(sliceIterator*incrementAngle);
                let y1 = Math.sin(sliceIterator*incrementAngle);

                //Point2 (end of this slice, beggining of next slice)
                let x2 = Math.cos((sliceIterator+1)*incrementAngle);
                let y2 = Math.sin((sliceIterator+1)*incrementAngle);
                
                //Point between Point1 and Point2 (in circle of the same radius as Point1 and Point2)
                let x = Math.cos((sliceIterator+0.5)* incrementAngle);
                let y = Math.sin((sliceIterator+0.5)*incrementAngle);

                let size = Math.sqrt(x*x + y*y); 
                this.vertices.push(x1, y1, stackIterator * incrementStacks,
                                   x2, y2, stackIterator * incrementStacks, 
                                   x1, y1, (stackIterator + 1) * incrementStacks, 
                                   x2, y2, (stackIterator + 1) * incrementStacks);

                this.indices.push(index+2, index, index+1,    //triangle1
                                  index+1, index+3, index+2); //triangle2

                //ivide by size to normalize the vector
                this.normals.push(x/size, y/size, 0,
                                x/size, y/size, 0,
                                x/size, y/size, 0, 
                                x/size, y/size, 0);

                index += 4; //each slice has 4 vertices (start in index and end in index+3)
            
            }

            this.primitiveType = this.scene.gl.TRIANGLES;
            this.initGLBuffers();
        }
    }
}