const firebaseAdmin = require("../../firebaseFunctions/firebaseSettings");

class Sales {
    constructor(idReceipt, idPurchaseIdReceipt, idSale, unitPrice, idProduct, units) {
        this.idSale = idSale;
        this.idPurchaseIdReceipt = idPurchaseIdReceipt;
        this.unitPrice = unitPrice;
        this.units = units;
        this.idProduct = idProduct;
        this.idReceipt = idReceipt;
    }
    /**
     * this function calls the firebase database
     * to add a sale register
     * @param {*} pSale a sale object
     */
    async addSale(pSale) {
        await firebaseAdmin.db.collection('sales').add({
            purchaseIdReceipt: pSale.purchaseIdReceipt,
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
    /**
     * this function calls the firebase database to 
     * retreive all the sales registers
     * @returns the sale list
     */
    async getAllSales() {
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
    /**
     * this function calls the firebase database to retreive
     * a sales list
     * @param {*} idReceipt 
     * @param {*} allSales 
     */
    async getAllSalesByIdReceipt(idReceipt, allSales) {
        await firebaseAdmin.db.collection("sales").where("idReceipt", "==", idReceipt).get()
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
    /**
     * this function calls the firebase database to retreive a 
     * sale register
     * @param {*} pIdSale a sale object id 
     */
    async getSale(pIdSale) {
        var docRef = firebaseAdmin.db.collection("sales").doc(pIdSale);

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
    /**
     * this function calls the firebase database to update a 
     * purchase register
     * this function must be updated
     * @param {*} pPurchase the purchase obeject  
     * @returns a purchase object
     */
    async updatePurchase(pPurchase) {
        var d = new Date();
        var res = await firebaseAdmin.db.collection('purchase')
            .doc(pPurchase.idPurchase).update({
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
    /**
     * this function calls the firebae database to delete
     * a register
     * @param {*} pIdSale 
     */
    async deletePurchase(pIdSale) {
        await firebaseAdmin.db.collection('sales')
            .doc(pIdSale).delete();
        alert('Document ' + pIdSale + ' deleted!');
    }
}

const sales = new Sales();

module.exports = {
    sales: sales
}