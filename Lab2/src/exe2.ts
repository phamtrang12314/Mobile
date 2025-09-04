function testPromise(): Promise<number> {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(10)
        }, 1000);
    })
}

testPromise().then(num => {
    console.log(num)
})