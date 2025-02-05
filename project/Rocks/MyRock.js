import { CGFobject } from '../../lib/CGF.js';

/**
 * MyRock
 * @constructor
 * @param scene - Reference to MyScene object
 * @param slices - Number of slices around the rock
 * @param stacks - Number of stacks along the rock
 * @param variation - Variation of the rock's surface
 * @param scaleX - Scale factor in the X axis
 * @param scaleY - Scale factor in the Y axis
 * @param scaleZ - Scale factor in the Z axis
 * @param rockMaterial - Material to apply to the rock
 * Represents a rock object.
 * This class initializes the rock with a specified material.
 * The rock is created with a specified number of slices and stacks, and a variation factor to add noise to the surface.
 * The appearance of the rock can be set using a material.
 * The rock can be scaled in the X, Y and Z axis.
 */

export class MyRock extends CGFobject {
    constructor(scene, slices, stacks, variation = 0.05, scaleX, scaleY, scaleZ, rockMaterial) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.variation = variation;  // Lowered the variation for a more subtle effect
        this.rockMaterial = rockMaterial;
        this.scaleX = scaleX;
        this.scaleY = scaleY;
        this.scaleZ = scaleZ;
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];
    
        // Add some noise based on vertex position to get a more natural look
        const noise = (x, y, z) => Math.random() * 0.5 - 0.25;

        // Add some noise to texture coordinates for a more randomized appearance
        const textureNoise = () => Math.random() * 0.5 - 0.25;
    
        for (let stack = 0; stack <= this.stacks; stack++) {
            let theta = stack * Math.PI / this.stacks;
            let sinTheta = Math.sin(theta);
            let cosTheta = Math.cos(theta);
    
            for (let slice = 0; slice <= this.slices; slice++) {
                let phi = slice * 2 * Math.PI / this.slices;
                let sinPhi = Math.sin(phi);
                let cosPhi = Math.cos(phi);
    
                let x = cosPhi * sinTheta;
                let y = cosTheta;
                let z = sinPhi * sinTheta;
    
                let u = slice / this.slices + textureNoise();
                let v = stack / this.stacks + textureNoise();
    
                // Normal vector for the vertex
                let normalX = x;
                let normalY = y;
                let normalZ = z;
    
                // If not the first or last slice, apply noise
                let noiseValue = 0;
                if (slice > 0 && slice < this.slices) {
                    noiseValue = noise(x, y, z) * this.variation;
                }
                let displacedX = x + normalX * noiseValue;
                let displacedY = y + normalY * noiseValue;
                let displacedZ = z + normalZ * noiseValue;
    
                this.vertices.push(displacedX, displacedY, displacedZ);
                this.normals.push(normalX, normalY, normalZ);
                this.texCoords.push(u, v); //HERE
            }
        }
    
        // Create indices for the vertices to form triangles
        for (let stack = 0; stack < this.stacks; stack++) {
            for (let slice = 0; slice < this.slices; slice++) {
                let first = (stack * (this.slices + 1)) + slice;
                let second = first + this.slices + 1;
    
                this.indices.push(first, second, first + 1);
                this.indices.push(second, second + 1, first + 1);
            }
        }
    
        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

    display() {
        this.rockMaterial.apply();
        this.scene.scale(this.scaleX, this.scaleY, this.scaleZ);
        super.display();
    }
}