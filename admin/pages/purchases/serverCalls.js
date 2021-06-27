function getPurchases(idProduct) {
    var data = {
        idProduct: idProduct
    }
    fetch(localHost + "/allPurchases", {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response => response.json())
        .then(result => {
            purchaseList = result;
        })
        .catch(error => {
            console.error('Error:', error);
        });
}
//add purchase
function addPurchase(data) {
    fetch(localHost + "/addPurchase", {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response => response.json())
        .then(result => {
            console.log("result: " + result.success);
            result.success ?
                purchaseList.push(result.purchase) :
                alert("the call fail");
        })
        .catch(error => {
            console.error('Error:', error);
        });
}
//update purchase
function updatePurchase(data) {
    fetch(localHost + "/updatePurchase", {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response => response.json())
        .then(result => {
            if (result.success) {
                purchaseList.find((element) => {
                    if (element.idPurchase == result.purchase.idPurchase) {
                        element.state = result.purchase.state;
                    }
                });
                data.state = result.purchase.state;
                document.getElementById("btnUpdate" + result.purchase.idPurchase).innerHTML = "No need";
            } else {
                alert("it fail");
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}
//update purchase
function updatePurchaseOutOfStocks(data) {
    fetch(localHost + "/updatePurchaseOutOfStock", {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response => response.json())
        .then(result => {
            if (result.success) {
                document.getElementById(actualPurchaseId).remove();
            } else {
                alert("it fail");
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}
//get allpurchases
function getAllSalesByIdPurchases(purchaseId, salesList) {
    var data = {
        purchaseId: purchaseId
    };
    fetch(localHost + "/getAllSalesByIdPurchases", {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response => response.json())
        .then(result => {
            console.log(result.sales);
            salesList = result.sales;
            saleSettings(result.sales);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}
//delete purchase
function deletePurchase(pIdpurchase) {
    fetch(localHost + "/deletePurchase", {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                idPurchase: pIdpurchase
            })
        }).then(response => response.json())
        .then(result => {
            if (result.success) {
                document.getElementById(result.idPurchase).remove();
                alert("deleted");
            } else {
                alert("it fail");
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}
//sales related functions
//add purchase
function addSales(data) {
    fetch(localHost + "/addSale", {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response => response.json())
        .then(result => {
            console.log("result: " + result.success);
            result.success ?
                data = result.sale :
                alert("the call fail");
        })
        .catch(error => {
            console.error('Error:', error);
        });
}
//update purchase
function updateSale(data) {
    fetch(localHost + "/updatePurchase", {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response => response.json())
        .then(result => {
            if (result.success) {
                purchaseList.find((element) => {
                    if (element.idPurchase == result.purchase.idPurchase) {
                        element.state = result.purchase.state;
                    }
                });
                data.state = result.purchase.state;
                document.getElementById("btnUpdate" + result.purchase.idPurchase).innerHTML = "No need";
            } else {
                alert("it fail");
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}
//delete purchase
function deleteSale(pIdpurchase) {
    fetch(localHost + "/deletePurchase", {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                idPurchase: pIdpurchase
            })
        }).then(response => response.json())
        .then(result => {
            if (result.success) {
                document.getElementById(result.idPurchase).remove();
                alert("deleted");
            } else {
                alert("it fail");
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

//product related functions
//update product stock
function updateProductStocks(idProduct, newInventory) {
    var data = {
        idProduct: idProduct,
        newInventory: newInventory
    }
    fetch(localHost + "/updateProductStock", {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response => response.json())
        .then(result => {
            if (result.success) {
                productList.find((element) => {
                    if (element.idProduct == idProduct) {
                        element.inventory = newInventory;
                    }
                });
                sessionStorage.setItem('allProducts', JSON.stringify(productList));
            } else {
                alert("function update product stok fail");
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}