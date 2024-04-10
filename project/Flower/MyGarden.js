import { CGFobject } from '../../lib/CGF.js';
import { MyFlower } from './MyFlower.js';

export class MyGarden extends CGFobject {
    constructor(scene, numRows, numCols) {
        super(scene);
        this.numRows = numRows;
        this.numCols = numCols;
        this.flower = new MyFlower(scene, 7, 5, [1, 0, 0, 1], 1, [1, 0, 0, 1], 0.5, 5, [0, 1, 0, 1], [0, 1, 0, 1], 100, 150, 5, 30, 30);
    }

    display() {
        for (let row = 0; row < this.numRows; row++) {
            for (let col = 0; col < this.numCols; col++) {
                this.flower.display();
            }
        }
    }
}