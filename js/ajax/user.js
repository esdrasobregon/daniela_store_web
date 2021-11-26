/**
 * this function call the server to log an user
 * @param {*} userCredentials user login info nedded 
 * like email and password
 * to login
 */
async function loginCall(userCredentials) {
    const options = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(userCredentials)
    }
    var result =
        await fetch(localHost + "/user", options).then(
            result => result.json()
        ).then((result) => {
            return result.user;
        }).catch(error => {
            console.error('Error:', error);
            return null;
        });;
    return result;

}