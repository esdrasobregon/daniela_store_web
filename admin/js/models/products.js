/*class Product {
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
  getname(){
    return this.name;
  } 

}*/
//functions

//adding products
async function addProduct(pProduct) {
  await db.collection('products').add({
    name: pProduct.name,
    price: parseFloat(pProduct.price),
    inventory: pProduct.inventory,
    category: pProduct.category,
    creationDate: pProduct.creationDate,
    modificationDate: pProduct.modificationDate,
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
}

//getting all products data
async function getAllProducts() {
  var allProducts = [];
  await db.collection("products").get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        var product = {
          idProduct: doc.id,
          name: doc.data().name,
          price: doc.data().price,
          category: doc.data().category,
          creationDate: doc.data().creationDate.toDate(),
          modificationDate: doc.data().modificationDate.toDate(),
          activ: doc.data().activ,
          inventory: doc.data().inventory,
          description: doc.data().description,
          showPrice: doc.data().showPrice
        };
        allProducts.push(product);
        console.log(doc.id, " => ", doc.data());
      });
    })
    .catch(function (error) {
      console.log("Error getting documents: ", error);
    });
  return allProducts;
}

//get a pruduct
async function getProduct(idProduct) {
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
async function updateProduct(pProduct) {
  await db.collection('products').doc(pProduct.idProduct).update({
    name: pProduct.name,
    price: pProduct.price,
    category: pProduct.category,
    modificationDate: pProduct.modificationDate,
    activ: pProduct.activ,
    description: pProduct.description,
    showPrice: pProduct.showPrice
  });
}
//update stock
async function updateProductStock(pIdProduct, pQuantityToAdd) {
  await db.collection('products').doc(pIdProduct).update({
    inventory: pQuantityToAdd
  }).then(function (result) {
    alert("Register updated");
    return true;
  }).catch(function (error) {
    return null;
  });
}
//delete product
async function deleteProduct(pidProduct) {
  await db.collection('products').doc(pidProduct).delete();
  alert('Document ' + pidProduct + ' deleted!');
}