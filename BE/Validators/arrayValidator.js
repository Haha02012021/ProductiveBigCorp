const checkIntArray = (value) => {
    let check = true;
    for (let i = 0; i< value.length; i++) {
        if (! Number.isInteger(value[i])) {
            check = false;
            break;
        }
    }
    if(!check) {
        return Promise.reject('Array not contains all integer');
    } else {
        return Promise.resolve('passed');
    }
}

module.exports = {
    checkIntArray,
}