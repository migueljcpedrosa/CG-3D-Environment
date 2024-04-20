import {CGFinterface, dat} from '../lib/CGF.js';

/**
* MyInterface
* @constructor
*/
export class MyInterface extends CGFinterface {
    constructor() {
        super();
    }

    init(application) {
        // call CGFinterface init
        super.init(application);
        
        // init GUI. For more information on the methods, check:
        // https://github.com/dataarts/dat.gui/blob/master/API.md
        this.gui = new dat.GUI();

        //Checkbox element in GUI
        this.gui.add(this.scene, 'displayAxis').name('Display Axis');

        //Slider element in GUI
        this.gui.add(this.scene, 'scaleFactor', 0.1, 5).name('Scale Factor');

        //
        this.gui.add(this.scene, 'displayReceptacle').name('Display Rec');

        //
        this.gui.add(this.scene, 'displayStem').name('Display Stem');

        //
        this.gui.add(this.scene, 'displayPetal').name('Display Petal');

        //
        this.gui.add(this.scene, 'displayFlower').name('Display Flower');

        //
        this.gui.add(this.scene, 'displayLeaf').name('Display Leaf');

        //
        this.gui.add(this.scene, 'displayGarden').name('Display Garden');

        //this.gui.add(this.scene, 'displayBee').name('Display Bee');

        //
        this.gui.add(this.scene, 'gardenRowsColumns', 5, 15).step(1).name('Garden Rows/Columns').onChange(value => {
            this.scene.updateGarden(value, value);
            //this.scene.redraw();
        });
        return true;
    }
}