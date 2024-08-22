
export function normalizeArray(arr){

    let sum = 0;

    arr.forEach(num => sum += num);

    return arr.map(num => {
        return num/sum;
    })
}

export function spaceShapesOut(originalShapes, steps){

    let shapes = [...originalShapes];
    for(let i=0; i<steps; i++){
        shapes.forEach(shape => {

            let {x, y} = shape.localPos;
            console.log(shape)
            // cycling through all other shapes to apply force
            shapes.forEach(otherShape => {
                let xDif = x - otherShape.localPos.x;
                let yDif = y - otherShape.localPos.y;
                let d = Math.hypot(xDif, yDif);
                console.log(xDif * (1/d) * 0.01)

                // shape.localPos.x += xDif * (1/d) * 0.01;
                // shape.localPos.y += yDif * (1/d) * 0.01;

                // console.log(shape.localPos)

            })
        })
    }

    return shapes;
}