const firebaseAdmin = require("../../firebaseFunctions/firebaseSettings");
const commonFunction = require('../../serverFunctions/commonFunctions.js');

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
    /**
     * this function calls the firebase database to add a
     * receipt register
     * @param {*} pReceipt a receipt object
     */
    async addReceipt(pReceipt) {
        var paymentState = pReceipt.paymentState == "true" ?
            true :
            false;
        await firebaseAdmin.db.collection('receipt').add({
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
    async getAllReceipts() {
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
     * this function takes all the receipts for the
     * current month
     * @returns the receipt list
     */
    async getActualMonthReceipts() {
        var allReceipts = [];
        var today = new Date();
        var initDate = new Date(today.getFullYear(), today.getMonth(), 0);
        var finalDate = new Date(today.getFullYear(), today.getMonth() + 1, 1);
        console.log("today: " + today + " init date: " + initDate + "last date: " + finalDate);
        await firebaseAdmin.db.collection("receipt")
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
    /**
     * this function calls the firebase database to get all
     * re receipts associated with the product
     * @param {*} idProduct a product object id 
     * @returns the receipt list 
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
    /**
     * this function calls the firebase database to get the
     * receipt associated with the purchase id
     * @param {*} pIdPurchase a purchase object id
     * @returns the receipt
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
     * this function calls the firebase database to 
     * update a receipt register
     * @param {*} pReceipt 
     * @returns the receipt register updated
     */
    async updatePurchase(pReceipt) {
        var d = new Date();
        var res = await firebaseAdmin.db.collection('receipt')
            .doc(pReceipt.idPurchase).update({
                updateDate: d,
                state: "Done"
            }).then(function (result) {
                pReceipt.state = "Done";
                console.log(result);
            }).catch(function (error) {
                console.log(error);
                return null;
            });
        return res;
    }

    /**
     * this function calls the firebase database to delete a
     * receipt register
     * @param {*} pIdReceipt id receipt object 
     */
    async deleteReceipt(pIdReceipt) {
        await firebaseAdmin.db.collection('receipt')
            .doc(pIdReceipt).delete();
        console.log('Document ' + pIdReceipt + ' deleted!');
    }
}
const receipt = new Receipt();

module.exports =  receipt;