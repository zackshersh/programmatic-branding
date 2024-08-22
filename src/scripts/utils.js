
export function normalizeArray(arr){

    let sum = 0;

    arr.forEach(num => sum += num);

    return arr.map(num => {
        return num/sum;
    })
}

export function generatePointDistribution(numPoints){
    const points = [];
    for(let i=0; i < numPoints; i++){

    }
}
export function spaceShapesOut(originalShapes, steps){

    let shapes = [...originalShapes];

    let forceMultiplier = 0.05;

    let corners = [{x:0,y:0, type:"corner"}, {x:1,y:0, type:"corner"}, {x:0,y:1, type:"corner"}, {x:1,y:1, type:"corner"}]

    for(let i=0; i<steps; i++){
        shapes.forEach(shape => {

            let {x, y} = shape.localPos;
            console.log(shape);

            let shapesAndCorners = [...shapes, ...corners]
            // cycling through all other shapes to apply force
            shapesAndCorners.forEach(object => {
                if(shape.id == object.id) return;

                let xDif, yDif;

                let forceMultiplier = 0.0;

                if(object.type == "corner"){
                    xDif = x - object.x;
                    yDif = y - object.y;
                    forceMultiplier = 0.2
                } else {
                    xDif = x - object.localPos.x;
                    yDif = y - object.localPos.y;
                }
                let d = Math.hypot(xDif, yDif);

                if(d == 0) d += 0.01

                shape.localPos.x += xDif * (1/d) * forceMultiplier;
                shape.localPos.y += yDif * (1/d) * forceMultiplier;

                shape.localPos.x += (Math.random() * 0.1) - 0.05;
                shape.localPos.y += (Math.random() * 0.1) - 0.05;

                if(shape.localPos.x < 0) shape.localPos.x = 0;
                if(shape.localPos.x > 1) shape.localPos.x = 1;

                if(shape.localPos.y < 0) shape.localPos.y = 0;
                if(shape.localPos.y > 1) shape.localPos.y = 1;

                console.log(shape.localPos)

            })
        })
    }

    return shapes;
}