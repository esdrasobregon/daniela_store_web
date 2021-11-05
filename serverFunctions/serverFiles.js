//#region variables

const fs = require("fs");
const uploadLocation = "./public/upload/";
const rootLocation = "./public/";

//#endregion variables

class serverFiles {

    //#region functions
    /**
     * this fuction set up the file to be upload
     * @param {*} fields inconming form fields
     * @param {*} files incomming form files
     * @returns a bool type confirmation
     */
    async addFile(fields, files) {
        var result = false;
        console.log("method add file called");
        if (files.inputfile != undefined) {
            if (checkImageFileType(files.inputfile)) {
                var extension = files.inputfile.name.substr(files.inputfile
                    .name.lastIndexOf("."));
                var newPath = uploadLocation + fields.name + extension;
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
     * this fuction set up the file to be upload
     * @param {*} fields inconming form fields
     * @param {*} files incomming form files
     * @returns a bool type confirmation
     */
    async addSharedFile(fields, files) {
        var result = false;
        console.log("method add file called");
        var extension = files.inputfile.name.substr(files.inputfile
            .name.lastIndexOf("."));
        var newPath = "./public/shared/images/" + fields.name + extension;
        var fileNewName = fields.name;
        console.log("adding file to the server");
        await this.uploadImgeFile(files, extension, newPath, fileNewName);
        result = true;
        return result;
    }

    /**
     * this fuction set up the file to be upload
     * @param {*} fields inconming form fields
     * @param {*} files incomming form files
     * @returns a bool type confirmation
     */
    async addDownloadFile(fields, files) {
        var result = false;
        console.log("method add file called");
        var extension = files.inputfile.name.substr(files.inputfile
            .name.lastIndexOf("."));
        var newPath = "./public/downloads/" + fields.name + extension;
        var fileNewName = fields.name;
        console.log("adding file to the server");
        await this.uploadImgeFile(files, extension, newPath, fileNewName);
        result = true;
        return result;
    }

    /**
     * this fuction deletes a server file
     * @param {*} fileName file name
     * @returns a bool type confirmation
     */
    async deleteFile(fileName) {
        var result = true;
        console.log("method delete file called");
        try {
            fs.unlinkSync(uploadLocation + fileName);
        } catch (error) {
            console.log("error deleting file: " + error);
            result = false;
        }
        return result;
    }
    /**
     * this fuction deletes a server file
     * @param {*} fileFullLocationName file location + name
     * @returns a bool type confirmation
     */
    async deleteShareFile(fileFullLocationName) {
        var result = true;
        console.log("deleting file called: " + fileFullLocationName);
        try {
            fs.unlinkSync(rootLocation + fileFullLocationName);
        } catch (error) {
            console.log("error deleting file: " + error);
            result = false;
        }
        return result;
    }
    /**
     * this function checks if the file is indeed a
     * image type
     * @param {*} file file type object
     * @returns a bool type confitmation
     */
    checkImageFileType(file) {
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
    async uploadImgeFile(files, extension, newPath, name) {
        // fs.rename(files.inputfile.path, newPath, async function (errorRename) {
        //     console.log(uploadLocation + name + extension);
        // });
        fs.renameSync(files.inputfile.path, newPath);
        console.log(newPath + name + extension);
    }
    /**
     * this function gets the file list of a given directory
     * @param {*} folderName a file type array
     * @returns {*} the file list
     */
    async getFileList(folderName) {
        var result = [];
        console.log(rootLocation + folderName + "/");
        fs.readdirSync(rootLocation + folderName + "/")
            .forEach(file => {
                console.log(file);
                result.push(file);
            });
        return result;
    }
    /**
     * this function write on the given file
     * @param {*} newSettings to be write
     * @returns {*} the file list
     */
    async writeSettings(newSettings) {
        var result = false;
        const location = rootLocation + "shared/settings/page.js";
        try {
            fs.writeFileSync(location, 'const settings = ' +
                JSON.stringify(newSettings) + ";\n" +
                'module.exports = settings;');
            result = true;
        } catch (error) {
            console.log("Error writting settings: " + error);
        }
        return result;
    }
    //#endregion functions

}

//#region exports 
const servFiles = new serverFiles();
module.exports = servFiles;
//#endregion exports