//this function takes the firecloud date object and
//parse into a usable object 
function getCustomDate(pDateObject) {
    var dateResult = { year: "", date: "", month: "" };
    dateResult.year = pDateObject.toDate().getFullYear();
    pDateObject.toDate().getMonth() < 10 ? dateResult.month = "0" + pDateObject.toDate().getMonth() : dateResult.month += pDateObject.toDate().getMonth();
    pDateObject.toDate().getDate() < 10 ? dateResult.date = "0" + pDateObject.toDate().getDate() : dateResult.date += pDateObject.toDate().getDate();
    return dateResult;
}
//this function is meant for new registers
function getCustomDateNew(pDateObject) {
    var dateResult = { year: "", date: "", month: "" };
    dateResult.year = pDateObject.getFullYear();
    pDateObject.getMonth() < 10 ? dateResult.month = "0" + pDateObject.getMonth() : dateResult.month += pDateObject.getMonth();
    pDateObject.getDate() < 10 ? dateResult.date = "0" + pDateObject.getDate() : dateResult.date += pDateObject.getDate();
    return dateResult;
}