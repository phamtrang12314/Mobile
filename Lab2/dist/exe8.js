"use strict";
new Promise((resolve, reject) => {
    resolve(2);
}).then(num => {
    var square = num * num;
    console.log('Square:', square);
    return square;
}).then(num => {
    var double = num * 2;
    console.log('Double:', double);
    return double;
}).then(num => {
    var add5 = num + 5;
    console.log('Add to 5:', add5);
    return add5;
}).then(result => {
    // resolve(result);
    console.log('Result:', result);
}).catch(error => {
    console.log('Something went wrong');
});
