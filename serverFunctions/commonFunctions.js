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

function getCustomDate(pDateObject) {
    var dateResult = {
        year: "",
        date: "",
        month: ""
    };
    dateResult.year = pDateObject.toDate().getFullYear();
    pDateObject.toDate().getMonth() < 10 ?
        dateResult.month = "0" + pDateObject.toDate().getMonth() :
        dateResult.month += pDateObject.toDate().getMonth();
    pDateObject.toDate().getDate() < 10 ?
        dateResult.date = "0" + pDateObject.toDate().getDate() :
        dateResult.date += pDateObject.toDate().getDate();
    return dateResult;
}
/**
 * this function creates a customized date
 * object and returns it
 */
function getCustomDateFromNewDate() {
    var today = new Date();
    var dateResult = {
        year: "",
        date: "",
        month: ""
    };
    dateResult.year = today.getFullYear();
    today.getMonth() < 10 ?
        dateResult.month = "0" + today.getMonth() :
        dateResult.month += today.getMonth();
    today.getDate() < 10 ?
        dateResult.date = "0" + today.getDate() :
        dateResult.date += today.getDate();
    return dateResult;
}
module.exports = {
    isNotValid: isNotValid,
    isEmail: isEmail,
    getCustomDate: getCustomDate,
    getCustomDateFromNewDate: getCustomDateFromNewDate
}