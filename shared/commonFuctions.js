function getCustomDate(pDateObject) {
    var dateResult = { year: "", date: "", month: "" };
    dateResult.year = pDateObject.toDate().getFullYear();
    pDateObject.toDate().getMonth() < 10 ? dateResult.month = "0" + pDateObject.toDate().getMonth() : dateResult.month += pDateObject.toDate().getMonth();
    pDateObject.toDate().getDate() < 10 ? dateResult.date = "0" + pDateObject.toDate().getDate() : dateResult.date += pDateObject.toDate().getDate();
    return dateResult;
}