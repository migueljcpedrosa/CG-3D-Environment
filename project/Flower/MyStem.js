import { CGFappearance, CGFobject } from '../../lib/CGF.js';
/**
 * MyStem
 * @constructor
 * @param scene - Reference to MyScene object
 * @param baseRadius - Radius of the base of the stem cylinder
 * @param topRadius - Radius of the top of the stem cylinder, allowing for tapered stems
 * @param height - Height of the stem cylinder
 * @param slices - Number of slices around the z-axis, determining the circular cross-section's resolution
 * @param stacks - Number of subdivisions along the height of the stem, determining the vertical resolution
 * 
 * Constructs a cylindrical representation of a plant's stem, with the ability to define both 
 * the base and top radii for tapered effects. The stem's geometry is generated with specified 
 * parameters affecting its overall shape and tessellation, which influences how light interacts 
 * with the surface. Texture coordinates are calculated for applying a 2D texture around the 
 * cylindrical surface. The class also handles the rendering transformations required to 
 * orient the stem vertically in the scene.
 */
export class MyStem extends CGFobject {
    constructor(scene, baseRadius, topRadius, height, slices, stacks, stemMaterial) {
        console.log(baseRadius, topRadius, height, slices, stacks);
        super(scene);
        this.baseRadius = baseRadius;
        this.topRadius = topRadius;
        this.height = height;
        this.slices = slices;
        this.stacks = stacks;
        this.stemMaterial = stemMaterial;
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        let stackHeight = this.height / this.stacks;
        let radiusStep = (this.topRadius - this.baseRadius) / this.stacks;

        // Build the vertices, normals, and texCoords
        for (let stack = 0; stack <= this.stacks; stack++) {
            let radius = this.baseRadius + stack * radiusStep;
            let z = stack * stackHeight;

            for (let slice = 0; slice <= this.slices; slice++) {
                let theta = slice * 2 * Math.PI / this.slices;
                let x = radius * Math.cos(theta);
                let y = radius * Math.sin(theta);

                // Vertices and normals
                this.vertices.push(x, y, z);
                let normal = vec3.fromValues(x, y, 0);
                vec3.normalize(normal, normal);
                this.normals.push(...normal);

                // Texture coordinates (spherical mapping)
                this.texCoords.push(slice / this.slices, stack / this.stacks);
            }
        }

        // Build the indices
        for (let stack = 0; stack < this.stacks; stack++) {
            for (let slice = 0; slice < this.slices; slice++) {
                let first = (stack * (this.slices + 1)) + slice;
                let second = first + this.slices + 1;

                this.indices.push(first, second + 1, second);
                this.indices.push(first, first + 1, second + 1);
            }
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

    display() {
        if (this.stemMaterial) {
            this.stemMaterial.apply();
        }

        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        super.display();
        this.scene.popMatrix();
    }
}
