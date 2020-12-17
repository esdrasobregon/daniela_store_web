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
