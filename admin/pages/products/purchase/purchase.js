//#region variables

var purchaseList = [];
const btnPurchaseModal = document.querySelector('#btnPurchaseModal');
const purchaseForm = document.querySelector('#add-purchase-form');
var unitPriceDiv = document.getElementById("unitPriceDiv");
var tottalUnitsDiv = document.getElementById("tottalUnitsDiv");
var indexList = -1;

//#endregion variables

//#region view

/**
 * it shows the right product name in the list to purchase
 */
function currentProdInfoOnThePurchaseForm() {
    document.getElementById("purchaseName").innerHTML =
        productsTopurchase[indexList].name == undefined ?
        "" : purchaseForMessage +
        productsTopurchase[indexList].name;
}
/**
 * reset the purchase form 
 */
function resetPurchaseViews() {
    document.getElementById("purchaseName").innerHTML = "";
    resetPurchaseFields();
    document.getElementById("purchaseImage")
        .setAttribute("src", "#");
    purchaseForm.reset();
    productsTopurchase.forEach(element => {
        document.getElementById("check" + element.idProduct)
            .checked = false;
        showSaleDiv(element.idProduct);
        document.getElementById("inventory" + element.idProduct).innerHTML =
            placeHolderProductInventory +
            getPurchasesAvalilableUnits(element.idProduct);
    });
    $('#purchaseModal').modal('hide');
    unitPriceDiv.setAttribute("style", "display: none;");
    tottalUnitsDiv.setAttribute("style", "display: none;");
    document.getElementById("btnPurchaseSubmit").innerHTML = "Next"
}
/**
 * it shows the hide fields for the purchase form
 */
function showPurchaseLineFields() {
    indexList++;
    currentProdInfoOnThePurchaseForm();
    unitPriceDiv.setAttribute("style", "display: block;");
    tottalUnitsDiv.setAttribute("style", "display: block;");
}
/**
 * this fucntion resets the purchase fields
 */
function resetPurchaseFields() {
    purchaseForm.unitPrice.value = 0;
    purchaseForm.tottalUnits.value = 0;
}
/**
 * this function is call when the purchase 
 * form is submited, so it needs to handle the correct 
 * dynamic to asists the user create successfuly a receipt
 * and its purchases 
 */
purchaseForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (productsTopurchase.length == 0) {
        alert(noProductsToPurchase);
    } else {
        if (fileUploaded(purchaseForm
                .inputPurchaseFile.files[0])) {
            indexList == productsTopurchase.length - 2 ||
                productsTopurchase.length == 1 ?
                document.getElementById("btnPurchaseSubmit").innerHTML = finaliceMessage :
                console.log(nextStepMessage);
            indexList < 0 ? showPurchaseLineFields() :
                setPurchaseLinesList();
        } else alert(addImageMessage);

    }

});

//#endregion view

//#region dynamic

/**
 * it loads and creates and purchase object
 * and then returns the result
 */
function loadLinePurchaseForm() {
    var newInventory = productsTopurchase[indexList].inventory +
        parseFloat(purchaseForm.tottalUnits.value);
    return {
        unitPrice: parseFloat(purchaseForm.unitPrice.value),
        tottalUnits: parseFloat(purchaseForm.tottalUnits.value),
        idProduct: productsTopurchase[indexList].idProduct,
        description: purchaseForm.purchseDescription.value,
        newInventory: newInventory,
        notAvailableUnits: 0,
        outOfStock: false,
        idPurchase: null
    };
}
/**
 * this function makes the final settings
 * after adding a receipt and its purchases
 */
function finalAddPurchaseSettings(result) {
    showPleaseWait();
    resetPurchaseViews();
    resetPurchaseVaribles(result);
    hidePleaseWait();
}
/**
 * this function makes the last 
 * details before calling the server
 * to add a receipt and its purchases
 */
function setPurchaseLinesList() {

    if (indexList < 0) {
        //this is to show the first product name
        indexList++;
        currentProdInfoOnThePurchaseForm();
    } else {
        //from the first purchase till the one before last

        if (indexList < productsTopurchase.length - 1) {

            if (purchaseForm.tottalUnits.value != "" &&
                purchaseForm.unitPrice.value != "") {
                purchaseList.push(loadLinePurchaseForm());
                resetPurchaseFields();
                indexList++;

                currentProdInfoOnThePurchaseForm();
            } else {
                alert(fieldsRequiredMessage);
            }


        } else {
            //load the last purchase and then call the server
            purchaseList.push(loadLinePurchaseForm());
            handlePurchaseReceiptAdding();
        }
    }
}
/**
 * this function calls the server to add a
 * purchase receipt
 */
async function handlePurchaseReceiptAdding() {
    showPleaseWait();
    var result = await addPurchaseReceipt(createFormDataPurchaseReceipt());
    result.success ?
        setPurchaseServerCall(result.receipt) :
        alert(addImageMessage);
    hidePleaseWait();
}
/**
 * this fuction is call after the receipt register
 * is successfuly created in the database
 * and then call the server to create its purchases
 */
async function setPurchaseServerCall(receipt) {
    showPleaseWait();
    setPurchaseListIdReceipt(receipt);
    addLocalRecept(receipt);
    var data = {
        purchaseList: purchaseList,
        case: "addPurchaseList"
    };
    var result = await addAsyncPurchaseList(data);
    hidePleaseWait();
    await giveSomeTime(purchaseList.length);
    if (result.success) {
        var id = result.purchase[0].idReceipt
        await getAddedPurchaseList(id);
    } else alert(callfailsMessage);
    indexList = 0;
}

/**
 * this function get the purchase list just 
 * added
 * @param {*} idReceipt this is a id receipt
 */
async function getAddedPurchaseList(idReceipt) {
    showPleaseWait();
    var result =
        await getAsyncPurchaseList(idReceipt);
    hidePleaseWait();
    result.success ?
        finalAddPurchaseSettings(result.purchases) :
        alert(callfailsMessage);
}
/**
 * this function sets the purchase list
 * id receipt
 * @param {*} receipt 
 */
function setPurchaseListIdReceipt(receipt) {
    purchaseList.forEach(element => {
        element.idReceipt = receipt.idReceipt
    });
}
/**
 * this fuction calls the server to create a
 * receipt register
 */
async function serverReceipt() {
    showPleaseWait();
    var result = await callAsyncServerAddReceipt(createFormDataPurchaseReceipt());
    result.success ?
        setPurchaseServerCall(result.receipt) :
        alert(addImageMessage);
    hidePleaseWait();
}
/**
 * this function creates an receipt object
 * an the returns the result 
 */
function createFormDataPurchaseReceipt() {
    const receiptTipe = receipTypetList
        .find((r) => r.description == "Purchase invoice");
    formdata = new FormData();
    formdata
        .append('description', purchaseForm
            .purchseDescription.value);
    formdata
        .append('idReceiptType', receiptTipe.idReceiptType);
    formdata
        .append('paymentState', purchaseForm
            .paymentState.value);
    formdata
        .append('paymentMethod', purchaseForm
            .paymentMethod.value);
    formdata
        .append('inputFile', purchaseForm
            .inputPurchaseFile.files[0]);
    formdata
        .append('case', "add");
    return formdata;
}
/**
 * it reset the purchase variables
 */
function resetPurchaseVaribles(result) {
    result.forEach(element => {
        addNewLocalReceipt(element);
    });
    productsTopurchase.forEach(element => {
        document.getElementById("inventory" + element.idProduct).innerHTML =
            placeHolderProductInventory +
            getPurchasesAvalilableUnits(element.idProduct);
    });
    sessionStorage.setItem('allProducts', JSON.stringify(productList));
    indexList = -1;
    purchaseList = [];
    productsTopurchase = [];
}

//#endregion dynamic