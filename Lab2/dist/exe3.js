"use strict";
function testPromise2() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve('Something went wrong');
        }, 1000);
    });
}
testPromise2().then(messenger => {
    console.log(messenger);
});
