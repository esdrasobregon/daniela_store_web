function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#imageFirebase')
                .attr('src', e.target.result);
            document.getElementById('inputImage').innerHTML = uploadFileMessage;
        };
        reader.readAsDataURL(input.files[0]);
    }
}

function readPurchaseURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#purchaseImage')
                .attr('src', e.target.result);
            document.getElementById('inputImage').innerHTML = uploadFileMessage;
        };
        reader.readAsDataURL(input.files[0]);
    }
}
/**
 * this function reads a file from any input html tag
 * @param {*} input the input tag where the file is located
 * @param {*} idInput the input tag id
 * @param {*} idImageTag the id of the tag to show the image 
 */
function readImageURL(input, idInput, idImageTag) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {

            document.getElementById(idImageTag).setAttribute("src", e.target.result);
            document.getElementById(idInput)
                .innerHTML = uploadFileMessage;
        };
        reader.readAsDataURL(input.files[0]);
    }
}
/**
 * this function reads a file from any input html tag
 * @param {*} input the input tag where the file is located
 * @param {*} idImageTag the id of the tag to show the image 
 */
 function readNewImageURL(input, idImageTag) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {

            document.getElementById(idImageTag).setAttribute("src", e.target.result);
            document.getElementById(input.id)
                .innerHTML = uploadFileMessage;
        };
        reader.readAsDataURL(input.files[0]);
    }
}
//upload images to firestorage
async function uploadImage(imageName) {
    const ref = firebase.storage().ref();
    const file = document.querySelector("#inputGroupFile01").files[0];
    const name = imageName;
    const metadata = {
        contentType: file.type
    };
    showPleaseWait();
    const task = await ref.child(name).put(file, metadata).then(snapshot => snapshot.ref.getDownloadURL())
        .then(url => {
            console.log(url);
            document.querySelector("#imageFirebase").src = url;
            alert(uploadFileMessage);
            hidePleaseWait();

        }).catch(console.error);
}
/**
 *this function deletes a firebase store file
 * @param {*} fileName request call object
 */
async function deleteFile(fileName) {
    // Create a reference to the file to delete
    const ref = firebase.storage().ref();
    var desertRef = ref.child(fileName);
    // Delete the file
    desertRef.delete().then(function () {
        alert(fileDeletedMessage);
    }).catch(function (error) {
        alert(fileNotDeletedMessage);
    });
}