import { Rect } from "./Shapes";
import { normalizeArray } from "./utils";

class Grid {
    constructor(parent){
        this.parent = parent;

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
        this.w = this.parent.width;
        this.h = this.parent.height;
        
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
                        args: [12,7]
                    });

                    gridSpace.addChildType({
                        childClass: Rect,
                        args: [6, 8]
                    });


                }
                col.push(gridSpace);
            }

            this.spaces.push(col);
        }

        console.log(this.spaces)
    }

    setRowColSizes(){
        let rows = [];
        for(var i=0; i<this.rows;i++){
            rows.push(Math.pow(Math.random(),1.4) + 0.1);
        }
        this.rowWidths = normalizeArray(rows);

        let cols = [];
        for(var i=0; i<this.cols;i++){
            cols.push(Math.pow(Math.random(),1.4) + 0.1);
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
        this.childCount = 8;

        this.margin = 3;

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
        this.outline();

        this.children.forEach(child => {
            try {
                child.draw();
            } catch (err){
                console.error(err);
            }
        })
    }

    outline(){
        let {x, y} = this.actualPos;
        let {w, h} = this.actualSize;

        const rndm = (max) => {
            return Math.floor(Math.random() * max);
        }
        this.grid.parent.ctx.fillStyle = `hsl(${rndm(360)}deg ${rndm(60)+30}% ${90}%)`

        this.grid.parent.ctx.fillRect(Math.round(x), Math.round(y), Math.round(w), Math.round(h));
        this.grid.parent.ctx.strokeRect(Math.round(x), Math.round(y), Math.round(w), Math.round(h));
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
            
            child.setLocalPos(x, y);
            child.setParent(this);
            this.children.push(child);
        }
        console.log(this.children)
    }

    
}


export default Grid;