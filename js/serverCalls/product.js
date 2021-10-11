/**
 * this function calls the server to add a
 * product register to the database
 * @param {*} formData is a formdata object 
 * @returns a server response object
 */
async function callAsyncAddServer(formData) {
    var result = await fetch(localHost + "/products", {
            method: 'POST',
            body: formData
        }).then(response => response.json())
        .then(result => {
            return result;
        })
        .catch(error => {
            console.error('Error:', error);
            var result = {
                success: false,
                error: error
            }
            return result;
        });
    console.log(result);
    return result;
}

/**
 * this function calls the server to add a
 * product register to the database
 * @param {*} formData is a formdata object 
 * @returns a server response object
 */
async function callAsyncUpdateServer(formData) {
    var result = await fetch(localHost + "/products", {
            method: 'put',
            body: formData
        }).then(response => response.json())
        .then(result => {
            return result;
        })
        .catch(error => {
            console.error('Error:', error);
            var result = {
                success: false,
                error: error
            }
            return result;
        });
    console.log(result);
    return result;
}

/**
 * this function calls the server to delete a
 * product register
 * @param {*} productToDelete a product object
 * @returns a product object
 */
async function callAsyncDeleteServer(productToDelete) {
    const options = {
        method: 'delete',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(productToDelete)
    }
    var result = await fetch(localHost + "/products", options).then(
        result => result.json()
    ).then((result) => {
        return result;
    }).catch((error) => {
        var result = {
            success: false,
            error: error
        }
        return result;
    });
    console.log(result);
    return result;
}
