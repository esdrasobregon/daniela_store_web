//call the server
function callServer() {
    const formData = createFormDataAddCategory();
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
/**
 * this function calls the server to add a
 * category object
 */
function addCategoryServerCall() {
    const formData = createFormDataAddCategory();
    fetch(localHost + "/categories", {
            method: 'POST',
            body: formData
        }).then(response => response.json())
        .then(result => {
            console.log(result.category);
            result.success ?
                afterServerCallsettings(result.category) :
                alert(addImageMessage);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}
/**
 * this function calls the server to update a
 * category object
 */
function updateCategoryServerCall() {
    const formData = createFormDataUpdateCategory();
    fetch(localHost + "/categories", {
            method: 'POST',
            body: formData
        }).then(response => response.json())
        .then(result => {
            console.log(result.category);
            result.success ?
                afterServerCallsettings(result.category) :
                alert(addImageMessage);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}
/**
 * call this function to delete a category 
 * object 
 * @param {*} categoryToDelete category object
 */
function callDeleteServer(categoryToDelete) {
    var data = {
        categoryToDelete: categoryToDelete,
        case: "delete"
    }
    const options = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    fetch(localHost + "/categories", options).then(
        result => result.json()
    ).then((result) => {
        var cat = result.categoryToDelete;
        result.success ? afterDeletingSettings(cat) :
            alert("Category not deleted: " + result.success);
    }).catch((error) => {
        alert("Error: " + error)
    });
}