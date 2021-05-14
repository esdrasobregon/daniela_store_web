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
module.exports = {
    isNotValid: isNotValid
}