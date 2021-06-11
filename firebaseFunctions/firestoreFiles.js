// Testing out upload of file
const uploadFile = async (filename, firebaseAdmin, fileNewName, contentType) => {

    // Uploads a local file to the bucket
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
        }).catch((error) => {
            console.log("Error uploading firebase file: " + error);
            return error;
        });
    } catch (error) {
        console.log("Error uploading firestore file: " + error);
        return error;
    }


}
const deleteFile = async (filename, firebaseAdmin) => {
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
module.exports = {
    uploadFile: uploadFile,
    deleteFile: deleteFile
}