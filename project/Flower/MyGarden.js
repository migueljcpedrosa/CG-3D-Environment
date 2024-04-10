import { CGFobject } from '../../lib/CGF.js';
import { MyFlower } from './MyFlower.js';

export class MyGarden extends CGFobject {
    constructor(scene, numRows, numCols) {
        this.scene = scene;
        this.numRows = numRows;
        this.numCols = numCols;
        this.flowers = []; // Matriz para armazenar as flores

        this.createGarden();
    }

    createGarden() {
        for (let row = 0; row < this.numRows; row++) {
            this.flowers[row] = [];
            for (let col = 0; col < this.numCols; col++) {
                // Aqui você criaria uma nova flor com as características desejadas
                // Por exemplo, posicionar as flores com um espaço uniforme entre elas
                let xPosition = col * this.spacing; // 'this.spacing' define o espaço entre as flores
                let zPosition = row * this.spacing;
                
                // A linha abaixo é apenas um exemplo, você deve substituir por sua lógica de criação de flor
                this.flowers[row][col] = new MyFlower(this.scene, xPosition, 0, zPosition);
            }
        }
    }

    display() {
        for (let row = 0; row < this.numRows; row++) {
            for (let col = 0; col < this.numCols; col++) {
                // Aplica transformações necessárias para posicionar cada flor corretamente
                this.scene.pushMatrix();
                
                // Translate para a posição onde a flor deve ser renderizada
                let xPosition = col * this.spacing;
                let zPosition = row * this.spacing;
                this.scene.translate(xPosition, 0, zPosition);

                // Exibir a flor
                this.flowers[row][col].display();
                
                this.scene.popMatrix();
            }
        }
    }
}