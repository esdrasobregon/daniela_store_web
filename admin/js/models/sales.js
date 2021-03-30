class Sales {
    constructor(idPurchase, idSale, unitPrice, creationDate, paymentMethod, idProduct, tottalUnits, description) {
        this.idSale = idSale;
        this.idPurchase = idPurchase;
        this.unitPrice = unitPrice;
        this.paymentMethod = paymentMethod;
        this.tottalUnits = tottalUnits;
        this.creationDate = creationDate;
        this.idProduct = idProduct;
        this.description = description;
    }
}

//adding sales
async function addSale(pSale) {
    await db.collection('sales').add({
        idPurchase: pSale.idPurchase,
        unitPrice: pSale.unitPrice,
        paymentMethod: pSale.paymentMethod,
        tottalUnits: pSale.tottalUnits,
        creationDate: pSale.creationDate,
        idProduct: pSale.idProduct,
        description: pSale.description
    }).then(function (docRef) {
        pSale.idSale = docRef.id;
        console.log('added');
        return pSale;
    }).catch(function (error) {
        console.error("Error adding document: ", error);
        return null;
    });
}
//getting all purchase data
async function getAllSales() {
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
async function getAllSalesByIdPurchase(idPurchase) {
    var allSales = [];
    await db.collection("sales").where("idPurchase", "==", idPurchase).get()
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
                    description: doc.data().description
                };
                allSales.push(sal);
                console.log(doc.id, " => ", doc.data());
            });
        })
        .catch(function (error) {
            console.log("Error getting documents: ", error);
            return null;
        });
    return allSales;
}
//get a purchase
async function getSale(pIdSale) {
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
async function updatePurchase(pPurchase) {
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
async function deletePurchase(pIdPurchase) {
    await db.collection('purchase').doc(pIdPurchase).delete();
    alert('Document ' + pIdPurchase + ' deleted!');
}