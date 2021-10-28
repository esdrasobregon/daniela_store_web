const firebaseAdmin = require("../../firebaseFunctions/firebaseSettings");

class ReceiptType {
  constructor(idReceiptType, description) {
    this.idReceiptType = idReceiptType;
    this.description = description;
  }
  /**
   * this function calls the firebase database add
   * category object
   * @param {*} pReceiptType a receipt type object to be added 
   */
  async add(pReceiptType) {
    await firebaseAdmin.db.collection('receiptType').add({
      description: pReceiptType.description
    }).then(function (docRef) {
      pReceiptType.idCategory = docRef.id;
      console.log('Document added');
    }).catch(function (error) {
      console.error("Error adding document: ", error);
      return null;
    });
  }

  /**
   * this function calls the firebase database to retreive
   * the receipt type that match the id send
   * @param {*} pIdReceiptType 
   * @returns the receipt type object
   */
  async get(pIdReceiptType) {
    var category;
    await firebaseAdmin.db.collection("receiptType").doc(pIdReceiptType).get()
      .then(function (doc) {
        if (doc.exists) {
          console.log("Document data:", doc.data());
          category = {
            idReceiptType: doc.id,
            description: doc.data().description
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
   * update a receipt type register
   * @param {*} pReceiptType the product category to be 
   * updated
   * @returns the receipt type updated 
   */
  async update(pReceiptType) {
    try {
      var result = await firebaseAdmin
        .db.collection('receiptType').doc(pReceiptType.idCategory).update({
          description: pReceiptType.description
        });
      if (result == null) {
        return null;
      } else {
        return result
      };

    } catch (error) {
      console.log("error updating document: " + error);
      return error;
    }
  }

  /**
   * this function calls firebase database to delete
   * a receipt type register
   * @param {*} pIdReceiptType id receipt type object
   * to be deleted
   */
  async delete(pIdReceiptType) {
    await firebaseAdmin.db.collection('receipType').doc(pIdReceiptType).delete();
    console.log('Document ' + pIdReceiptType + ' deleted!');
  }
  /**
   * this function calls the firebase database to retreive
   * all the receipt type there are
   * @returns the receipt type list 
   */
  async getAll() {
    var allReceiptType = [];
    await firebaseAdmin.db.collection("receiptType").get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          var recType = {
            idReceiptType: doc.id,
            description: doc.data().description
          };
          allReceiptType.push(recType);
        });
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
        return null;
      });
    return allReceiptType;
  }
}
const receiptType = new ReceiptType();
module.exports = {
  receiptType: receiptType
}