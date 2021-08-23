/**
 * this function test the server
 */
function callServerAddSaleReceipt() {
    const formData = createFormDataSaleReceipt();
    fetch(localHost + "/addReceipt", {
            method: 'POST',
            body: formData
        }).then(response => response.json())
        .then(result => {
            console.log(result);
            result.success ?
                setSalesServerCall(result.receipt) :
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
    fetch(localHost + "/addSalesList", {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response => response.json())
        .then(result => {
            console.log("result: " + result.sales[0].idSale);
            result.success ?
                salesFinalSettings(result.sales) :
                alert(callfailsMessage);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}