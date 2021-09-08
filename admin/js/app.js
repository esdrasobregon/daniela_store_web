//#region variables

window.rootFile;

window.content;

//#endregion variables

//#region functions
/**
 * this function verify the current user
 * credentials
 * @returns return a bool value, true if the credencial
 * are confirm else returns false
 */
function verifyUserCredentials() {
  var flag = true;
  if (currentUser == null) {
    flag = false;
  } else {
    currentUser.userState ? flag = true : flag = false;
  }
  return flag;
}
//#endregion functions