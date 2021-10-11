const firebaseAdmin = require("../../firebaseFunctions/firebaseSettings");
class User {
    constructor(idUser, userEmail, userState, userPassword, userRol) {
        this.userEmail = userEmail;
        this.idUser = idUser;
        this.userState = userState;
        this.userRol = userRol;
        this.userPassword = userPassword;
    }
    /**
     * this function calls the firebase database to 
     * retreive a user register
     * @param {*} userLogin a user object
     * @returns the user register
     */
    async getUser(userLogin) {
        var currentUser = null;
        await firebaseAdmin.db.collection("user")
            .where("userEmail", "==", userLogin.userEmail)
            .where("userPassword", "==", userLogin.userPassword)
            .get().then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    currentUser = {
                        idUser: doc.id,
                        userEmail: doc.data().userEmail,
                        userPassword: doc.data().userPassword,
                        userState: doc.data().userState,
                        userRol: doc.data().userRol
                    };
                });
            })
            .catch(function (error) {
                console.log("Error getting documents: ", error);
            });
        return currentUser;
    }
}
const user = new User();

module.exports = {
    user: user
}