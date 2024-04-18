import { CGFappearance, CGFobject } from '../../lib/CGF.js';
/**
 * MyReceptacle
 * @constructor
 * @param scene - Reference to MyScene object
 * @param radius - Radius of the spherical receptacle
 * @param slices - Number of slices around the z-axis (similar to lines of longitude)
 * @param stacks - Number of stacks along the z-axis from the bottom to the top of the sphere (similar to lines of latitude)
 * 
 * Creates a spherical object meant to represent the receptacle of a flower, where the petals 
 * and other parts are attached. This geometry is created with specified radius, slices, and stacks 
 * to control the level of detail of the sphere. Texture coordinates are calculated to map a 2D 
 * texture onto the 3D surface. The normals are calculated for each vertex to ensure proper lighting 
 * effects across the curved surface.
 */
export class MyReceptacle extends CGFobject {
    constructor(scene, radius, slices, height, receptacleMaterial) {
        super(scene);
        this.radius = radius;
        this.slices = slices;
        this.height = height; // Height of the center vertex above the plane
        this.receptacleMaterial = receptacleMaterial;
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        // Center vertex
        this.vertices.push(0, this.height, 0); // Center vertex at a height
        this.normals.push(0, 1, 0); // Normal pointing up
        this.texCoords.push(0.5, 0.5); // Texture coordinate for the center

        // Perimeter vertices
        for (let slice = 0; slice <= this.slices; slice++) {
            let angle = slice * 2 * Math.PI / this.slices;
            let x = this.radius * Math.cos(angle);
            let z = this.radius * Math.sin(angle);
            let y = 0; // All perimeter vertices lie on the plane

            this.vertices.push(x, y, z);
            this.normals.push(0, 1, 0); // Normals pointing up
            let u = 0.5 + 0.5 * Math.cos(angle); // Adjust texture coordinates
            let v = 0.5 + 0.5 * Math.sin(angle);
            this.texCoords.push(u, v);
        }

        // Indices
        for (let i = 1; i <= this.slices; i++) {
            this.indices.push(0, i, i % this.slices + 1);
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

    display() {
        this.scene.gl.disable(this.scene.gl.CULL_FACE);
        this.receptacleMaterial.apply();
        this.scene.pushMatrix();
        this.scene.scale(1.2, 0.2, 1.2);
        this.scene.setAmbient(1, 1, 0, 1); // Soft yellow for ambient light
        this.scene.setDiffuse(1, 1, 0, 1); // Bright yellow for diffuse light
        this.scene.setSpecular(1, 1, 0, 1); // Shiny yellow highlights
        this.scene.setShininess(30.0);
        super.display();
        this.scene.popMatrix();
        this.scene.gl.enable(this.scene.gl.CULL_FACE);
    }
}
