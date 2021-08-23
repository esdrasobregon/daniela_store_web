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
                getPurchaseList(result.purchase[0].idReceipt) :
                alert(callfailsMessage);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function getPurchaseList(idReceipt) {
    var data = {
        idReceipt: idReceipt
    }
    fetch(localHost + "/getPurchaseList", {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response => response.json())
        .then(result => {
            console.log(result.purchases[0]);
            result.success ?
                finalAddPurchaseSettings(result.purchases) :
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
            setProductInventoryView();
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

/**
 * this function call the server to update a 
 * purchase list
 * @param {*} purchasesToUpdate this is a purchase list
 */
function updatePuchaseList(purchasesToUpdate) {
    fetch(localHost + "/updatePurchaseList", {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(purchasesToUpdate)
        }).then(response => response.json())
        .then(result => {
            console.log(result);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}