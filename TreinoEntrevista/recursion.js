function sumNumber(array) {
    let total = 0;

    for (const item of array) {
        if (Array.isArray(item)) {
            total += sumNumber(item);
        } else {
            total += item;
        }
    }
    return total;
}

const array = [1, [2, 3], [4, 5]];
const result = sumNumber(array);
console.log(result);