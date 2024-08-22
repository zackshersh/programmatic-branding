import Grid from "./Grid"

class GraphicsManager {

    constructor(canvasID){

        this.canvasID = canvasID;
        this.canvasElem = undefined;
        this.ctx = undefined;

        this.width = 600;
        this.height = 400;

        this.bkgColor = "#F5EDDD";

        this.scalingFactor = 1;

        this.grid = new Grid(this);
    }

    init(){
        this.canvasElem = document.getElementById(this.canvasID);

        this.canvasElem.width = this.width * this.scalingFactor;
        this.canvasElem.height = this.height * this.scalingFactor;

        this.canvasElem.style.maxWidth = this.width;
        this.canvasElem.style.maxHeight = this.height;

        this.ctx = this.canvasElem.getContext("2d");

        this.draw();
    }


    draw(){
        this.bkg();
        this.grid.draw()
    }

    bkg(){
        this.ctx.fillStyle = this.bkgColor;
        this.ctx.fillRect(0,0,this.width,this.height);
    }

}

export default GraphicsManager;