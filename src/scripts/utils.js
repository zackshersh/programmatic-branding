
export function normalizeArray(arr){

    let sum = 0;

    arr.forEach(num => sum += num);

    return arr.map(num => {
        return num/sum;
    })
}