const checkSpecialCharacters = (value) => {
    const pattern= /[\t\r\n]|(--[^\r\n]*)|(\/\*[\w\W]*?(?=\*)\*\/)/gi;
    const regex = new RegExp(pattern);
    if(regex.test(value)) {
        return Promise.reject('special characters are not allowed');
    } else {
        return Promise.resolve('passed');
    }
}

module.exports = {
    checkSpecialCharacters,
}