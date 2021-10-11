const firebaseAdmin = require("../../firebaseFunctions/firebaseSettings");

class Category {
  constructor(name, idCategory, description, status) {
    this.name = name;
    this.idCategory = idCategory;
    this.description = description;
    this.status = status;
  }
  /**
   * this function calls the firebase database add
   * category object
   * @param {*} pCategory a category object to be added 
   */
  async addCategory(pCategory) {
    await firebaseAdmin.db.collection('productCategories').add({
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

  /**
   * this function calls the firebase database to retreive
   * the product category that match the id send
   * @param {*} pIdCategory 
   * @returns the product category object
   */
  async getCategory(pIdCategory) {
    var category;
    await firebaseAdmin.db.collection("productCategories").doc(pIdCategory).get()
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

  /**
   * this function calls the firebase database to
   * update a product category register
   * @param {*} pCategory the product category to be 
   * updated
   * @returns the product category updated 
   */
  async updateCategory(pCategory) {
    try {
      var result = await firebaseAdmin.db.collection('productCategories').doc(pCategory.idCategory).update({
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

  /**
   * this function calls firebase database to delete
   * a category register
   * @param {*} pIdCategory id category object
   * to be deleted
   */
  async deleteCategory(pIdCategory) {
    await firebaseAdmin.db.collection('productCategories').doc(pIdCategory).delete();
    console.log('Document ' + pIdCategory + ' deleted!');
  }
  /**
   * this function calls the firebase database to retreive
   * all the product categories there are
   * @returns the category list 
   */
  async allCategories() {
    var allCategories = [];
    await firebaseAdmin.db.collection("productCategories").get()
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
}
const category = new Category();
module.exports = {
  category: category
}