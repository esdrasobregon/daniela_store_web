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
            setProductInventoryView();
        })
        .catch(error => {
            console.error('Error:', error);
        });
}