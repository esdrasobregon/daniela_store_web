//this function takes the firecloud date object and
//parse into a usable object 
function getCustomDate(pDateObject) {
    var dateResult = {
        year: "",
        date: "",
        month: ""
    };
    dateResult.year = pDateObject.toDate().getFullYear();
    pDateObject.toDate().getDate() < 10 ?
        dateResult.date = "0" + pDateObject.toDate().getDate() :
        dateResult.date += pDateObject.toDate().getDate();
    pDateObject.toDate().getDate() < 10 ?
        dateResult.month = "0" + pDateObject.toDate().getMonth() :
        dateResult.month += pDateObject.toDate().getMonth();
    return dateResult;
}
//this function is meant for new registers
function getCustomDateNew(pDateObject) {
    var dateResult = {
        year: "",
        date: "",
        month: ""
    };
    dateResult.year = pDateObject.getFullYear();
    pDateObject.getDate() < 10 ?
        dateResult.date = "0" + pDateObject.getDate() :
        dateResult.date += pDateObject.getDate();
    pDateObject.getMonth() < 10 ?
        dateResult.month = "0" + pDateObject.getMonth() :
        dateResult.date += pDateObject.getMonth();
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
/**
 * this function checks if is a file loaded
 * @param {*} file 
 * @returns a bool confirmation
 */
function fileUploaded(file) {
    if (file == undefined) {
        return false;
    } else return true;
}


/**
 * this function gives some time to wait
 * use it for a large request
 * @param {*} sometime time to await 
 */
async function giveSomeTime(sometime) {
    showPleaseWait();
    setTimeout(() => {
        hidePleaseWait();
    }, sometime * 1500);

}

/**
 * this function clear the select
 * image option, 
 * use it after add or delete one
 */
function resetSelectTag(sellectTag) {
    while (sellectTag.length > 0) {
        sellectTag.remove(0)
    }
}
/**
 * this function shows the selected image name
 * form the select list
 * @param {*} imageVisor the image visor tag
 * @param {*} imageName the image name
 */
function showImage(imageVisor,imageName) {
    imageVisor
        .setAttribute("src",imageName);
}