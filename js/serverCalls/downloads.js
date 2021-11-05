/**
 * this function calls the server
 * to retreive profile
 */
async function getDonwloadFile(folder) {
  let url = localHost + "/downloads/";
  var filename = "download.bmp";
  await fetch(url, {
    method: 'GET',
  }).then(function (resp) {
    return resp.blob();
  }).then(function (blob) {
    console.log(blob);
    var e = document.createEvent('MouseEvents'),
    a = document.createElement('a');
    a.download = filename;
    a.href = window.URL.createObjectURL(blob);
    a.dispatchEvent(e);
  });
}