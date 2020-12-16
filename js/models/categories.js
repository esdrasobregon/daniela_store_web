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
        var cat = {idCategory: doc.id, description: doc.data().description};
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
  //get a categorie
async function getCategory(pIdCategory){
  var category;
  await db.collection("productCategories").doc(pIdCategory).get()
  .then(function(doc) {
    if (doc.exists) {
      console.log("Document data:", doc.data());
      category.description = doc.data().description;
      Category.city = doc.id;
    } else {
      console.log("No such document!");
    }}).catch(function(error) {
      console.log("Error getting document:", error);
    });
    return Category;
}
//update category
async function updateCategory(pIdCategory, pDescription){
  await db.collection('productCategories').doc(pIdCategory).update({
    description: pDescription
  });
}
//delete category
async function deleteCategory(pIdCategory){
  await db.collection('productCategories').doc(pIdCategory).delete();
  alert('Document '+pIdCategory+' deleted!');
}