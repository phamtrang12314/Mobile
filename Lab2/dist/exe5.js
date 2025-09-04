"use strict";
function simulateTask(time) {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log(`Time delay: ${time}s`);
            resolve('Task done');
        }, time * 1000); // init: sencond
    });
}
simulateTask(Math.floor(Math.random() * 5) + 1).then(messenger => {
    console.log(messenger);
});
