/**
 * this function calls the server to create 
 * a purchase list registers in the database
 * @param {*} data this is a purchase list
 * @returns the receipt created 
 */
async function addAsyncPurchaseList(data) {
    var result = await fetch(localHost + "/purchase", {
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
    return result;
}
/**
 * this function calls the server to get the 
 * purchases asociated to the receipt
 * @param {*} idReceipt receipt of an id receipt
 * @returns the purchases from the database
 */
async function getAsyncPurchaseList(idReceipt) {
    var result = await fetch(localHost + "/purchase/?" + idReceipt, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            }
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
    return result;
}

/**
 * this function calls the server to add a
 * receipt register
 * @param {*} formData a form data object 
 * @returns the receipt just added
 */
async function callAsyncServerAddReceipt(formData) {
    var result = await fetch(localHost + "/receipt", {
            method: 'POST',
            body: formData
        }).then(response => response.json())
        .then(result => {
            console.log(result);
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
    return result;
}

/**
 * this function calls the server to get 
 * the receipt registers needed in the app
 * @returns a receipt list 
 */
async function getAsyncPuchasesReceipts() {
    var result = await fetch(localHost + "/purchase/?allAvaliableMonthPurchasesReceipts", {
            method: "GET",
            headers: {
                'Content-type': 'application/json'
            }
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
    return result;
}

/**
 * this function calls the server to update 
 * a purchase list registers on the database
 * @param {*} data an object that contains the purchase
 * list and the purchase call case
 * @returns a server response object
 */
async function updateAsyncPuchaseList(data) {

    var result = await fetch(localHost + "/purchase", {
            method: 'PUT',
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