class Sales {
    constructor(idReceipt, idPurchaseIdReceipt, idSale, unitPrice, idProduct, units) {
        this.idSale = idSale;
        this.idPurchaseIdReceipt = idPurchaseIdReceipt;
        this.unitPrice = unitPrice;
        this.units = units;
        this.idProduct = idProduct;
        this.idReceipt = idReceipt;
    }
}

//adding sales
var addSale = async function (db, pSale) {
    await db.collection('sales').add({
        purchaseIdReceipt: pSale.purchaseIdReceipt,
        idPurchase: pSale.idPurchase,
        unitPrice: pSale.unitPrice,
        units: pSale.units,
        idReceipt: pSale.idReceipt
    }).then(function (docRef) {
        pSale.idSale = docRef.id;
        console.log('added');
    }).catch(function (error) {
        console.error("Error adding document: ", error);
    });
}
//getting all purchase data
var getAllSales = async function () {
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
//
var getAllSalesByIdReceipt = async function (db, idReceipt, allSales) {
    await db.collection("sales").where("idReceipt", "==", idReceipt).get()
        .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                var sal = {
                    idSale: doc.id,
                    idPurchase: doc.data().idPurchase,
                    unitPrice: doc.data().unitPrice,
                    paymentMethod: doc.data().paymentMethod,
                    tottalUnits: doc.data().tottalUnits,
                    creationDate: doc.data().creationDate,
                    idProduct: doc.data().idProduct,
                    description: doc.data().description,
                    idReceipt: doc.data().idReceipt
                };
                allSales.push(sal);
                console.log(doc.id, " => ", doc.data());
            });
            return allSales;
        })
        .catch(function (error) {
            console.log("Error getting documents: ", error);
            return null;
        });
}
//get a purchase
var getSale = async function (pIdSale) {
    var docRef = db.collection("sales").doc(pIdSale);

    docRef.get().then((doc) => {
        if (doc.exists) {
            console.log("Document data:", doc.data());
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
}
//update purchase
var updatePurchase = async function (pPurchase) {
    var d = new Date();
    var res = await db.collection('purchase').doc(pPurchase.idPurchase).update({
        updateDate: d,
        state: "Done"
    }).then(function (result) {
        console.log(result);
    }).catch(function (error) {
        console.log(result);
        return null;
    });
    return res;
}
//delete purchase
var deletePurchase = async function (pIdPurchase) {
    await db.collection('purchase').doc(pIdPurchase).delete();
    alert('Document ' + pIdPurchase + ' deleted!');
}
module.exports = {
    getAllSales: getAllSales,
    getSale: getSale,
    addSale: addSale,
    getAllSalesByIdReceipt: getAllSalesByIdReceipt
}