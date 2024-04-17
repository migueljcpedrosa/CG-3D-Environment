import { CGFobject } from '../../lib/CGF.js';
import { MyRock } from './MyRock.js'; 

export class MyRockSet extends CGFobject {
    constructor(scene, numRocks, rockBaseSize) {
        super(scene);
        this.numRocks = numRocks;
        this.rockBaseSize = rockBaseSize;
        this.rocks = [];
        this.generateRocks();
    }

    generateRocks() {
        let baseY = 0; // Start piling from the ground up

        for (let i = 0; i < this.numRocks; i++) {
            let rockSize = this.rockBaseSize * (Math.random() * 0.5 + 0.75); // Variation in size

            // Random position with some jittering for natural placement
            let rockX = (Math.random() - 0.5) * 2;
            let rockZ = (Math.random() - 0.5) * 2;

            let rock = new MyRock(this.scene, 15, 10, rockSize * 0.2); // Adjust slices, stacks as needed
            this.scene.translate(rockX, baseY + rockSize / 2, rockZ);

            // Random rotations
            this.scene.rotate(Math.random() * 2 * Math.PI, 0, Math.random() * 2 * Math.PI);

            this.rocks.push(rock);
            baseY += rockSize; // Update for the next rock
        }
    }

    display() {
        for (let rock of this.rocks) {
            rock.display();
        }
    }
}