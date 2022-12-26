const brokenOrDone = (error, {req}) => {
    if(req.body.done && error) {
        return Promise.reject('only error or done')
    } else {
        return Promise.resolve('passed');
    }
} 

module.exports = {
    brokenOrDone,
}