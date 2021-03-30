
var categories;

async function getCategories(db){
	categories = await db.collection("productCategories").get()
    .then(function(querySnapshot) {
      return querySnapshot.once('value').then(snap => snap.val());
    })
    .catch(function(error) {
      console.log("Error getting documents: ", error);
      return null;
    });
}
var allCategories = async function(db){
  var allCategories=[];
    await db.collection("productCategories").get()
    .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        var cat = {idCategory: doc.id, description: doc.data().description, name: doc.data().name, status: doc.data().status};
        allCategories.push(cat);
      });
    })
    .catch(function(error) {
      console.log("Error getting documents: ", error);
      return null;
    });
    return allCategories;
 }

module.exports = {
  allCategories: allCategories
}