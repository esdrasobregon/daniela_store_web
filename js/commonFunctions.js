function isMobile() {
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    // true for mobile device
    return true;
  } else {
    // false for not mobile device
    return false;
  }
}

function getCustomDate(pDateObject) {
  var dateResult = {
    year: "",
    date: "",
    month: ""
  };
  dateResult.year = pDateObject.getFullYear();
  pDateObject.getMonth() < 10 ?
    dateResult.month = "0" + pDateObject.getMonth() :
    dateResult.month += pDateObject.getMonth();
  pDateObject.getDate() < 10 ?
    dateResult.date = "0" + pDateObject.getDate() :
    dateResult.date += pDateObject.getDate();
  return dateResult;
}