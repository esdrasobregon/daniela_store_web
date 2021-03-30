class Category {
  constructor(name, idCategory, description, status) {
    this.name = name;
    this.idCategory = idCategory;
    this.description = description;
    this.status = status;
  }
}
//functions
//adding category
async function addCategory(pCategory) {
  await db.collection('productCategories').add({
    name: pCategory.name,
    status: pCategory.status,
    description: pCategory.description
  }).then(function (docRef) {
    pCategory.idCategory = docRef.id;
    console.log('Document added');
  }).catch(function (error) {
    console.error("Error adding document: ", error);
    return null;
  });
}
//getting all categories data
async function getAllCategories() {
  var allCategories = [];
  await db.collection("productCategories").get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        var cat = { idCategory: doc.id, description: doc.data().description, name: doc.data().name, status: doc.data().status };
        allCategories.push(cat);
        console.log(doc.id, " => ", doc.data());
      });
    })
    .catch(function (error) {
      console.log("Error getting documents: ", error);
      return null;
    });
  return allCategories;
}
//get a categorie
async function getCategory(pIdCategory) {
  var category;
  await db.collection("productCategories").doc(pIdCategory).get()
    .then(function (doc) {
      if (doc.exists) {
        console.log("Document data:", doc.data());
        category = { idCategory: doc.id, description: doc.data().description, name: doc.data().name, status: doc.data().status };
      } else {
        console.log("No such document!");
      }
    }).catch(function (error) {
      console.log("Error getting document:", error);
      return null;
    });
  return category;
}
//update category
async function updateCategory(pCategory) {
  var result = await db.collection('productCategories').doc(pCategory.idCategory).update({
    description: pCategory.description,
    status: pCategory.status,
    name: pCategory.name
  });
  if (result == null) {
    return null;
  } else {
    return result
  };
}
//delete category
async function deleteCategory(pIdCategory) {
  await db.collection('productCategories').doc(pIdCategory).delete();
  alert('Document ' + pIdCategory + ' deleted!');
}