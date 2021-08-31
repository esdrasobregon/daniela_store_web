/**
 * this function calls the server to add 
 * a product object
 */
function callAddServer() {
    const formData = createFormDataProduct();
    fetch(localHost + "/products", {
            method: 'POST',
            body: formData
        }).then(response => response.json())
        .then(result => {
            console.log(result);
            result.success ?
                afterServerCallsettings(result.product) :
                alert(addImageMessage);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

/**
 * this function calls the server to update 
 * a product object 
 */
function callUpdateServer() {
    const formData = createFormDataProduct();
    fetch(localHost + "/products", {
            method: 'put',
            body: formData
        }).then(response => response.json())
        .then(result => {
            console.log(result);
            result.success ?
                afterServerCallsettings(result.product) :
                alert(addImageMessage);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

/**
 * this function calls the server to delete 
 * a product object
 * @param {*} productToDelete product object  
 */
function callDeleteServer(productToDelete) {
    const options = {
        method: 'delete',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(productToDelete)
    }
    fetch(localHost + "/products", options).then(
        result => result.json()
    ).then((result) => {
        var p = result.productToDelete;
        result.success ? afterDeletingSettings(p) :
            alert("Product not deleted: " + result.success);
    }).catch((error) => {
        alert("Error: " + error)
    });
}
