const firebaseAdmin = require("../../firebaseFunctions/firebaseSettings");
const commonFunction = require('../../serverFunctions/commonFunctions.js');

class Purchase {
    constructor(receipt, unitPrice, image, creationDate, updateDate, state, idProduct, idUser, tottalUnits, description, notAvailableUnits, outOfStock) {
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
        this.notAvailableUnits = notAvailableUnits;
        this.outOfStock;
        outOfStock
    }

    /**
     * this function calls the firebase database to add 
     * purchase register
     * @param {*} pPurchase purchase object 
     */
    async addPurchases(pPurchase) {
        await firebaseAdmin.db.collection('purchase').add({
            idReceipt: pPurchase.idReceipt,
            unitPrice: pPurchase.unitPrice,
            tottalUnits: pPurchase.tottalUnits,
            notAvailableUnits: 0,
            idProduct: pPurchase.idProduct,
            outOfStock: pPurchase.outOfStock
        }).then(function (docRef) {
            pPurchase.idPurchase = docRef.id;
            console.log("Document " + pPurchase.idPurchase + " added");
        }).catch(function (error) {
            console.error("Error adding document: ", error);
            return null;
        });
    }
    /**
     * this function calls the firebase database to add 
     * purchase register
     * @param {*} pPurchase purchase object 
     */
    async addPurchase(pPurchase) {
        await firebaseAdmin.db.collection('purchase').add({
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
    /**
     * this function retreives all the purchases with 
     * available stock
     * @returns the purchase list
     */
    async getAllPurchases() {
        var allPurchases = [];
        await firebaseAdmin.db.collection("purchase").get()
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
                        idProduct: doc.data().idProduct,
                        state: doc.data().state,
                        notAvailableUnits: doc.data().notAvailableUnits
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
    /**
     * this function retreives all the purchases with 
     * available stock
     * @returns the purchase list
     */
    async getAllAvailablePurchases() {
        var allPurchases = [];
        await firebaseAdmin.db.collection("purchase")
            .where("outOfStock", "==", false)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach(function (doc) {
                    var purh = {
                        idPurchase: doc.id,
                        idReceipt: doc.data().idReceipt,
                        unitPrice: doc.data().unitPrice,
                        tottalUnits: doc.data().tottalUnits,
                        idProduct: doc.data().idProduct,
                        notAvailableUnits: doc.data().notAvailableUnits,
                        outOfStock: doc.data().outOfStock
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
    /**
     * this function calls the firebase database to retreives
     * all the purchases associated to a receipt
     * @param {*} idReceipt receipt id
     * @returns the purchase list
     */
    async getAllAvailablePurchasesForReceipt(idReceipt) {
        var allPurchases = [];
        await firebaseAdmin.db.collection("purchase")
            .where("outOfStock", "==", false)
            .where("idReceipt", "==", idReceipt)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach(function (doc) {
                    var purh = {
                        idPurchase: doc.id,
                        idReceipt: doc.data().idReceipt,
                        unitPrice: doc.data().unitPrice,
                        tottalUnits: doc.data().tottalUnits,
                        idProduct: doc.data().idProduct,
                        notAvailableUnits: doc.data().notAvailableUnits,
                        outOfStock: doc.data().outOfStock
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
    /**
     * this function retreives all the purchases for a product
     * @param {*} idProduct a product id
     * @returns the purchase list
     */
    async getAllPurchasesByIdProduct(idProduct) {
        var allPurchases = [];
        await firebaseAdmin.db.collection("purchase").where("idProduct", "==", idProduct)
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
                        state: doc.data().state,
                        notAvailableUnits: doc.data().notAvailableUnits
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
    /**
     * this function calls the firebase database to
     * get a purchase register
     * @param {*} pIdPurchase 
     * @returns 
     */
    async getPurchase(pIdPurchase) {
        var purchase;
        await firebaseAdmin.db.collection("purchase").doc(pIdPurchase).get()
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
    /**
     * this function updates a purchase register
     * @param {*} pPurchase purchase object
     * @returns the updated purchase
     */
    async updatePurchase(pPurchase) {
        var d = new Date();
        var res = await firebaseAdmin.db.collection('purchase')
            .doc(pPurchase.idPurchase).update({
                updateDate: d,
                outOfStock: pPurchase.outOfStock,
                notAvailableUnits: pPurchase.notAvailableUnits
            }).then(function (result) {
                console.log("Updated purchase: " + result);
            }).catch(function (error) {
                console.log(error);
                return null;
            });
        return res;
    }
    /**
     * this function updates the purchase
     * @param {*} pPurchase purchase id
     * @returns the purchase updated
     */
    async updatePurchaseOutOfStock(pPurchase) {
        var d = new Date();
        var res = await firebaseAdmin.db.collection('purchase').doc(pPurchase.idPurchase).update({
            outOfStock: true
        }).then(function (result) {
            console.log(result);
        }).catch(function (error) {
            console.log(result);
            return null;
        });
        return res;
    }
    /**
     * this function deletes the purchase
     * using the purchase id
     * @param {*} pIdPurchase the purchase id
     */
    async deletePurchase(pIdPurchase) {
        await firebaseAdmin.db.collection('purchase').doc(pIdPurchase).delete();
        console.log('Document ' + pIdPurchase + ' deleted!');
    }
}
const purchases = new Purchase();

module.exports = {
    purchases: purchases
}