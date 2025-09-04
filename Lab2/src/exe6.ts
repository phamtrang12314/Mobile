function multipleTask(name: string, delay: number, value: number): Promise<string> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(`Name: ${name} - Delay: ${delay} - Value: ${value}`);
            if(value >= 5)
                resolve('SUCCESS');
            else reject('FAILURE');
        }, delay);
    })
}

var task1 = multipleTask('Task 1', 1000, Math.floor(Math.random() * 10));
var task2 = multipleTask('Task 2', 2000, Math.floor(Math.random() * 10));
var task3 = multipleTask('Task 3', 3000, Math.floor(Math.random() * 10));

Promise.all([task1, task2, task3]).then(messenger => {
    console.log(messenger);
}).catch(messenger => console.log(messenger))