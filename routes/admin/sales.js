//#region variables
const express = require("express");
const sale = require('../../js/models/sales.js');
const receipt = require('../../js/models/receipt');
const firebaseAdmin = require("../../firebaseFunctions/firebaseSettings");
const commonFunction = require('../../serverFunctions/commonFunctions.js');
const router = express.Router();
router.use(express.json());

router.use(express.urlencoded({
    extended: false
}));
//#endregion variables

//#region get
router.get('/', async (request, response) => {
    response.set('Cache-control', 'public, max-age =300, s-maxage=600');
    console.log("get purchase method called");
    getDecition(request, response);
});

/**
 * this function decide which get request
 * is call
 * @param {*} request request call object
 * @param {*} response response object from the server
 */
function getDecition(request, response) {
    console.log("deciding which function call");
    const req = request.url.substring(2, request.url.length);
    var result = {
        success: true,
        products: []
    }
    switch (req) {
        case "allAvaliableMonthPurchasesReceipts":
            allAvaliableMonthPurchasesReceipts(request, response);
            break;
        default:
            // result.success = false;
            // response.json(result);
            getPurchaseList(request, response);
            break;
    }
}
/**
 * this function returns the product list from
 * firebase and then returns it to the client
 * @param {*} response a server response object
 */
async function getPurchaseList(request, response) {
    console.log("method get purchase list called");
    const idReceipt = request.url.substring(2, request.url.length);
    console.log("id receipt: " + idReceipt);
    var result = {
        idReceipt: idReceipt,
        purchases: [],
        success: true
    }
    try {

        result.purchases = await sale.sales
            .getAllAvailablePurchasesForReceipt(result.idReceipt);
        console.log(result.purchases);
        response.json(result);
    } catch (error) {
        result.success = false;
        result.error = error;
        response.json(result);
    }
}
/**
 * this function returns all the avalable 
 * purchases for a given receipt id
 * @param {*} request server object
 * @param {*} response server object
 */
async function allAvaliableMonthPurchasesReceipts(request, response) {
    response.set('Cache-control', 'public, max-age =300, s-maxage=600');
    console.log("function all purchases called");
    var purchases = await sale.sales
        .getAllAvailablePurchases();
    var receipts =
        await receipt.receipt.getActualMonthReceipts();
    receipts.forEach(element => {
        purchases.forEach(p => {
            if (element.idReceipt == p.idReceipt) {
                element.purchases.push(p);
            }
        })
    });

    response.json(receipts);

}
/**
 * this function return all the month purchases receipts
 */
async function getAllPurchasesByIdProduct(request, response) {
    console.log("function all product purchases called");
    console.log("Purchases for: " + request.body.idProduct);
    await sale.sales
        .getAllPurchasesByIdProduct(request.body.idProduct)
        .then(purchaces => {
            response.json(purchaces)
        });
}
//#endregion get

//#region post
router.post('/', async (request, response) => {
    response.set('Cache-control', 'public, max-age =300, s-maxage=600');
    console.log("post sale method called");
    postDecition(request, response);
});

/**
 * this function decide which get request
 * is call
 * @param {*} request request call object
 * @param {*} response response object from the server
 */
async function postDecition(request, response) {
    console.log("deciding which function call");
    var result = {
        success: false,
        sale: [],
        error: null
    }
    try {
        const req = request.body.case;
        console.log("sale request" + req);
        switch (req) {
            case "addSaleList":
                addSaleList(request, response);
                break;
            default:
                response.json(result);
                break;
        }

    } catch (error) {
        console.log("error adding purchase list: " + error);
        result.error = error;
        response.json(result);
    }
}
/**
 * this fuction add a purchase list to firebase
 * @param {*} response response server object
 * @param {*} request request server object
 */
async function addSaleList(request, response) {
    response.set('Cache-control', 'public, max-age =300, s-maxage=600');
    console.log("method add sales list called");
    var result = {
        success: true,
        sales: [],
        purchasesToUpdate: []
    }
    try {
        request.body.salesList.forEach((item) => {
            item.sales.forEach(async (element) => {
                sale.sales.addSale(element);
                result.sales.push(element);
            });
        });
        console.log(result.sales);
        response.json(result);
    } catch (error) {
        console.log("Error: " + error);
        result.error = error;
        result.success = false;
    }
}
//#endregion post

//#region put
router.put('/', async (request, response) => {
    response.set('Cache-control', 'public, max-age =300, s-maxage=600');
    console.log("put purchase method called");
    putDecition(request, response);
});
/**
 * this function decide which get request
 * is call
 * @param {*} request request call object
 * @param {*} response response object from the server
 */
async function putDecition(request, response) {
    console.log("deciding which function call");
    var result = {
        success: false,
        purchases: [],
        error: null
    }
    try {
        const req = request.body.case;
        console.log("purchase request" + req);
        switch (req) {
            case "updatePurchaseList":
                updatePuchaseList(request, response);
                break;
            default:
                response.json(result);
                break;
        }


    } catch (error) {
        console.log("error adding purchase list: " + error);
        result.error = error;
        response.json(result);
    }
}
/**
 * this fuction update a purchase object list
 * @param {*} response response server object
 * @param {*} request request server object
 */

async function updatePuchaseList(request, response) {
    console.log("method update purchase list called");
    var result = {
        purchases: request.body.purchasesToUpdate,
        success: true,
        error: null
    }
    console.log("purchase list length: " + result.purchases.lengt);
    try {
        result.purchases.forEach(async (item) => {
            console.log(item);
            await sale.sales.updatePurchase(item);
        });
        response.json(result);
    } catch (error) {
        result.success = false;
        result.error = error;
        console.log(error);
        response.json(result);
    }
}

//#endregion put

//#region delete

router.delete('/', async (request, response) => {
    response.set('Cache-control', 'public, max-age =300, s-maxage=600');
    console.log("method delete product called");
    response.set('Cache-control', 'public, max-age =300, s-maxage=600');
    console.log("method add delete called");
    console.log(request.body);
    await sale.sales
        .deletePurchase(request.body.idPurchase);
    var result = {
        idPurchase: request.body.idPurchase,
        success: true
    }
    response.json(result);
});

//#endregion delete

module.exports = router;