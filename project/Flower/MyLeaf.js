import { CGFobject } from '../../lib/CGF.js';
import { MyStem } from './MyStem.js';
/**
 * MyLeaf
 * @constructor
 * @param scene - Reference to MyScene object
 * @param xScale - Scaling factor along the X-axis
 * @param yScale - Scaling factor along the Y-axis
 * @param zScale - Scaling factor along the Z-axis
 * @param stemHeight - Height of the stem to which the leaf is connected
 * 
 * This class represents a leaf object in the scene. It is composed of two triangles and a cylinder that
 * can be independently transformed and rotated to form the leaf shape. The class allows
 * for scaling along the three axes to adjust the leaf's proportions and includes a 
 * stemHeight variable to define its attachment point.
 */
export class MyLeaf extends CGFobject {
    constructor(scene, xScale, yScale, zScale, stemHeight, leafMaterial, leafColor) {
        super(scene);
        this.xScale = xScale;
        this.yScale = yScale;
        this.zScale = zScale;
        this.stemHeight = stemHeight;
        this.leafMaterial = leafMaterial;
        this.leafColor = leafColor;
        this.initBuffers();
    }

    initBuffers() {
        // Define vertices for the two triangles
        this.vertices = [
            // Triangle 1
            0, 0, 0, // vertex 0: base
            1, 0, 0, // vertex 1: base
            0.5, 1, 0, // vertex 2: top
            
            // Triangle 2 (will be rotated)
            0, 0, 0, // vertex 3: base (same as vertex 0)
            1, 0, 0, // vertex 4: base (same as vertex 1)
            0.5, 1, 0, // vertex 5: top (same as vertex 2)
        ];

        // Indices to define the two triangles
        this.indices = [
            0, 1, 2, // Triangle 1
            3, 5, 4, // Triangle 2
        ];

        // Normals
        this.normals = [
            // Normals for Triangle 1
            0, 0, 1, // vertex 0
            0, 0, 1, // vertex 1
            0, 0, 1, // vertex 2
            
            // Normals for Triangle 2
            0, 0, -1, // vertex 3
            0, 0, -1, // vertex 4
            0, 0, -1, // vertex 5
        ];

        this.texCoords = [
            // Adjusted for a 90-degree rotation
            // Triangle 1
            1, 1, // vertex 0: top right (was bottom left)
            1, 0, // vertex 1: bottom right (was bottom right)
            0.5, 0.5, // vertex 2: center (was top center)
        
            // Triangle 2
            1, 1, // vertex 3: top right (was bottom left)
            1, 0, // vertex 4: bottom right (was bottom right)
            0.5, 0.5, // vertex 5: center (was top center)
        ];
        

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

    display() {
        this.leafMaterial.apply();
        this.scene.pushMatrix();
        this.scene.setDiffuse(this.leafColor[0], this.leafColor[1], this.leafColor[2], this.leafColor[3]);  
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.scene.pushMatrix();
        this.scene.popMatrix();
        this.scene.popMatrix();
        this.scene.pushMatrix();
        this.scene.scale(this.xScale, this.yScale, this.zScale);
        this.scene.translate(-0.5, 0, -0.8);
        this.scene.rotate(Math.PI/2, 1, 0, 0); 
        super.display(); // Triangle 1
        // The transformations are still in place for Triangle 2
        this.scene.rotate(120 * Math.PI / 180, 1, 0, 0); // Apply rotation to second triangle
        super.display(); // Triangle 2

        this.scene.popMatrix();
    }
}