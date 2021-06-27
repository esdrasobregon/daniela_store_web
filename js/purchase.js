class Purchase {
    constructor(receipt, unitPrice, image, creationDate, updateDate, state, idProduct, idUser, tottalUnits, description, outOfStock) {
        this.receipt = receipt;
        this.unitPrice = unitPrice;
        this.image = image;
        this.state = state;
        this.tottalUnits = tottalUnits;
        this.creationDate = creationDate;
        this.updateDate = updateDate;
        this.idProduct = idProduct;
        this.idUser = idUser;
        this.description = description;
        this.outOfStock = outOfStock;
    }
}
//functions
//adding purchase
var addPurchase = async function (db, pPurchase) {
    await db.collection('purchase').add({
        description: pPurchase.description,
        receipt: pPurchase.receipt,
        state: pPurchase.state,
        creationDate: new Date(),
        updateDate: new Date(),
        unitPrice: pPurchase.unitPrice,
        tottalUnits: pPurchase.tottalUnits,
        idProduct: pPurchase.idProduct,
        state: pPurchase.state,
        outOfStock: false
    }).then(function (docRef) {
        pPurchase.idPurchase = docRef.id;
        console.log('Document added');
    }).catch(function (error) {
        console.error("Error adding document: ", error);
        return null;
    });
}
//getting all purchase data
var getAllPurchases = async function (db) {
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
var deletePurchase = async function (db, pIdPurchase) {
    await db.collection('purchase').doc(pIdPurchase).delete();
    console.log('Document ' + pIdPurchase + ' deleted!');
}
module.exports = {
    updatePurchaseOutOfStock: updatePurchaseOutOfStock,
    addPurchase: addPurchase,
    getAllPurchases: getAllPurchases,
    getAllPurchasesByIdProduct: getAllPurchasesByIdProduct,
    getPurchase: getPurchase,
    updatePurchase: updatePurchase,
    deletePurchase: deletePurchase
}