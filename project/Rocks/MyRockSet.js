import { CGFobject } from '../../lib/CGF.js';
import { MyRock } from './MyRock.js'; 

export class MyRockSet extends CGFobject {
    constructor(scene, numRocks, rockBaseSize, rockMaterial) {
        super(scene);
        this.numRocks = numRocks;
        this.rockBaseSize = rockBaseSize;
        this.rockMaterial = rockMaterial;
        this.rocks = [];
        this.generateRocks();
    }

    generateRocks() {
        let baseY = 0; // Start piling from the ground up

        for (let i = 0; i < this.numRocks; i++) {
            let rockSize = this.rockBaseSize * (Math.random() * 0.5 + 0.75); // Variation in size

            //updated here:
            let rock = new MyRock(this.scene, 15, 10, rockSize * 0.2, this.rockMaterial);

            // Random position with some jittering for natural placement
            let rockX = (Math.random() - 0.5) * 10; //2 prior
            let rockZ = (Math.random() - 0.5) * 10;

            //let rock = new MyRock(this.scene, 15, 10, rockSize * 0.2, this.rockMaterial); // Adjust slices, stacks as needed
            this.scene.translate(rockX, baseY + rockSize / 2, rockZ);

            // Random rotations
            //this.scene.rotate(Math.random() * 2 * Math.PI, 0, Math.random() * 2 * Math.PI);
            this.scene.rotate(Math.random() * 2 * Math.PI, 0, 1, 0);
            
            this.rocks.push(rock);
            baseY += rockSize; // Update for the next rock
        }
    }

    display() {
        this.scene.gl.disable(this.scene.gl.CULL_FACE);
        for (let rock of this.rocks) {
            rock.display();
        }
        this.scene.gl.enable(this.scene.gl.CULL_FACE);
    }
}