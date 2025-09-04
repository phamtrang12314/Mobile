new Promise<string>(resolve => {
    setTimeout(() => {
        console.log('Hello Async');
    }, 2000)
})