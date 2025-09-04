"use strict";
// must change tsconfig.json file
// "target": es2018
// "lib": ["es2018", "dom"]
new Promise(resolve => {
    resolve('SUCCESS');
}).then(messenger => console.log(messenger))
    .finally(() => console.log('Done'));
