//#region variables

var receiptList = [];

//#endregion variables

//#region functions

/**
 * this function calls the server to add a
 * purchase receipt
 * @param {*} formdata a formdata object
 * @returns a server response object
 */
async function addPurchaseReceipt(formdata) {
    showPleaseWait();
    var result = await callAsyncServerAddReceipt(formdata);
    hidePleaseWait();
    return result;
}

/**
 * this function gets all the receipts
 * for the product list
 */
async function getAllPurchasesReceipts() {
    showPleaseWait();
    var result = await getAsyncPuchasesReceipts();
    console.log(result);
    sessionStorage.setItem('allReceipts', JSON.stringify(result));
    receiptList = result;
    hidePleaseWait();
}

/**
 * this function returns the inventory for a
 * product wich id is received
 * @param {*} idProduct a product object id
 * @returns the inventory for the product
 */
function getPurchasesAvalilableUnits(idProduct) {
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

/**
 * this function add a receipt object and 
 * add it to the list
 * @param {*} purchase a receipt object
 */
function addNewLocalReceipt(purchase) {
    receiptList.find(el => {
        el.idReceipt == purchase.idReceipt ?
            el.purchases.push(purchase) :
            console.log("try again");
    });
    sessionStorage.setItem('allReceipts', JSON.stringify(receiptList));
}

/**
 * this function adds a receipt to the 
 * local list
 * @param {*} receipt a receipt object 
 */
function addLocalRecept(receipt) {
    receiptList.push(receipt);
    sessionStorage.setItem('allReceipts', JSON.stringify(receiptList));
}

/**
 * this function returns the purchases to be 
 * updated
 * @param {*} resultSales sales result of a
 * server call 
 * @returns 
 */
function getPurchasesToUpdate(resultSales) {
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
    return purchasesToUpdate;
}

/**
 * use this function to check the receipt list stock
 * and update it 
 * reset
 */
function resetReceiptPurchList() {
    receiptList.forEach(element => {
        element.purchases.forEach(p => {
            p.notAvailableUnits == p.tottalUnits ?
                p.outOfStock = true :
                console.log("not");
        });
    });
    sessionStorage.setItem('allReceipts', JSON.stringify(receiptList));
}

/**
 * this function calls the server 
 * to add a sale receipt
 */
async function addSaleReceipt(formdata) {
    showPleaseWait();
    var result = await AddAsyncSaleReceipt(formdata);
    hidePleaseWait();
    return result;
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

//#endregion functions