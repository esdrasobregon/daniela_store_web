
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
        userEmail: loginForm.userEmail.value,
        userPassword: loginForm.userPassword.value
    };
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
    });
    hidePleaseWait();
}
// $('form.login').on('submit', function () {
//     var that = $(this),
//         url = that.attr('action'),
//         type = that.attr('method'),
//         data = {};
//     that.find('[name]').each(function (index, value) {
//         var that = $(this),
//             name = that.attr('name'),
//             value = that.val();
//         data[name] = value;
//     });
//     $.ajax({
//         url: url,
//         type: type,
//         data: data,
//         succsess: function (response) {
//             console.log(response);
//         }
//     });
//     return false;
// });