"use strict";
function filterEvenNumber(arr) {
    return new Promise((resolve) => {
        setTimeout(() => {
            var result = arr.filter(num => num % 2 === 0 && num != 0);
            result = [...new Set(result)];
            resolve(result);
        }, 1000);
    });
}
filterEvenNumber([1, 2, 3, 4, 5, 4, 3, 2, 1]).then(result => {
    console.log(result);
});
