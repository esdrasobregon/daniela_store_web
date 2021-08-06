class Receipt {
    constructor(idReceiptType, idReceipt, image, creationDate, updateDate, state, idUser, description) {
        this.idReceipt = idReceipt;
        this.image = image;
        this.state = state;
        this.creationDate = creationDate;
        this.updateDate = updateDate;
        this.idUser = idUser;
        this.description = description;
        this.idReceiptType = idReceiptType;
    }
}
//functions
//adding purchase
var addReceipt = async function (db, pReceipt, commonFunction) {
    var paymentState = pReceipt.paymentState == "true" ?
        true :
        false;
    await db.collection('receipt').add({
        description: pReceipt.description,
        creationDate: new Date(),
        updateDate: new Date(),
        paymentState: paymentState,
        paymentMethod: pReceipt.paymentMethod,
        idReceiptType: pReceipt.idReceiptType
    }).then(function (docRef) {
        pReceipt.idReceipt = docRef.id;
        pReceipt.creationDate = commonFunction.getCustomDateFromNewDate();
        pReceipt.updateDate = commonFunction.getCustomDateFromNewDate();
        pReceipt.purchases = [];
        pReceipt.sales = [];
        console.log('Document added');
    }).catch(function (error) {
        console.error("Error adding document: ", error);
        return null;
    });
}
//getting all purchase data
var getAllReceipts = async function (db) {
    var allPurchases = [];
    await db.collection("purchase").get()
        .then((querySnapshot) => {
            querySnapshot.forEach(function (doc) {
                var purh = {
                    idPurchase: doc.id,
                    description: doc.data().description,
                    receipt: doc.data().receipt,
                    state: doc.data().state,
                    creationDate: doc.data().creationDate,
                    updateDate: doc.data().updateDate,
                    unitPrice: doc.data().unitPrice,
                    tottalUnits: doc.data().tottalUnits,
                    idProduc: doc.data().idProduc,
                    state: doc.data().state
                };
                allPurchases.push(purh);
                console.log(doc.id, " => ", doc.data());
            });
        })
        .catch(function (error) {
            console.log("Error getting documents: ", error);
            return null;
        });
    return allPurchases;
}
/*
    this function takes all the sales and purchases receipts for the
    current month
 */
var getActualMonthReceipts = async function (firebase, commonFunction, isReady) {
    var allReceipts = [];
    var today = new Date();
    var initDate = new Date(today.getFullYear(), today.getMonth(), 0);
    var finalDate = new Date(today.getFullYear(), today.getMonth() + 1, 1);
    console.log("today: " + today + " init date: " + initDate + "last date: " + finalDate);
    await firebase.db.collection("receipt")
        .where("creationDate", ">", initDate)
        .where("creationDate", "<", finalDate)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach(function (doc) {
                var purh = {
                    description: doc.data().description,
                    idReceipt: doc.id,
                    paymentMethod: doc.data().paymentMethod,
                    creationDate: commonFunction.getCustomDate(doc.data().creationDate),
                    updateDate: commonFunction.getCustomDate(doc.data().updateDate),
                    paymentState: doc.data().paymentState,
                    idReceiptType: doc.data().idReceiptType,
                    purchases: [],
                    sales: []
                };
                allReceipts.push(purh);
            });
        })
        .catch(function (error) {
            console.log("Error getting documents: ", error);
            return null;
        });
    return allReceipts;
}
//getting all purchase data form make sales
var getAllPurchasesByIdProduct = async function (db, IdProduct, commonFunction) {
    var allPurchases = [];
    await db.collection("purchase").where("idProduct", "==", IdProduct)
        .where("outOfStock", "==", false).get()
        .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                var purh = {
                    idPurchase: doc.id,
                    description: doc.data().description,
                    receipt: doc.data().receipt,
                    state: doc.data().state,
                    creationDate: commonFunction.getCustomDate(doc.data().creationDate),
                    updateDate: commonFunction.getCustomDate(doc.data().updateDate),
                    unitPrice: doc.data().unitPrice,
                    tottalUnits: doc.data().tottalUnits,
                    idProduct: doc.data().idProduct,
                    state: doc.data().state
                };
                allPurchases.push(purh);
            });
        })
        .catch(function (error) {
            console.log("Error getting documents: ", error);
            return null;
        });
    return allPurchases;
}
//get a purchase
var getPurchase = async function (db, pIdPurchase) {
    var purchase;
    await db.collection("purchase").doc(pIdPurchase).get()
        .then(function (doc) {
            if (doc.exists) {
                console.log("Document data:", doc.data());
                purchase = {
                    idPurchase: doc.id,
                    description: doc.data().description,
                    receipt: doc.data().receipt,
                    state: doc.data().state,
                    creationDate: doc.data().creationDate,
                    updateDate: doc.data().updateDate,
                    unitPrice: doc.data().unitPrice,
                    tottalUnits: doc.data().tottalUnits,
                    idProduct: doc.data().idProduc,
                    state: doc.data().state,
                    outOfStock: doc.data().outOfStock
                };
            } else {
                console.log("No such document!");
            }
        }).catch(function (error) {
            console.log("Error getting document:", error);
            return null;
        });
    return purchase;
}
//update purchase
var updatePurchase = async function (db, pPurchase) {
    var d = new Date();
    var res = await db.collection('purchase').doc(pPurchase.idPurchase).update({
        updateDate: d,
        state: "Done"
    }).then(function (result) {
        pPurchase.state = "Done";
        console.log(result);
    }).catch(function (error) {
        console.log(error);
        return null;
    });
    return res;
}
//update purchase out of stock
var updatePurchaseOutOfStock = async function (db, pPurchase) {
    var d = new Date();
    var res = await db.collection('purchase').doc(pPurchase.idPurchase).update({
        outOfStock: true
    }).then(function (result) {
        console.log(result);
    }).catch(function (error) {
        console.log(result);
        return null;
    });
    return res;
}
//delete purchase
var deleteReceipt = async function (db, pIdPurchase) {
    await db.collection('purchase').doc(pIdPurchase).delete();
    console.log('Document ' + pIdPurchase + ' deleted!');
}
module.exports = {
    addReceipt: addReceipt,
    getAllReceipts: getAllReceipts,
    deletePurchase: deleteReceipt,
    getActualMonthReceipts: getActualMonthReceipts
}