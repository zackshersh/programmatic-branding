
class Shape {
    constructor(){
        this.localPos = {
            x: 0,
            y: 0
        }

        this.angle = 0;

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

    // setCanvasRotation(){

    // }

    getAbsolutePos(){
        let { w, h } = this.parent.actualSize;

        let margin = ( this.parent.margin * 2 ) + ( this.longestLength * 2 );
        console.log(margin)
        let availableW = w - margin*2;
        let availableH = h - margin*2;

        let relX = (this.localPos.x * availableW) + margin;
        let relY = (this.localPos.y * availableH) + margin;

        return {
            absX: relX + this.parent.actualPos.x,
            absY: relY + this.parent.actualPos.y
        }

    }

    draw(){
        let { absX, absY } = this.getAbsolutePos();
        this.shapeSpecificDraw(absX, absY)
    }
}


export class Rect extends Shape {
    constructor( w, h){
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

    shapeSpecificDraw(centerX, centerY){
        let ctx = this.parent.grid.graphicsManager.ctx;
        ctx.fillStyle = "black"
        ctx.fillRect(centerX - this.w/2, centerY - this.h/2, this.w, this.h);
    }

}