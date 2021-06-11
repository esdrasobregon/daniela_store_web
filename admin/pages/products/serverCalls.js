//call the server
function callServer() {
    const formData = createFormDataProduct();
    fetch(localHost + "/addProduct", {
            method: 'POST',
            body: formData
        }).then(response => response.json())
        .then(result => {
            result.idProduct == "" ?
                alert(addImageMessage) :
                afterServerCallsettings(result);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}
//call the server
function callDeleteServer(productToDelete) {
    const options = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(productToDelete)
    }
    fetch(localHost + "/deleteProduct", options).then(
        result => result.json()
    ).then((result) => {
        var p = result.productToDelete;
        result.success ? afterDeletingSettings(p) :
            alert("Product not deleted: " + result.success);
    }).catch((error) => {
        alert("Error: " + error)
    });
}