
/**
 * this function calls the server to add 
 * a sale receipt register
 * @param {*} formData a formdata object
 * @returns a server response object
 */
 async function AddAsyncSaleReceipt(formData) {
    var result = await fetch(localHost + "/receipt", {
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
 * sale object list registers
 * @param {*} data a sale object list 
 * @returns a server call response
 */
async function addAsyncSalesList(data) {
    var result = await fetch(localHost + "/sale", {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
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