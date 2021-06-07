
//end

function checkImageFileType(file) {
    //allow ext
    const fileType = /jpeg|jpg|png|gif/;
    var flag = fileType.test(file.type);
    flag ? flag = file.size > 10000 && file.size < 500000 :
        flag = false;
    console.log("image: " + flag);
    return flag;
}

function uploadImgeFile(fs, files, extension, newPath, name) {

    fs.rename(files.inputGroupFile01.path, newPath, async function (errorRename) {
        console.log("./upload/" + name + extension);
    });
}
module.exports = {
    uploadImgeFile: uploadImgeFile,
    checkImageFileType: checkImageFileType
}