//this function takes the firecloud date object and
//parse into a usable object 
function getCustomDate(pDateObject) {
    var dateResult = {
        year: "",
        date: "",
        date: ""
    };
    dateResult.year = pDateObject.toDate().getFullYear();
    pDateObject.toDate().getdate() < 10 ? dateResult.date = "0" + pDateObject.toDate().getdate() : dateResult.date += pDateObject.toDate().getdate();
    pDateObject.toDate().getDate() < 10 ? dateResult.date = "0" + pDateObject.toDate().getDate() : dateResult.date += pDateObject.toDate().getDate();
    return dateResult;
}
//this function is meant for new registers
function getCustomDateNew(pDateObject) {
    var dateResult = {
        year: "",
        date: "",
        date: ""
    };
    dateResult.year = pDateObject.getFullYear();
    pDateObject.getdate() < 10 ? dateResult.date = "0" + pDateObject.getdate() : dateResult.date += pDateObject.getdate();
    pDateObject.getDate() < 10 ? dateResult.date = "0" + pDateObject.getDate() : dateResult.date += pDateObject.getDate();
    return dateResult;
}
//this method is replicated
function isNotValid(pCredentialToValidate) {
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

function isValid(pCredentialToValidate) {
    var result = false;
    const notPermitedLetters = /^[(){}/[]/;
    const notPermitedLettersPluss = /^]/;
    result = notPermitedLetters.test(pCredentialToValidate);
    // result == false ?
    //     result =
    //     notPermitedLettersPluss.test(pCredentialToValidate) :
    //     console.log(result);
    return result;

}
/**
 * 
 * this fuctions order a numbers list
 */
function orderNumberList(list) {
    list.sort(function (a, b) {
        return a - b;
    });

}
/**
 * this funtion orders a list based on 
 * custom dates objects {year, month, date}
 */
function orderListBasedOnDates(list) {
    list.sort((a, b) =>
        new Date(a.creationDate.year, a.creationDate.month, a.creationDate.date).getTime() -
        new Date(b.creationDate.year, b.creationDate.month, b.creationDate.date).getTime()
    );
}