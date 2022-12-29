const checkSpecialCharacters = (value) => {
    const pattern= /[\t\r\n]|(--[^\r\n]*)|(\/\*[\w\W]*?(?=\*)\*\/)/gi;
    const regex = new RegExp(pattern);
    if(regex.test(value)) {
        return Promise.reject('special characters are not allowed');
    } else {
        return Promise.resolve('passed');
    }
}

const checkPhone = (value) => {
    const pattern= /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;
    const regex = new RegExp(pattern);
    if(regex.test(value)) {
        return Promise.resolve('passed');
    } else {
        return Promise.reject('must be phone num');
    }
}

module.exports = {
    checkSpecialCharacters,
    checkPhone,
}