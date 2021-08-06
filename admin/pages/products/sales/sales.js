var productsToSales = [];
var salesList = [];
const btnSalesModal = document.querySelector('#btnSalesModal');
const salesForm = document.querySelector('#add-Sales-form');
var salesUnitPriceDiv = document.getElementById("salesUnitPriceDiv");
var salesTottalUnitsDiv = document.getElementById("salesTottalUnitsDiv");
var salesIndexList = -1;

/**
 * it shows the right product name
 * and available units in the list to Sales
 */
function currentProdInfoOnTheForm() {
    var units = getPurchasesUnits(productsToSales[salesIndexList].idProduct);

    document.getElementById("availableUnits").innerHTML = "Available units: " + units;
    document.getElementById("SalesName").innerHTML =
        productsToSales[salesIndexList].name == undefined ?
        "" : "Sale for: " +
        productsToSales[salesIndexList].name;
}
/**
 * reset the Sales form 
 */
function resetSalesViews() {
    document.getElementById("SalesName").innerHTML = "";
    resetSalesFields();
    document.getElementById("SalesImage")
        .setAttribute("src", "#");
    salesForm.reset();
    productsToSales.forEach(element => {
        document.getElementById("check" + element.idProduct)
            .checked = false;
    });
    $('#SalesModal').modal('hide');
    salesUnitPriceDiv.setAttribute("style", "display: none;");
    salesTottalUnitsDiv.setAttribute("style", "display: none;");
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
/**
 * it loads and creates and Sales object
 * and then returns the result
 */
function loadLineSalesForm() {

    var newInventory = productsToSales[salesIndexList].inventory +
        parseFloat(salesForm.salesTottalUnits.value);
    return {
        unitPrice: parseFloat(salesForm.salesUnitPrice.value),
        tottalUnits: parseFloat(salesForm.salesTottalUnits.value),
        idProduct: productsToSales[salesIndexList].idProduct,
        idReceipt: productsToSales[salesIndexList].idReceipt,
        description: salesForm.salesDescription.value,
        newInventory: newInventory,
        purchases: selectRigthPurchForASale({
            idProduct: productsToSales[salesIndexList].idProduct,
            tottalUnits: parseFloat(salesForm.salesTottalUnits.value)
        })
    };
}
/**
 * this function makes the final settings
 * after adding a receipt and its Saless
 */
function salesFinalSettings() {
    // salesList.forEach(element => {
    //     productList.forEach(prod => {
    //         if (element.idProduct == prod.idProduct) {
    //             prod.inventory = element.newInventory;
    //         }
    //     });
    // });
    // sessionStorage.setItem('allProducts', JSON.stringify(productList));
    // resetSalesViews();
    // resetSalesVaribles();
    // hidePleaseWait();
    console.log("sales functions endded");
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

        if (salesIndexList < productsToSales.length - 1) {

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
            //load the last Sales and then call the server
            salesList.push(loadLineSalesForm());
            //callServerAddReceipt();
            //this is a test
            callServerAddSaleReceipt();

        }
    }
}
/**
 * this function is call when the Sales 
 * form is submited, so it needs to handle the correct 
 * dynamic to asists the user create successfuly a receipt
 * and its Saless 
 */
salesForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (productsToSales.length == 0) {
        alert(noProductsToPurchase);
    } else {
        salesIndexList == productsToSales.length - 2 ||
            productsToSales.length == 1 ?
            document.getElementById("btnSalesSubmit").innerHTML = finaliceMessage :
            console.log(nextStepMessage);
        salesIndexList < 0 ? showSalesLineFields() :
            setSalesLinesList();
    }

});
/**
 * this fuction is call after the receipt register
 * is successfuly created in the database
 * and then call the server to create its Saless
 */
function setSalesServerCall(receipt) {
    salesList.forEach(element => {
        element.idReceipt = receipt.idReceipt
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
    formdata
        .append('idReceiptType', "YFIgavH6vUIHmONFTpa0");
    formdata
        .append('paymentState', salesForm
            .paymentState.value);
    formdata
        .append('paymentMethod', salesForm
            .paymentMethod.value);
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
    productsToSales = [];
}
/**
 * this function selects the right number
 * from the right purchase register to
 * create sales registers
 * returns a list
 */
function selectRigthPurchasesToSale(listSales) {
    var resultList = [];
    listSales.forEach(sale => {
        var tottalUnitsToSale = sale.tottalUnits;
        if (tottalUnitsToSale > 0) {
            receiptList.forEach(p => {
                var continuedFlag = true;
                var count = 0;
                while (continuedFlag &&
                    count < p.purchases.length &&
                    (sale.tottalUnits > 0)) {
                    if (p.purchases[count].idProduct == sale.idProduct &&
                        (p.purchases[count].tottalUnits > p.purchases[count].notAvailableUnits)) {
                        var availableUnitsToSale = (p.purchases[count].tottalUnits -
                            p.purchases[count].notAvailableUnits);
                        var unitsToTake = 0;
                        if (availableUnitsToSale > tottalUnitsToSale) {
                            unitsToTake = tottalUnitsToSale;
                        } else {
                            unitsToTake = availableUnitsToSale;
                        }
                        p.purchases[count].notAvailableUnits += unitsToTake;
                        resultList.push({
                            units: Math.abs(unitsToTake),
                            idPurchase: p.purchases[count].idPurchase,
                            idProduct: p.purchases[count].idProduct
                        });
                        console.log("units to take " + unitsToTake);
                        sale.tottalUnits -= unitsToTake;
                        tottalUnitsToSale -= unitsToTake;
                        console.log(availableUnitsToSale);
                        if (sale.tottalUnits > 0) {
                            console.log("result > 0 continue");
                        } else {
                            if (sale.tottalUnits < 0) {
                                continuedFlag = false;
                                console.log("result < 0 not continue");
                            } else {
                                continuedFlag = false;
                                console.log("result = 0 not continue");
                            }
                        }
                    }
                    count++;
                }
            });
        } else {
            console.log("sale " + sale.idProduct + " completed");
        }
    });
    return resultList;
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
        receiptList.forEach(p => {
            var continuedFlag = true;
            var count = 0;
            while (continuedFlag &&
                count < p.purchases.length &&
                (sale.tottalUnits > 0)) {
                if (p.purchases[count].idProduct == sale.idProduct &&
                    (p.purchases[count].tottalUnits > p.purchases[count].notAvailableUnits)) {
                    var availableUnitsToSale = (p.purchases[count].tottalUnits -
                        p.purchases[count].notAvailableUnits);
                    var unitsToTake = 0;
                    if (availableUnitsToSale > tottalUnitsToSale) {
                        unitsToTake = tottalUnitsToSale;
                    } else {
                        unitsToTake = availableUnitsToSale;
                    }
                    p.purchases[count].notAvailableUnits += unitsToTake;
                    resultList.push({
                        idReceipt: p.purchases[count].idReceipt,
                        units: Math.abs(unitsToTake),
                        idPurchase: p.purchases[count].idPurchase,
                        unitPrice: p.purchases[count].unitPrice
                    });
                    console.log("units to take " + unitsToTake);
                    sale.tottalUnits -= unitsToTake;
                    tottalUnitsToSale -= unitsToTake;
                    console.log(availableUnitsToSale);
                    if (sale.tottalUnits > 0) {
                        console.log("result > 0 continue");
                    } else {
                        if (sale.tottalUnits < 0) {
                            continuedFlag = false;
                            console.log("result < 0 not continue");
                        } else {
                            continuedFlag = false;
                            console.log("result = 0 not continue");
                        }
                    }
                }
                count++;
            }
        });
    } else {
        console.log("sale " + sale.idProduct + " completed");
    }
    return resultList;
}

/**
 * var recptList = receiptList
 * var salesList = [{idProduct: receiptList[0].purchases[0].idProduct, tottalUnits: 400}]
 * salesList .push({idProduct: receiptList[2].purchases[0].idProduct, tottalUnits: 220})
 */
function clearPurchList(list) {
    list.forEach(element => {
        element.purchases.forEach(p => {
            p.notAvailableUnits = 0;
        });
    });
}
/**
 * this function returns the given product 
 * stock
 */
function getPurchasesUnits(idProduct) {
    var result = 0;
    receiptList.forEach(element => {
        element.purchases.forEach(p => {
            if (p.idProduct == idProduct) {
                result += p.tottalUnits - p.notAvailableUnits;
            }
        });
    });
    return result;
}