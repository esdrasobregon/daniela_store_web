
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
//deleting a firebase file
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

