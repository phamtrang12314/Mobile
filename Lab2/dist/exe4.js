"use strict";
function randomNumber() {
    return new Promise((resolve, reject) => {
        var num = Math.floor(Math.random() * 100);
        if (num >= 50) {
            console.log('RESOLVE');
            resolve(num);
        }
        else {
            console.log('REJECT');
            reject(num);
        }
    });
}
randomNumber().then(num => {
    console.log(num);
}).catch(num => {
    console.log(num);
});
