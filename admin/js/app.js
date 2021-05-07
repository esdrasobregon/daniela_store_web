window.rootFile;

window.content;

function verifyUserCredentials() {
  if (currentUser != null) {
    if (!currentUser.userState) {
      document.location.replace("/pages/login");
    } else {
      !currentUser.userState ?
        document.location.replace("/pages/login") :
        sessionStorage.getItem('allProducts') == null
          ? document.location.replace("/pages/login")
          : console.log("");
    }
  } else {
    document.location.replace("/pages/login");
  }
}