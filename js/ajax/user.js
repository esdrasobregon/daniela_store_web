/**
 * this function call the server to log an user
 * @param {*} userCredentials user login info nedded 
 * like email and password
 * to login
 */
function loginCall(userCredentials) {
    const options = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(userCredentials)
    }
    fetch(localHost + "/user", options).then(
        result => result.json()
    ).then((result) => {
        console.log(result);
        if (result.success) {
            loginForm.reset();
            //sessionStorage.setItem('currentUser', JSON.stringify(result.user));
            document.location.replace("/products/?admProductPage");
        } else {
            alert(credentialsErrorMessage);
        }
    });
    hidePleaseWait();

}