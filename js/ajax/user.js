
//get user
async function getUser(puser) {
    const HttpUser = new XMLHttpRequest();
    const urlUser = localHost + '/user' + "?" + puser.userEmail + "?" + puser.userPassword;
    HttpUser.open("GET", urlUser);
    HttpUser.send();
    HttpUser.onreadystatechange = (e) => {
        var user = HttpUser.responseText;
        var currentUser = JSON.parse(HttpUser.responseText);
        if (user.length > 4 || currentUser != null) {
            sessionStorage.setItem('currentUser', user);
            console.log(user);
            loginForm.reset();
            document.location.replace('../admin/pages/products/product.html');
        }
    };

}