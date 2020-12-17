class Category {
  constructor(description, idCategory) {
    this.description = description;
    this.idCategory = idCategory;
  }
}
 //functions

 //getting all categories data
 async function getAllCategories(){
  var allCategories=[];
    await db.collection("productCategories").get()
    .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        var cat = {idCategory: doc.id, name: doc.data().name, status: doc.data().status, description: doc.data().description};
        allCategories.push(cat);
        console.log(doc.id, " => ", doc.data());
      });
    })
    .catch(function(error) {
      console.log("Error getting documents: ", error);
      return null;
    });
    return allCategories;
 }
 