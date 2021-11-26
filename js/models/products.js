const firebaseAdmin = require("../../firebaseFunctions/firebaseSettings");
const commonFunction = require('../../serverFunctions/commonFunctions.js');
class Product {
    constructor(name, price, creationDate, activ, category, idProduc, idUser, modificationDate, inventory, description, showPrice) {
        this.name = name;
        this.price = price;
        this.image = creationDate;
        this.activ = activ;
        this.category = category;
        this.modificationDate = modificationDate;
        this.inventory = inventory;
        this.id = idProduc;
        this.idUser;
        this.description = description;
        this.showPrice = showPrice;
    }
    /**
     * this function takes an object who has more 
     * than just than a product object properties
     * and returns a product object
     * @param {*} doc an object that contains product
     * object properties
     * @returns a product object
     */
    getCostummProduct(doc) {
        var prod = {
            idProduct: doc.idProduct,
            name: doc.name,
            price: doc.price,
            category: doc.category,
            creationDate: doc.creationDate,
            modificationDate: doc.modificationDate,
            activ: doc.activ,
            inventory: doc.inventory,
            description: doc.description,
            showPrice: doc.showPrice
        };
        return prod;
    }
    /**
     * this function retreives all availables products
     * from firebase database
     */
    async allProducts() {
        var allProd = [];
        await firebaseAdmin.db.collection("products").get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    var product = {
                        idProduct: doc.id,
                        name: doc.data().name,
                        price: doc.data().price,
                        category: doc.data().category,
                        creationDate: commonFunction.getCustomDate(doc.data().creationDate),
                        modificationDate: commonFunction.getCustomDate(doc.data().modificationDate),
                        activ: doc.data().activ,
                        inventory: doc.data().inventory,
                        description: doc.data().description,
                        showPrice: doc.data().showPrice
                    };
                    allProd.push(product);
                });
            })
            .catch(function (error) {
                console.log("Error getting documents: ", error);
            });
        return allProd;
    }

    /**
     * this function add a product to the firebase
     * database
     */
    async addProduct(pProduct) {
        var showPriceFlag = false;
        pProduct.showPrice == "true" ?
            showPriceFlag = true :
            showPriceFlag = false;
        try {
            await firebaseAdmin.db.collection('products').add({
                name: pProduct.name,
                price: parseFloat(pProduct.price),
                inventory: parseFloat(pProduct.inventory),
                category: pProduct.category,
                creationDate: new Date(),
                modificationDate: new Date(),
                activ: pProduct.activ,
                description: pProduct.description,
                showPrice: showPriceFlag
            }).then(function (docRef) {
                pProduct.idProduct = docRef.id;
                console.log('added');
            }).catch(function (error) {
                console.error("Error adding document: ", error);
                return null;
            });
        } catch (error) {
            console.log("error adding product register");
            return error;
        }
    }
    /**
     * this function validates a product object 
     * properties
     * @param {*} product a product object 
     * @returns a bool confirmation flag
     */
    validateProduc(product) {
        var flag = true;
        try {
            // flag = commonFunction.isValid(doc.idProduct);
            // flag == false ?
            //   console.log(doc.idProduc+" not valid"):
            //     flag = commonFunction.isValid(doc.name);
            flag = commonFunction.isNotValid(product.name);
            flag == true ?
                console.log("name: " + product.name + " not valid") :
                flag = commonFunction.isNotValid(product.price);
            // flag == false ?
            //   return flag: flag = commonFunction(doc.category);
            flag == true ?
                console.log("price: " + product.price + " not valid") :
                flag = commonFunction.isNotValid(product.description);
            flag == true ?
                console.log("description: " + product.description + " not valid") :
                console.log("description valid");
        } catch (error) {
            console.log("Error: " + error);
            flag = true;
        }
        return flag;
    }
    /**
     * this function retreves a product object
     * from firebase database
     * @param {*} idProduct the id product to retreive
     * @returns the product object from the database
     */
    async getProduct(idProduct) {
        var product;
        await firebaseAdmin.db.collection("products").doc(idProduct).get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    product = {
                        idProduct: doc.id,
                        name: doc.data().name,
                        price: doc.data().price,
                        category: doc.data().category,
                        creationDate: doc.data().creationDate,
                        modificationDate: doc.data().modificationDate,
                        activ: doc.data().activ,
                        inventory: doc.data().inventory,
                        description: doc.data().description,
                        showPrice: doc.data().showPrice
                    };
                    console.log(doc.id, " => ", doc.data());
                });
            }).catch(function (error) {
                console.log("Error getting document:", error);
            });
        return product;
    }

    /**
     * this function calls the firebase database
     * to update a product
     * @param {*} pProduct a product object
     */
    async updateProduct(pProduct) {
        var showPriceFlag = false;
        pProduct.showPrice == "true" ?
            showPriceFlag = true :
            showPriceFlag = false;
        try {
            await firebaseAdmin.db.collection('products').doc(pProduct.idProduct).update({
                name: pProduct.name,
                price: parseFloat(pProduct.price),
                category: pProduct.category,
                modificationDate: new Date(),
                activ: pProduct.activ,
                description: pProduct.description,
                showPrice: showPriceFlag
            }).then((result) => {
                console.log("product updated: " + result);
            }).catch((error) => {
                console.log("Error updating product: " + error)
            });
        } catch (error) {
            console.log("Error updadating" + error)
        }
    }
    /**
     * this function calls the firebase database to
     * delete a product register
     * @param {*} pidProduct the product id
     */
    async deleteProduct(pidProduct) {
        await firebaseAdmin.db.collection('products').doc(pidProduct).delete().then(() => {
            console.log("Product " + pidProduct + " deleted");
        }).catch((error) => {
            console.log("error deleting product register: " + error);
        });

    }

}
const product = new Product();

module.exports = product;