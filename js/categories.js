var categories;

async function getCategories(db) {
  categories = await db.collection("productCategories").get()
    .then(function (querySnapshot) {
      return querySnapshot.once('value').then(snap => snap.val());
    })
    .catch(function (error) {
      console.log("Error getting documents: ", error);
      return null;
    });
}
//adding category
var addCategory = async function (db, pCategory) {
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
//get a categorie
var getCategory = async function (db, pIdCategory) {
  var category;
  await db.collection("productCategories").doc(pIdCategory).get()
    .then(function (doc) {
      if (doc.exists) {
        console.log("Document data:", doc.data());
        category = {
          idCategory: doc.id,
          description: doc.data().description,
          name: doc.data().name,
          status: doc.data().status
        };
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
var updateCategory = async function (db, pCategory) {
  try {
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

  } catch (error) {
    console.log("error updating category: " + error);
    return error;
  }
}
//delete category
var deleteCategory = async function (db, pIdCategory) {
  await db.collection('productCategories').doc(pIdCategory).delete();
  console.log('Document ' + pIdCategory + ' deleted!');
}
var allCategories = async function (db) {
  var allCategories = [];
  await db.collection("productCategories").get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        var cat = {
          idCategory: doc.id,
          description: doc.data().description,
          name: doc.data().name,
          status: doc.data().status
        };
        allCategories.push(cat);
      });
    })
    .catch(function (error) {
      console.log("Error getting documents: ", error);
      return null;
    });
  return allCategories;
}
module.exports = {
  allCategories: allCategories,
  deleteCategory: deleteCategory,
  updateCategory: updateCategory,
  getCategory: getCategory,
  addCategory: addCategory
}