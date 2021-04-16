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
  var dateResult = { year: "", date: "", month: "" };
  dateResult.year = pDateObject.toDate().getFullYear();
  pDateObject.toDate().getMonth() < 10 ? dateResult.month = "0" + pDateObject.toDate().getMonth() : dateResult.month += pDateObject.toDate().getMonth();
  pDateObject.toDate().getDate() < 10 ? dateResult.date = "0" + pDateObject.toDate().getDate() : dateResult.date += pDateObject.toDate().getDate();
  return dateResult;
}
module.exports = {
  allProducts: allProducts
}