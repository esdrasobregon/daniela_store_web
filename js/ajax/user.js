
//get user
async function getUser(puser) {
    const HttpUser = new XMLHttpRequest();
    const urlUser = localHost + '/user' + "?" + puser.userEmail + "?" + puser.userPassword;
    HttpUser.open("GET", urlUser);
    HttpUser.send();
    HttpUser.onreadystatechange = (e) => {
        var user = HttpUser.responseText;
        if (user.length > 3) {
            sessionStorage.setItem('currentUser', user);
            console.log(user);
            loginForm.reset();
            document.location.replace('../admin/pages/products/product.html');
        }
    };

}