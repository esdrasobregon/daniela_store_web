//call the server
function callServer() {
    const formData = createFormDataCategory();
    fetch(localHost + "/addCategory", {
            method: 'POST',
            body: formData
        }).then(response => response.json())
        .then(result => {
            result.idCategory == "" ?
                alert(addImageMessage) :
                afterServerCallsettings(result);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}
//call the server
function callDeleteServer(categoryToDelete) {
    const options = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(categoryToDelete)
    }
    fetch(localHost + "/deleteCategory", options).then(
        result => result.json()
    ).then((result) => {
        var cat = result.categoryToDelete;
        result.success ? afterDeletingSettings(cat) :
            alert("Category not deleted: " + result.success);
    }).catch((error) => {
        alert("Error: " + error)
    });
}