"use strict";
function multipleTask1(name, delay, value) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(`Name: ${name} - Delay: ${delay} - Value: ${value}`);
            if (value >= 5)
                resolve('SUCCESS');
            else
                reject('FAILURE');
        }, delay);
    });
}
var task11 = multipleTask1('Task 11', 1000, Math.floor(Math.random() * 10));
var task22 = multipleTask1('Task 22', 2000, Math.floor(Math.random() * 10));
var task33 = multipleTask1('Task 33', 3000, Math.floor(Math.random() * 10));
Promise.race([task11, task22, task33]).then(messenger => {
    console.log(messenger);
}).catch(messenger => console.log(messenger));
