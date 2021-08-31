//#region variables

const fs = require("fs");

//#endregion variables

//#region functions
/**
 * this fuction set up the file to be upload
 * @param {*} fields inconming form fields
 * @param {*} files incomming form files
 * @returns a bool type confirmation
 */
async function addFile(fields, files) {
    var result = false;
    console.log("method add file called");
    if (files.inputfile != undefined) {
        if (checkImageFileType(files.inputfile)) {
            var extension = files.inputfile.name.substr(files.inputfile
                .name.lastIndexOf("."));
            var newPath = "./upload/" + fields.name + extension;
            var fileNewName = fields.name;
            console.log("adding file to the server");
            await uploadImgeFile(files, extension, newPath, fileNewName);
            result = true;
        } else {
            console.log("no available file, process aborted!");
        }
    }
    return result;
}
/**
 * this function checks if the file is indeed a
 * image type
 * @param {*} file file type object
 * @returns a bool type confitmation
 */
function checkImageFileType(file) {
    //allow ext
    const fileType = /jpeg|jpg|png|gif/;
    var flag = fileType.test(file.type);
    flag ? flag = file.size > 10000 && file.size < 3000000 :
        flag = false;
    console.log("image: " + flag);
    return flag;
}
/**
 * this fuction upload a file to the server
 * @param {*} files a file type array
 * @param {*} extension the file extension
 * @param {*} newPath the new location for the file to be uploaded
 * @param {*} name the file name
 */
function uploadImgeFile(files, extension, newPath, name) {
    fs.rename(files.inputfile.path, newPath, async function (errorRename) {
        console.log("./upload/" + name + extension);
    });
}
//#endregion functions

//#region exports 
module.exports = {
    uploadImgeFile: uploadImgeFile,
    checkImageFileType: checkImageFileType,
    addFile: addFile
}
//#endregion exports