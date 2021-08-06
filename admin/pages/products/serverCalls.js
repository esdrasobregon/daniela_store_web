//call the server
function callServer() {
    const formData = createFormDataProduct();
    fetch(localHost + "/addProduct", {
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

//call the server

function callUpdateServer() {
    const formData = createFormDataProduct();
    fetch(localHost + "/updateProduct", {
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
//call the server purchase
//add purchase
function addPurchaseList(data) {
    data.purchaseList = purchaseList;
    fetch(localHost + "/addPurchaseList", {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response => response.json())
        .then(result => {
            console.log("result: " + result.success);
            result.success ?
                finalAddPurchaseSettings(result) :
                alert(callfailsMessage);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function callServerAddReceipt() {
    const formData = createFormDataPurchaseReceipt();
    fetch(localHost + "/addReceipt", {
            method: 'POST',
            body: formData
        }).then(response => response.json())
        .then(result => {
            console.log(result);
            result.success ?
                setPurchaseServerCall(result.receipt) :
                alert(addImageMessage);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}
/**
 * this function test the server
 */
function callServerAddReceipts() {
    const formData = createFormDataSaleReceipt();
    fetch(localHost + "/addTestReceipts", {
            method: 'POST',
            body: formData
        }).then(response => response.json())
        .then(result => {
            console.log(result);
            result.success ?
                finalAddPurchaseSettings(result.receipt) :
                alert(addImageMessage);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}
//getting all the purchases
function getPuchasesReceipts() {
    var data = {
        idProduct: "idProduct"
    }
    fetch(localHost + "/allAvaliableMonthPurchasesReceipts", {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response => response.json())
        .then(result => {
            console.log(result);
            sessionStorage.setItem('allReceipts', JSON.stringify(result));
            receiptList = JSON.parse(sessionStorage.getItem('allReceipts'));
        })
        .catch(error => {
            console.error('Error:', error);
        });
}
/**
 * the next function are related to 
 * sales purposes
 */
/**
 * this function test the server
 */
function callServerAddSaleReceipt() {
    const formData = createFormDataSaleReceipt();
    fetch(localHost + "/addTestSaleReceipts", {
            method: 'POST',
            body: formData
        }).then(response => response.json())
        .then(result => {
            console.log(result);
            result.success ?
                addSalesList(result) :
                alert(addImageMessage);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}
/**
 * 
 */
function addSalesList(data) {
    data.salesList = salesList;
    fetch(localHost + "/addSalesList", {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response => response.json())
        .then(result => {
            console.log("result: " + result.success);
            result.success ?
                salesFinalSettings() :
                alert(callfailsMessage);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}