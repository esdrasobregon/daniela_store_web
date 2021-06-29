class Product {
  constructor(name, price, image, creationDate, activ, category, idProduc, idUser, modificationDate, inventory, description, showPrice) {
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
  getname() {
    return this.name;
  }

}
//functions
var product = function (doc) {
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
//getting all products data
var allProducts = async function (db) {
  var allProd = [];
  await db.collection("products").get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        var product = {
          idProduct: doc.id,
          name: doc.data().name,
          price: doc.data().price,
          category: doc.data().category,
          creationDate: getCustomDate(doc.data().creationDate),
          modificationDate: getCustomDate(doc.data().modificationDate),
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

function getCustomDate(pDateObject) {
  var dateResult = {
    year: "",
    date: "",
    month: ""
  };
  dateResult.year = pDateObject.toDate().getFullYear();
  pDateObject.toDate().getMonth() < 10 ? dateResult.month = "0" + pDateObject.toDate().getMonth() : dateResult.month += pDateObject.toDate().getMonth();
  pDateObject.toDate().getDate() < 10 ? dateResult.date = "0" + pDateObject.toDate().getDate() : dateResult.date += pDateObject.toDate().getDate();
  return dateResult;
}

//adding products
var addProduct = async function (db, pProduct) {
  try {
    await db.collection('products').add({
      name: pProduct.name,
      price: parseFloat(pProduct.price),
      inventory: pProduct.inventory,
      category: pProduct.category,
      creationDate: new Date(),
      modificationDate: new Date(),
      activ: pProduct.activ,
      description: pProduct.description,
      showPrice: pProduct.showPrice
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

//get a pruduct
var getProduct = async function (idProduct) {
  var product;
  await db.collection("products").doc(idProduct).get()
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
//update product
var updateProduct = async function (db, pProduct) {
  await db.collection('products').doc(pProduct.idProduct).update({
    name: pProduct.name,
    price: pProduct.price,
    category: pProduct.category,
    modificationDate: new Date(),
    activ: pProduct.activ,
    description: pProduct.description,
    showPrice: pProduct.showPrice
  }).then((result) => {
    console.log("product updated: " + result);
  }).catch((error) => {
    console.log("Error updating product: " + error)
  });
}
//update stock
var updateProductStock = async function (db, pIdProduct, pQuantityToAdd) {
  await db.collection('products').doc(pIdProduct).update({
    inventory: pQuantityToAdd
  }).then(function (result) {
    console.log("Register updated");
    return true;
  }).catch(function (error) {
    return null;
  });
}
//delete product
var deleteProduct = async function (db, pidProduct) {
  await db.collection('products').doc(pidProduct).delete().then(() => {
    console.log("Product " + pidProduct + " deleted");
  }).catch((error) => {
    console.log("error deleting product register: " + error);
  });

}

module.exports = {
  allProducts: allProducts,
  getProduct: getProduct,
  addProduct: addProduct,
  deleteProduct: deleteProduct,
  updateProductStock: updateProductStock,
  updateProduct: updateProduct,
  product: product
}