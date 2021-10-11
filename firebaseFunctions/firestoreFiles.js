const firebaseAdmin = require("../firebaseFunctions/firebaseSettings");

//#region function

/**
 * this function upload a file to firebase storage
 * @param {*} filename the file name
 * @param {*} fileNewName the new name for the file
 * @param {*} contentType the file type
 * @returns a bool type confirmation
 */
const uploadFile = async (filename, fileNewName, contentType) => {

    try {
        await firebaseAdmin.bucket.upload(filename, {
            destination: fileNewName,
            metadata: {
                contentType: contentType,
                // Enable long-lived HTTP caching headers
                // Use only if the contents of the file will never change
                // (If the contents will change, use cacheControl: 'no-cache')
                cacheControl: 'public, max-age=31536000',

            },
        }).then((result) => {
            console.log(`${filename} uploaded to ${firebaseAdmin.bucket}.`);
            console.log("Result: " + result);
            return true;
        }).catch((error) => {
            console.log("Error uploading firebase file: " + error);
            return false;
        });
    } catch (error) {
        console.log("Error uploading firestore file: " + error);
        return false;
    }


}
/**
 * this function deletes a firebase store file
 * @param {*} filename the file name
 */
const deleteFile = async (filename) => {
    // delete a firestore file
    try {
        await firebaseAdmin.bucket.file(filename)
            .delete().then((result) => {
                console.log(result + " firestore file deleted");
            }).catch((err) => {
                console.log("error deleting firestore file: " + err);
            });
    } catch (error) {
        console.log("error deleting firestore file: " + error);
    }
}

//#endregion function

//#region export
module.exports = {
    uploadFile: uploadFile,
    deleteFile: deleteFile
}
//#endregion export