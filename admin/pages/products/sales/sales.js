//#region variables
var salesList = [];
const btnSalesModal = document.querySelector('#btnSalesModal');
const salesForm = document.querySelector('#add-Sales-form');
var salesUnitPriceDiv = document.getElementById("salesUnitPriceDiv");
var salesTottalUnitsDiv = document.getElementById("salesTottalUnitsDiv");
var salesIndexList = -1;
//#endregion variables

//#region view

/**
 * this function is call when the Sales 
 * form is submited, so it needs to handle the correct 
 * dynamic to asists the user create successfuly a receipt
 * and its Saless
 */
salesForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (productsToSale.length == 0) {
        alert(noProductsToPurchase);
    } else {
        salesIndexList == productsToSale.length - 2 ||
            productsToSale.length == 1 ?
            document.getElementById("btnSalesSubmit").innerHTML = finaliceMessage :
            console.log(nextStepMessage);
        salesIndexList < 0 ? showSalesLineFields() :
            setSalesLinesList();
    }

});
/**
 * it shows the right product name
 * and available units in the list to Sales
 */
function currentProdInfoOnTheForm() {
    var units = getPurchasesAvalilableUnits(productsToSale[salesIndexList].idProduct);
    document.getElementById("salesUnitPrice")
        .value = productsToSale[salesIndexList].price;
    document.getElementById("availableUnits")
        .innerHTML = "Available units: " + units;
    document.getElementById("salesName").innerHTML =
        productsToSale[salesIndexList].name == undefined ?
        "" : "Sale for: " +
        productsToSale[salesIndexList].name;
    document.getElementById("salesTottalUnits")
        .setAttribute("max", units);
    document.getElementById("salesTottalUnits")
        .setAttribute("min", 1);
}
/**
 * reset the Sales form 
 */
function resetSalesViews() {
    document.getElementById("salesName").innerHTML = "";
    resetSalesFields();
    document.getElementById("salesImage")
        .setAttribute("src", "#");
    salesForm.reset();
    productsToSale.forEach(element => {
        document.getElementById("saleCheck" + element.idProduct)
            .checked = false;
    });
    $('#salesModal').modal('hide');
    salesUnitPriceDiv.setAttribute("style", "display: none;");
    salesTottalUnitsDiv.setAttribute("style", "display: none;");
    document.getElementById("availableUnits")
        .innerHTML = "";
    document.getElementById("btnSalesSubmit").innerHTML = "Next"
}

/**
 * it shows the hide fields for the Sales form
 */
function showSalesLineFields() {
    salesIndexList++;
    currentProdInfoOnTheForm();
    document.getElementById("availableUnitsDiv").setAttribute("style", "display: block;");
    salesUnitPriceDiv.setAttribute("style", "display: block;");
    salesTottalUnitsDiv.setAttribute("style", "display: block;");
}

/**
 * this fucntion resets the Sales fields
 */
function resetSalesFields() {
    salesForm.salesTottalUnits.value = 0;
    salesForm.salesUnitPrice.value = 0;
}
//#endregion view

//#region dynamic
/**
 * it loads and creates and Sale object
 * and then returns the result
 */
function loadLineSalesForm() {

    var newInventory = productsToSale[salesIndexList].inventory +
        parseFloat(salesForm.salesTottalUnits.value);
    return {
        unitPrice: parseFloat(salesForm.salesUnitPrice.value),
        tottalUnits: parseFloat(salesForm.salesTottalUnits.value),
        idProduct: productsToSale[salesIndexList].idProduct,
        idReceipt: productsToSale[salesIndexList].idReceipt,
        description: salesForm.salesDescription.value,
        newInventory: newInventory,
        sales: selectRigthPurchForASale({
            idProduct: productsToSale[salesIndexList].idProduct,
            tottalUnits: parseFloat(salesForm.salesTottalUnits.value)
        })
    };
}
/**
 * this function makes the final settings
 * after adding a receipt and its Sales lines
 */
function salesFinalSettings(resultSales) {
    //update the purchaseslist
    setUpdatePurchaseList(resultSales);
    sessionStorage.setItem('allReceipts', JSON.stringify(receiptList));
    resetSalesViews();
    resetSalesVaribles();
    hidePleaseWait();
    console.log("sales functions endded");
}
/**
 * this function takes the purchases to 
 * update from the sales list,
 * then call the server to update the purchases
 */
function setUpdatePurchaseList(resultSales) {
    var purchasesToUpdate = [];
    resultSales.forEach((element) => {
        receiptList.forEach((receipt) => {
            receipt.purchases.forEach((p) => {
                    element.idPurchase == p.idPurchase ?
                        purchasesToUpdate.push(p) :
                        console.log("try again");
                }

            );
        });

    });
    updatePuchaseList(purchasesToUpdate);
}

/**
 * this fuction is call after the receipt register
 * is successfuly created in the database
 * and then call the server to create its Sales
 * @param {*} receipt is a receipt object 
 */
function setSalesServerCall(receipt) {
    resetPurchList(receiptList);
    salesList.forEach(element => {
        element.purchasesToUpdate = [];
        element.sales.forEach(item => {
            console.log(item);
            item.idReceipt = receipt.idReceipt;
        });
    });

    addSalesList(salesList);
    showPleaseWait();
    setTimeout(() => {
        hidePleaseWait();
    }, 3000 * salesList.length);
    salesIndexList = 0;
}
/**
 * this fuction calls the server to create a
 * receipt register
 */
function serverReceipt() {
    callServerAddReceipt();
    showPleaseWait();
}
/**
 * this function creates an receipt object
 * an the returns the result 
 */
function createFormDataSaleReceipt() {
    formdata = new FormData();
    formdata
        .append('description', salesForm
            .salesDescription.value);
    //this needs to be updated,
    //the value is not still dynamic
    formdata
        .append('idReceiptType', "YFIgavH6vUIHmONFTpa0");
    formdata
        .append('paymentState', salesForm
            .salePaymentState.value);
    formdata
        .append('paymentMethod', salesForm
            .salePaymentMethod.value);
    formdata
        .append('inputFile', salesForm
            .inputSalesFile.files[0]);
    return formdata;
}
/**
 * it reset the Sales variables
 */
function resetSalesVaribles() {
    salesIndexList = -1;
    salesList = [];
    productsToSale = [];
}
/**
 * this function makes the last 
 * details before calling the server
 * to add a receipt and its Saless
 */
function setSalesLinesList() {

    if (salesIndexList < 0) {
        //this is to show the first product name
        salesIndexList++;
        currentProdInfoOnTheForm();
    } else {
        //from the first Sales till the one before last

        if (salesIndexList < productsToSale.length - 1) {

            if (salesForm.salesTottalUnits.value != "" &&
                salesForm.salesUnitPrice.value != "") {
                salesList.push(loadLineSalesForm());
                resetSalesFields();
                salesIndexList++;

                currentProdInfoOnTheForm();
            } else {
                alert(fieldsRequiredMessage);
            }


        } else {
            if (salesForm.salesTottalUnits.value != "" &&
                salesForm.salesUnitPrice.value != "") {
                //load the last Sales and then call the server
                showPleaseWait();
                salesList.push(loadLineSalesForm());
                callServerAddSaleReceipt();
            } else {
                alert(fieldsRequiredMessage);
            }

        }
    }
}
/**
 * this function selects the right number
 * from the right purchase register to
 * create sales registers
 * returns an object
 */
function selectRigthPurchForASale(sale) {
    var resultList = [];
    var tottalUnitsToSale = sale.tottalUnits;
    if (tottalUnitsToSale > 0) {
        receiptList.forEach(receipt => {
            getSaleParamters(sale, resultList, tottalUnitsToSale, receipt);
        });
    } else {
        console.log("sale " + sale.idProduct + " completed");
    }
    return resultList;
}

function getSaleParamters(sale, resultList, tottalUnitsToSale, receipt) {
    var continuedFlag = true;
    var count = 0;
    while (continuedFlag &&
        count < receipt.purchases.length &&
        (sale.tottalUnits > 0)) {
        var tottalUnits = receipt.purchases[count].tottalUnits;
        var notAvailUnits = receipt.purchases[count].notAvailableUnits;
        var productIdReceipt = receipt.purchases[count].idProduct;
        var availableUnitsToSale = 0;
        var unitsToTake = 0;
        if (productIdReceipt == sale.idProduct &&
            (tottalUnits > notAvailUnits)) {
            availableUnitsToSale = (tottalUnits -
                notAvailUnits);

            availableUnitsToSale > tottalUnitsToSale ?
                unitsToTake = tottalUnitsToSale :
                unitsToTake = availableUnitsToSale;
            receipt.purchases[count].notAvailableUnits += unitsToTake;
            sale.tottalUnits -= unitsToTake;
            tottalUnitsToSale -= unitsToTake;
            resultList.push(getSaleObject(receipt, count, unitsToTake));
            console.log("units to take " + unitsToTake);

            if (sale.tottalUnits < 0 || sale.tottalUnits == 0) {
                continuedFlag = false;
                console.log("result < ó = 0, not continue");
            }
        }
        count++;
    }
}
/**
 * this fuction creates a sale line object
 * @param {*} receipt is the currenct receipt object 
 * @param {*} count the purchase index to be take
 * @param {*} unitsToTake the tottal units taken 
 * @returns the sale object result
 */
function getSaleObject(receipt, count, unitsToTake) {
    return {
        purchaseIdReceipt: receipt.purchases[count].idReceipt,
        units: Math.abs(unitsToTake),
        idPurchase: receipt.purchases[count].idPurchase,
        unitPrice: receipt.purchases[count].unitPrice,
        idSale: undefined
    }
}
/**
 * this function lets the not available units
 * in 0
 * use this function just for test
 * @param {*} list this is a receipt list
 */
function clearPurchList(list) {
    list.forEach(element => {
        element.purchases.forEach(p => {
            p.notAvailableUnits = 0;
        });
    });
}
/**
 * use this function to check the receipt list stock
 * and update it
 * @param {*} list the receipt list to 
 * reset
 */
function resetPurchList(list) {
    list.forEach(element => {
        element.purchases.forEach(p => {
            p.notAvailableUnits == p.tottalUnits ?
                p.outOfStock = true :
                console.log("not");
        });
    });
}
//#endregion dynamic