class webUser {
    constructor(idUser, userEmail, userState, userPassword, userRol) {
        this.userEmail = userEmail;
        this.idUser = idUser;
        this.userState = userState;
        this.userRol = userRol;
        this.userPassword = userPassword;
    }
}
//getting all products data
var getUser = async function (db, userLogin) {
    var currentUser = null;
    await db.collection("user")
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
module.exports = {
    getUser: getUser
}