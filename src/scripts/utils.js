
export function normalizeArray(arr){

    let sum = 0;

    arr.forEach(num => sum += num);

    return arr.map(num => {
        return num/sum;
    })
}

export function generatePointDistribution(numPoints){
    const points = [];

    function distToClosestPoint(x, y){
        let closestDist = 1;
        if(points.length == 0){
            return 1;
        }

        points.forEach(point => {
            let d = Math.hypot((x-point.x),(y-point.y));

            if(d < closestDist){
                closestDist = d;
            }
        });

        return closestDist;
    }

    for(let i=0; i < numPoints; i++){

        const maxAttempts = 10;
        const closenessThreshold = 0.3;

        let furthestSuggestedLocation;
        let validLocation;

        for(let attempt=0; attempt < maxAttempts; attempt++){
            let x = Math.random();
            x = Math.abs(Math.sin(x));
            let y = Math.random();
            
            let d = distToClosestPoint(x, y);

            if(d > closenessThreshold || points.length == 0){
                validLocation = { x: x, y: y };
                break;
            } else {
                if(!furthestSuggestedLocation || d > furthestSuggestedLocation.d){
                    if(furthestSuggestedLocation) console.log(d)
                    furthestSuggestedLocation = {
                        x: x, y: y, d: d
                    }
                }
            }

        }

        if(validLocation){
            points.push(validLocation);
        } else {
            points.push(furthestSuggestedLocation);
        }

    }
    return points;
    console.log(points)
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