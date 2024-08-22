import { Rect } from "./Shapes";
import { normalizeArray, spaceShapesOut } from "./utils";

class Grid {
    constructor(parent){
        this.graphicsManager = parent;

        this.w = 100;
        this.h = 100;

        this.spaces = [];

        this.cols = 3;
        this.rows = 3;

        this.colWidths = [];
        this.rowWidths = [];

        this.init();
    }

    init(){
        this.w = this.graphicsManager.width;
        this.h = this.graphicsManager.height;
        
        this.setRowColSizes();
        this.populateGrid();
    }

    populateGrid(){
        for(let x=0;x<this.cols;x++){
            let col = [];

            for(let y=0;y<this.rows;y++){
                let gridSpace = new GridSpace(this,x,y);
                if(x == 1 && y == 1){

                    gridSpace.addChildType({
                        childClass: Rect,
                        args: [18, 10, "#4d35d4"]
                    });

                    gridSpace.addChildType({
                        childClass: Rect,
                        args: [22, 8, "#13a851"]
                    });

                    gridSpace.bkg = "#a1d0ff"


                }
                col.push(gridSpace);
            }

            this.spaces.push(col);
        }


    }

    setRowColSizes(){
        let rows = [];
        for(var i=0; i<this.rows;i++){
            rows.push(Math.pow(Math.random(),1) + 0.1);
        }
        this.rowWidths = normalizeArray(rows);

        let cols = [];
        for(var i=0; i<this.cols;i++){
            cols.push(Math.pow(Math.random(),1) + 0.1);
        }
        this.colWidths = normalizeArray(cols);
    }

    getRowPosSize(row){
        // adding up all of the row sizes before this one
        let sum = 0;

        for(let i=0; i < row; i++){
            sum += this.rowWidths[i]
        };

        let pos = this.h * sum;
        let size = this.h * this.rowWidths[row];

        return {y: pos, h: size};
    }

    getColPosSize(col){
        // adding up all of the col sizes before this one
        let sum = 0;

        for(let i=0; i < col; i++){
            sum += this.colWidths[i]
        };

        let pos = this.w * sum;
        let size = this.w * this.colWidths[col];

        return {x: pos, w: size};
    }

    draw(){
        this.spaces.forEach(col => {
            col.forEach(space => {
                if(space.draw) space.draw();
            })
        })

        this.drawGridLines()
    }

    drawGridLines(){

        let ctx = this.graphicsManager.ctx;


        let colXs = [];

        for(let i=0; i < this.cols; i++){
            let {x} = this.getColPosSize(i);
            colXs.push(x);
        }
        
        colXs.forEach(x => {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, this.h);
            ctx.closePath();
            
            ctx.lineWidth = 1
            ctx.stroke();
        })


        let rowYs = [];
        for(let i=0; i < this.rows; i++){
            let {y} = this.getRowPosSize(i);
            rowYs.push(y);
        }

        rowYs.forEach(y => {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(this.w, y);
            ctx.closePath();
            
            ctx.lineWidth = 1
            ctx.stroke();
        })


    }


}

class GridSpace {
    constructor(parent,x,y) {
        this.grid = parent;

        this.col = x;
        this.row = y;

        this.actualPos = {
            x: 0,
            y: 0
        }

        this.actualSize = {
            w: 0,
            h: 0
        }

        this.childTypes = [];
        this.childCount = 20;

        this.margin = 0;

        this.children = [];

        this.init();
    }

    init(){
        this.updateActual()
    }

    updateActual(){
        let {y, h} = this.grid.getRowPosSize(this.row);
        this.actualPos.y = y;
        this.actualSize.h = h;
        
        let {x, w} = this.grid.getColPosSize(this.col);
        this.actualPos.x = x;
        this.actualSize.w = w;
    }

    draw(){
        this.drawSelf();

        this.children.forEach(child => {
            child.draw();
        })
    }

    drawSelf(){
        let {x, y} = this.actualPos;
        let {w, h} = this.actualSize;

        let ctx = this.grid.graphicsManager.ctx;

        if(this.bkg){
            ctx.fillStyle = this.bkg;
            ctx.fillRect(x, y, w, h);
        }

    }

    addChildType(type){
        this.childTypes.push(type);

        this.populateChildren()
    }

    populateChildren(){

        this.children = [];
        for(let i=0; i<this.childCount; i++){
            let rndmIndex = Math.floor(Math.random() * this.childTypes.length);
            let { childClass, args } = this.childTypes[rndmIndex];

            let child = new childClass(...args);
            let x = Math.random();
            let y = Math.random();
            
            child.setParent(this);

            child.setLocalPos(x, y);
            child.setRotation(Math.random() * (Math.PI * 2))
            
            this.children.push(child);
        }
        console.log(this.children)

        const steps = 0;
        this.children = spaceShapesOut(this.children, steps);

    }

    
}


export default Grid;