class Product {
  constructor(name, price, image, creationDate, activ, category, idProduc, idUser, modificationDate, inventory, description) {
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
  }
  getname(){
    return this.name;
  } 

}
 //functions

 //adding products
 async function addProduct(pProduct){
    await db.collection('products').add({
          name: pProduct.name,
          price: pProduct.price,
          inventory: pProduct.inventory,
          category: pProduct.category,
          creationDate: pProduct.creationDate,
          modificationDate: pProduct.modificationDate,
          activ: pProduct.activ,
          description: pProduct.description
      }).then(function(docRef) {
           window.location.href = '../../shared/uploadImages.html?id='+docRef.id+'?productName='+pProduct.name;
      }).catch(function(error) {
          console.error("Error adding document: ", error);
          return null;
      });
 }

 //getting all products data
 async function getAllProducts(){
    var allProducts=[];
    await db.collection("products").get()
    .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        var product = {
          idProduct: doc.id, 
          name: doc.data().name, 
          price: doc.data().price,
          category: doc.data().category,
          creationDate: doc.data().creationDate,
          modificationDate: doc.data().modificationDate,
          activ: doc.data().activ,
          inventory: doc.data().inventory,
          description: doc.data().description
        };
        allProducts.push(product);
        console.log(doc.id, " => ", doc.data());
      });
    })
    .catch(function(error) {
      console.log("Error getting documents: ", error);
    });
    return allProducts;
 }

  //get a pruduct
async function getProduct(idProduct){
  await db.collection("products").doc(idProduct).get()
  .then(function(doc) {
    if (doc.exists) {
      console.log("Document data:", doc.data());
      product.name = doc.data().name;
      product.price = doc.data().price;
      product.category = doc.data().category;
      product.creationDate = doc.data().creationDate;
      product.modificationDate = doc.data().modificationDate;
      product.activ = doc.data().activ;
      product.idProduct = doc.id;
      product.inventory = doc.data().inventory;
      product.description = doc.data().description;
    } else {
      console.log("No such document!");
    }}).catch(function(error) {
      console.log("Error getting document:", error);
    });
}
//update product
async function updateProduct(idProduct, pProduct){
  await db.collection('products').doc(idProduct).update({
    name: pProduct.name,
    price: pProduct.price,
    inventory: pProduct.inventory,
    category: pProduct.category,
    modificationDate: pProduct.modificationDate,
    activ: pProduct.activ,
    description: pProduct.description
  });
}
//delete product
async function deleteProduct(pidProduct){
  await db.collection('products').doc(pidProduct).delete();
  alert('Document '+pidProduct+' deleted!');
}