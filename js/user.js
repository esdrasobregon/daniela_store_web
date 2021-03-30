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
    var allProd = [];
    await db.collection("user")
        .where("userEmail", "==", userLogin.userEmail)
        .where("userPassword", "==", userLogin.userPassword)
        .get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                var allUser = {
                    idUser: doc.id,
                    userEmail: doc.data().userEmail,
                    userPassword: doc.data().userPassword,
                    userState: doc.data().userState,
                    userRol: doc.data().userRol
                };
                allProd.push(allUser);
            });
        })
        .catch(function (error) {
            console.log("Error getting documents: ", error);
        });
    return allProd;
}
module.exports = {
    getUser: getUser
}