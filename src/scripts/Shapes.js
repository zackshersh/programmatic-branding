
class Shape {
    constructor(){
        this.localPos = {
            x: 0,
            y: 0
        }

        // furthest possible distance of a point from the center, used for setting margins so that no point sticks outside of parent grid space
        this.longestLength = 0;

        this.parent = undefined;

        // this.init();
    }

    init(){
        this.setLongestLength();
    }

    setLocalPos(x,y){
        this.localPos = { x: x, y: y};
    }

    setParent(parent){
        this.parent = parent;
    }

    getAbsolutePos(){
        let { w, h } = this.parent.actualSize;

        let availableW = w - ( this.parent.margin * 2 )

    }

    draw(){
        let centerPos = this.getAbsolutePos();
    }
}


export class Rect extends Shape {
    constructor(w,h){
        super()
        this.w = w;
        this.h = h;

        this.init();
    }
    
    setLongestLength(){
        // just getting distance from center (0,0) to an corner
        let l = Math.hypot( this.w/2, this.h/2);
        this.longestLength = l;
    }



}