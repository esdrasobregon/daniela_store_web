
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
            document.location.replace('/admin/pages/products/product');
        }
    };

}
//getting the actual user with a post request
//get user
async function getUserWithPost() {
    showPleaseWait();
    var data = {
        userEmail: loginForm.userEmail.value.replace(/\s/g, ""),
        userPassword: loginForm.userPassword.value.replace(/\s/g, "")
    };
    isNotValid(data.userEmail) ? alert("You can't type this characters") :
        isNotValid(data.userPassword) ? alert("You can't type this characters") : callServer(data);
    hidePleaseWait();

}
function callServer(data) {
    if (data.userPassword.length > 8
        && data.userPassword.length < 22 && (data.userEmail.length > 8
            && data.userEmail.length < 40)) {
        const options = {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        }
        fetch(localHost + "/user", options).then(
            result => result.json()
        ).then((result) => {
            sessionStorage.setItem('currentUser', JSON.stringify(result));
            result == null ? alert(credentialsErrorMessage) : document.location.replace('/admin/pages/products/product');
            loginForm.reset();
        });
        hidePleaseWait();
    } else alert('hola');
}