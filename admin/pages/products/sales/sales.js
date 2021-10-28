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
        if (fileUploaded(salesForm
                .inputSalesFile.files[0])) {
            salesIndexList == productsToSale.length - 2 ||
                productsToSale.length == 1 ?
                document.getElementById("btnSalesSubmit").innerHTML = finaliceMessage :
                console.log(nextStepMessage);
            salesIndexList < 0 ? showSalesLineFields() :
                setSalesLinesList();
        } else alert(addImageMessage);
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
        var stock = getPurchasesAvalilableUnits(element.idProduct);
        if (stock <= 0) {
            document.getElementById("saleCheck" + element.idProduct)
                .setAttribute("style", "display: none;");
        }
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
    resetSalesViews();
    setProductInventoryView();
    resetSalesVaribles();
    hidePleaseWait();
    console.log("sales functions endded");
}
/**
 * this function takes the purchases to 
 * update from the sales list,
 * then call the server to update the purchases
 */
async function setUpdatePurchaseList(resultSales) {
    showPleaseWait();
    var purchasesToUpdate = getPurchasesToUpdate(resultSales);

    var data = {
        purchasesToUpdate: purchasesToUpdate,
        case: "updatePurchaseList"
    }

    var result = await updateAsyncPuchaseList(data);
    result.success ?
        console.log(result) :
        alert("purchases not updated");
    hidePleaseWait();
}

/**
 * this fuction is call after the receipt register
 * is successfuly created in the database
 * and then call the server to create its Sales
 * @param {*} receipt is a receipt object 
 */
async function setSalesListServerCall(receipt) {
    showPleaseWait();
    resetReceiptPurchList();
    setSalesIdReceipt(receipt);
    var data = {
        salesList: salesList,
        case: "addSaleList"
    }
    var result = await addAsyncSalesList(data);
    result.success ?
        salesFinalSettings(result.sales) :
        alert(callfailsMessage);
    hidePleaseWait();
    salesIndexList = 0;
}
/**
 * this function sets the sales list id receipt
 * @param {*} receipt is a receipt object
 * list
 */
function setSalesIdReceipt(receipt) {
    salesList.forEach(element => {
        element.purchasesToUpdate = [];
        element.sales.forEach(item => {
            console.log(item);
            item.idReceipt = receipt.idReceipt;
        });
    });
}

/**
 * this function creates an receipt object
 * an the returns the result 
 */
function createFormDataSaleReceipt() {
    const receiptTipe = receipTypetList
        .find((r) => r.description == "Sales invoice");
    formdata = new FormData();
    formdata
        .append('description', salesForm
            .salesDescription.value);
    //this needs to be updated,
    //the value is not still dynamic
    formdata
        .append('idReceiptType', receiptTipe.idReceiptType);
    formdata
        .append('paymentState', salesForm
            .salePaymentState.value);
    formdata
        .append('paymentMethod', salesForm
            .salePaymentMethod.value);
    formdata
        .append('inputFile', salesForm
            .inputSalesFile.files[0]);
    formdata
        .append('case', "add");
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
async function setSalesLinesList() {

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
                salesList.push(loadLineSalesForm());
                handleAddSaleReceipt();
            } else {
                alert(fieldsRequiredMessage);
            }

        }
    }
}

/**
 * this function calls the server 
 * to add a sale receipt
 */
async function handleAddSaleReceipt() {
    showPleaseWait();
    var result = await addSaleReceipt(createFormDataSaleReceipt());
    result.success ?
        setSalesListServerCall(result.receipt) :
        alert(addImageMessage);
    hidePleaseWait();
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

//#endregion dynamic