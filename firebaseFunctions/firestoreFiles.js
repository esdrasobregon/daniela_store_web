// Testing out upload of file
const uploadFile = async (filename, firebaseAdmin, fileNewName, contentType) => {

    // Uploads a local file to the bucket
    await firebaseAdmin.bucket.upload(filename, {
        destination: fileNewName,
        metadata: {
            contentType: contentType,
            // Enable long-lived HTTP caching headers
            // Use only if the contents of the file will never change
            // (If the contents will change, use cacheControl: 'no-cache')
            cacheControl: 'public, max-age=31536000',

        },
    });

    console.log(`${filename} uploaded to ${firebaseAdmin.bucket}.`);
}
const deleteFile = async (filename, firebaseAdmin) => {
    // delete a firestore file
    await firebaseAdmin.bucket.file(filename)
        .delete().then((result) => {
            console.log(result + "deleted");
            return result;
        }).catch((err) => {
            return err;
        });
}
module.exports = {
    uploadFile: uploadFile,
    deleteFile: deleteFile
}