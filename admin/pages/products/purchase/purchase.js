var productsTopurchase = [];
var purchaseList = [];
const purchaseForm = document.querySelector('#purchaseForm');
const btnPurchaseModal = document.querySelector('#btnPurchaseModal');
const purchaseActualForm = document.querySelector('#add-purchase-form');
var unitPriceDiv = document.getElementById("unitPriceDiv");
var tottalUnitsDiv = document.getElementById("tottalUnitsDiv");
var indexList = -1;

function showProductNameOnTheForm() {
    document.getElementById("purchaseName").innerHTML =
        productsTopurchase[indexList].name == undefined ?
        "" : "Purchase for: " +
        productsTopurchase[indexList].name;
}

function showPurchaseLineFields() {
    indexList++;
    showProductNameOnTheForm();
    unitPriceDiv.setAttribute("style", "display: block;");
    tottalUnitsDiv.setAttribute("style", "display: block;");
}

function deletePurchaseToTheForm(element) {
    document.getElementById("purchase" + element.idProduct).remove();
}

function resetPurchaseFields() {
    purchaseActualForm.unitPrice.value = 0;
    purchaseActualForm.tottalUnits.value = 0;
}

function loadLinePurchaseForm() {

    var newInventory = productsTopurchase[indexList].inventory +
        parseFloat(purchaseActualForm.tottalUnits.value);
    return {
        unitPrice: purchaseActualForm.unitPrice.value,
        tottalUnits: purchaseActualForm.tottalUnits.value,
        idProduct: productsTopurchase[indexList].idProduct,
        description: purchaseActualForm.description.value,
        newInventory: newInventory
    };
}

function finalSettings() {
    purchaseList.forEach(element => {
        productList.forEach(prod => {
            if (element.idProduct == prod.idProduct) {
                prod.inventory = element.newInventory;
            }
        });
    });
    sessionStorage.setItem('allProducts', JSON.stringify(productList));
    location.reload();
}

function setPurchaseLinesList() {

    if (indexList < productsTopurchase.length - 1) {

        //var quantity = parseFloat(purchaseForm.tottalUnits.value) + parseFloat(p.inventory);

        if (purchaseActualForm.tottalUnits.value != "" &&
            purchaseActualForm.unitPrice.value != "") {

            purchaseList.push(loadLinePurchaseForm());
            resetPurchaseFields();
            indexList++;
        } else {
            alert("Fields required");
        }

    } else {
        purchaseList.push(loadLinePurchaseForm());
        showPleaseWait();
        callServerAddReceipt();
    }
}
purchaseActualForm.addEventListener("submit", (e) => {
    e.preventDefault();
    indexList < 0 ? showPurchaseLineFields() :
        setPurchaseLinesList();

});

function setServerCall(receipt) {
    purchaseList.forEach(element => {
        element.idReceipt = receipt.idReceipt
    });
    addPurchase(purchaseList);
    showPleaseWait();
    setTimeout(() => {
        hidePleaseWait();
    }, 3000 * purchaseList.length);
    indexList = 0;
}

function serverReceipt() {
    callServerAddReceipt();
    showPleaseWait();
}

function createFormDataReceipt() {
    formdata = new FormData();
    formdata
        .append('description', purchaseActualForm
            .description.value);
    formdata
        .append('paymentState', purchaseActualForm
            .paymentState.value);
    formdata
        .append('paymentMethod', purchaseActualForm
            .paymentMethod.value);
    formdata
        .append('inputPurchaseFile', purchaseActualForm
            .inputPurchaseFile.files[0]);
    return formdata;
}