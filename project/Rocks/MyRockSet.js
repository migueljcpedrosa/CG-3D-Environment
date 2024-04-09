import { CGFobject } from '../lib/CGF.js';
import { MySphere } from './MySphere.js';

export class MyRock extends MySphere {
    initBuffers() {
        super.initBuffers();

        // Modify vertices slightly to create protrusions and indentations
        for (let i = 0; i < this.vertices.length; i += 3) {
            let displacement = Math.random() * 0.2 - 0.1; // Random value between -0.1 and 0.1
            this.vertices[i] += this.normals[i] * displacement;
            this.vertices[i+1] += this.normals[i+1] * displacement;
            this.vertices[i+2] += this.normals[i+2] * displacement;
        }

        // Pass the data to WebGL buffers for rendering.
        this.initGLBuffers();
    }
}

export class MyRockSet extends CGFobject {
    constructor(scene, numRocks) {
        super(scene);
        this.rocks = [];

        // Create rocks with random orientations and dimensions
        for (let i = 0; i < numRocks; i++) {
            let slices = Math.floor(Math.random() * 10) + 10; // Random value between 10 and 20
            let stacks = Math.floor(Math.random() * 10) + 10; // Random value between 10 and 20
            let rock = new MyRock(scene, slices, stacks);
            this.rocks.push(rock);
        }
    }

    display() {
        for (let rock of this.rocks) {
            this.scene.pushMatrix();
            this.scene.scale(Math.random(), Math.random(), Math.random()); // Apply random scale
            this.scene.rotate(Math.random() * 2 * Math.PI, Math.random(), Math.random(), Math.random()); // Apply random rotation
            rock.display();
            this.scene.popMatrix();
        }
    }
}