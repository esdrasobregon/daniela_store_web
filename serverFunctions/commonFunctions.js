//this method verified the security of the forms contents
//is replicated in shared/commonFuntions
var isNotValid = function (pCredentialToValidate) {
    var flag = false;
    flag = pCredentialToValidate.includes('(');
    flag == false ? flag = pCredentialToValidate.includes(')') : console.log(flag);
    flag == false ? flag = pCredentialToValidate.includes('{') : console.log(flag);
    flag == false ? flag = pCredentialToValidate.includes('}') : console.log(flag);
    flag == false ? flag = pCredentialToValidate.includes('/') : console.log(flag);
    flag == false ? flag = pCredentialToValidate.includes('[') : console.log(flag);
    flag == false ? flag = pCredentialToValidate.includes(']') : console.log(flag);
    return flag;
}
function isEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
module.exports = {
    isNotValid: isNotValid,
    isEmail: isEmail
}