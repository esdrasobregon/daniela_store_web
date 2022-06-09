class localCookies {

    /**
     * this function deletes the current user
     * cookie
     * @param {*} res response server object
     */
    deleteCookies(res) {
        try {
            res.cookie("currentUser", '', {
                expires: new Date(0)
            });
            console.log('Cookie has been deleted successfully');
        } catch (error) {
            console.log("error" + error);
        }

    }

    /**
     * this function sets the current user cookie
     * @param {*} res a response server object
     * @param {*} user a user object
     */
    setUserCookie(res, user) {
        res.cookie(`currentUser`, JSON.stringify({
            idUser: user.idUser,
            userEmail: user.userEmail,
            userPassword: user.userPassword,
            userState: user.userState,
            userRol: user.userRol
        }), {
            maxAge: 365 * 24 * 60 * 60 * 1000,
            // expires works the same as the maxAge
            expires: new Date('01 12 2021'),
            secure: true,
            httpOnly: true,
            sameSite: 'lax'
        });
        console.log("user cookie ready");
    }

    /**
     * this function verify the current user
     * to be deleted
     * @param {*} req server request object
     * @param {*} res server response object
     * @param {*} keys server own variables
     */
    verifyToDeleteUserCookie(req, res, keys) {

        try {
            if (req.cookies.hasOwnProperty("currentUser")) {
                this.deleteCookies(res);
                keys.currentUser = null;
            }
        } catch (error) {
            keys.currentUser = null;
            console.log("error: " + error);
        }
    }

    /**
     * this function checks if the current user cookie
     * @param {*} cookies a cookie object
     * @returns a confirmation bool
     */
    userCookieExist(cookies) {
        var result = true;
        try {
            if (cookies.hasOwnProperty("currentUser")) {} else {
                result = false;
            }
        } catch (error) {
            console.log("error: " + error);
            result = false;
        }
        return result;
    }

    /**
     * this function gets the current user cookie
     * @param {*} cookies a cookie object
     * @param {*} keys server own variables
     */
    getUserCookie(cookies, keys) {
        console.log(cookies.currentUser);
        try {
            keys.currentUser = JSON.parse(cookies.currentUser);
        } catch (error) {
            keys.currentUser = null;
            console.log("error: " + error);
        }
    }
}
const lCookies = new localCookies();
module.exports = lCookies;