"use strict";

var productcategoryList = document.querySelector('#category-product-list');
var productForm = document.querySelector('#add-product-form');
var productFormMessage = document.querySelector('#productFormMessage');
var btnResetForm = document.querySelector('#btnResetForm');
var categoryList;
var productList;
var productToUpdate = null;
var indexCategorySelected;
var imageToFirebase = false;
var isUpdating = false;
var currentUser = null; //if the current user is not set up
//it returns to the client side

window.onload = function _callee() {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
          productForm.creationDate.valueAsDate = new Date();
          productForm.modificationDate.valueAsDate = new Date();
          verifyUserCredentials();
          getInformation();

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
};

productForm.inputGroupFile01.addEventListener('change', function (e) {
  imageToFirebase = !imageToFirebase;
}); //get information from the session storage
//and render the categories options

function getInformation() {
  return regeneratorRuntime.async(function getInformation$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          categoryList = JSON.parse(sessionStorage.getItem('categories'));
          categoryList.forEach(function (item) {
            var li = createCustomTextTag('option', 'divider', item.name);
            li.setAttribute('role', 'presentation');
            li.setAttribute('value', item.idCategory);
            productForm.stateSelect.appendChild(li);
            renderCategoryList(item);
          });

          if (categoryList != null) {
            indexCategorySelected = categoryList[0].idCategory;
          }

          productList = JSON.parse(sessionStorage.getItem('allProducts'));
          productList.forEach(function (item) {
            renderProductList(item);
          });

        case 5:
        case "end":
          return _context2.stop();
      }
    }
  });
}

function chageIndexSelected(sel) {
  indexCategorySelected = categoryList[sel.selectedIndex].idCategory;
}

productForm.price.addEventListener("keypress", function (ev) {
  return noLetters(ev);
}); //https://medium.com/developer-rants/uploading-form-fields-and-files-at-the-same-time-with-multer-node-js-typescript-c1a367eb8198
//add or update products
// productForm.addEventListener('submit', async (e) => {
//     e.preventDefault();
//     if (isUpdating) {
//         console.log('updating');
//         setProductToUpdate();
//         showPleaseWait();
//         await updateProduct(productToUpdate).then(async () => {
//             if (imageToFirebase) {
//                 console.log('se agrega imagen');
//                 await uploadImage(productToUpdate.idProduct);
//             }
//             console.log("rendering");
//             productToUpdate.creationDate = getCustomDateNew(productToUpdate.creationDate);
//             productToUpdate.modificationDate = getCustomDateNew(productToUpdate.modificationDate);
//             productList.push(productToUpdate);
//             renderProductList(productToUpdate);
//             sessionStorage.setItem('allProducts', JSON.stringify(productList));
//             productToUpdate = null;
//             clearForm();
//             hidePleaseWait();
//         });
//     } else {
//         var product = createProduct();
//         if (imageToFirebase) {
//             const options = {
//                 method: 'POST',
//                 headers: {
//                     'Content-type': 'application/json'
//                 },
//                 body: JSON.stringify(product)
//             }
//             fetch(localHost + "/addProduct", options).then(
//                 result => result.json()
//             ).then((result) => {
//                 uploadImage(result.idProduct);
//                 result.creationDate = getCustomDateNew(new Date(productForm.creationDate.value));
//                 result.modificationDate = getCustomDateNew(new Date(productForm.modificationDate.value));
//                 productList.push(result);
//                 sessionStorage.setItem('allProducts', JSON.stringify(productList));
//                 renderProductList(result);
//                 clearForm();
//                 hidePleaseWait();
//             });
//             hidePleaseWait();
//         } else {
//             alert(addImageMessage);
//         }
//     }
// });

productForm.addEventListener('submit', function _callee2(e) {
  return regeneratorRuntime.async(function _callee2$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          e.preventDefault();

          if (imageToFirebase) {
            showPleaseWait();
            callServer();
            hidePleaseWait();
          } else {
            alert(addImageMessage);
          }

        case 2:
        case "end":
          return _context3.stop();
      }
    }
  });
}); //call the server

function callServer() {
  var formData = createFormDataProduct();
  var options = {
    method: 'POST',
    body: formData
  };
  fetch(localHost + "/addProductTest", {
    method: 'POST',
    body: formData
  }).then(function (response) {
    return response.json();
  }).then(function (result) {
    afterServerCallsettings(result);
  })["catch"](function (error) {
    console.error('Error:', error);
  });
}

function afterServerCallsettings(productResult) {
  console.log('Success:', productResult);
  productResult.creationDate = getCustomDateNew(new Date(productForm.creationDate.value));
  productResult.modificationDate = getCustomDateNew(new Date(productForm.modificationDate.value));
  productList.push(productResult);
  sessionStorage.setItem('allProducts', JSON.stringify(productList));
  renderProductList(productResult);
  clearForm();
}

function renderCategoryList(item) {
  var divBtnHide = createCustomNonTextTag('div', 'card');
  divBtnHide.setAttribute("style", "margin: 10px;");
  var btnHide = document.createElement("button");
  divBtnHide.appendChild(btnHide);
  btnHide.setAttribute("class", "btn btn-info btn-lg");
  btnHide.innerHTML = item.name;
  var mainContainer = document.createElement("div");
  mainContainer.setAttribute("class", "row");
  mainContainer.setAttribute("style", "margin:10px; padding:5px; display:none;");
  btnHide.addEventListener('click', function (e) {
    e.stopPropagation();

    if (mainContainer.style.display === "none") {
      mainContainer.style.display = "block";
    } else {
      mainContainer.style.display = "none";
    }
  });
  mainContainer.setAttribute("id", item.idCategory);
  productcategoryList.appendChild(divBtnHide);
  productcategoryList.appendChild(mainContainer);
}

; //create a list for every category

function renderProductList(doc) {
  var btnDelete = createCustomTextTag('button', 'btn btn-danger', 'X');
  btnDelete.setAttribute('style', 'margin-right:5px');
  var btnUpdate = createCustomTextTag('button', 'btn btn-warning', '!');
  btnUpdate.setAttribute('style', 'margin-right:5px');
  var btnPurchse = createCustomTextTag('button', 'btn btn-info', '!');
  var divProdDetails = createCustomNonTextTag('div', 'container-fluid border border-primary rounded');
  divProdDetails.setAttribute("style", "margin: 10px; padding: 10px;");
  var pName = createCustomTextTag('h3', 'h3', prodModaldetailsName + doc.name + " ");
  var pShowImage = createCustomTextTag('small', 'text-primary', showProductImage);
  pShowImage.setAttribute("style", "text-decoration: underline;");
  pName.appendChild(pShowImage);
  var pidProduct = createCustomTextTag('p', 'lead', placeHolderProductId + doc.idProduct);
  var pPrice = createCustomTextTag('p', 'lead', placeHolderProductPrice + ": " + doc.price);
  var pShowPrice = createCustomTextTag('p', 'lead', doc.showPrice == true ? showProductPriceMessageYes : showProductPriceMessageNo);
  var pInventory = createCustomTextTag('p', 'lead', placeHolderProductInventory + doc.inventory);
  var pState = createCustomTextTag('p', 'lead', placeHolderProductState + doc.activ);
  var d = new Date(doc.creationDate);
  var pCreation = createCustomTextTag('p', 'lead', creationdateMessage + ": " + doc.creationDate.year + '-' + doc.creationDate.date + '-' + doc.creationDate.month);
  d = new Date(doc.modificationDate);
  var pModification = createCustomTextTag('p', 'lead', lastModificationMessage + ": " + doc.modificationDate.year + '-' + doc.modificationDate.date + '-' + doc.modificationDate.month);
  appendChildListTag([pName, pidProduct, pidProduct, pPrice, pShowPrice, pInventory, pState, pCreation, pModification, btnDelete, btnUpdate, btnPurchse], divProdDetails);
  var prodli = document.createElement('div');
  prodli.setAttribute('class', 'col-sm');
  prodli.setAttribute('id', doc.idProduct);
  prodli.appendChild(divProdDetails);
  document.getElementById(doc.category).appendChild(prodli); // deleting data

  btnDelete.addEventListener('click', function _callee3(e) {
    var id, i;
    return regeneratorRuntime.async(function _callee3$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            e.stopPropagation();
            id = doc.idProduct;
            showPleaseWait();
            _context4.next = 5;
            return regeneratorRuntime.awrap(deleteProduct(id));

          case 5:
            i = 0;

            while (productList[i] != doc) {
              i++;
            }

            productList.splice(i, 1);
            sessionStorage.setItem('allProducts', JSON.stringify(productList));
            hidePleaseWait();
            document.getElementById(doc.category).removeChild(prodli);

          case 11:
          case "end":
            return _context4.stop();
        }
      }
    });
  }); // updating data

  btnUpdate.addEventListener('click', function (e) {
    e.stopPropagation();
    clearForm(); // btnResetForm.setAttribute('style', 'visibility: visible;')
    // productFormMessage.innerHTML = updatingFormMessage;
    // productToUpdate = doc;
    // indexCategorySelected = doc.category;
    // var i = 0;
    // while (productList[i] != doc) {
    //     i++;
    // }
    // productList.splice(i, 1);

    isUpdating = true;
    loadProductForm(doc);
  });
  btnPurchse.addEventListener('click', function (e) {
    e.stopPropagation();
    window.location.href = '/admin/pages/purchases/purchase?id=' + doc.idProduct;
  }); //show product image

  pShowImage.addEventListener('click', function _callee4(e) {
    return regeneratorRuntime.async(function _callee4$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            e.stopPropagation();
            document.getElementById("productDetailsModLabelLabel").innerHTML = doc.name;
            $('#modalImageFirebase').attr('src', url + doc.idProduct + urlPlus);
            $('#productDetailsModLabel').modal('show');

          case 4:
          case "end":
            return _context5.stop();
        }
      }
    });
  });
}

function createProduct() {
  var cd = new Date(productForm.creationDate.value);
  var md = new Date(productForm.modificationDate.value);
  var priceFlag;
  productForm.showPrice.value == "true" ? priceFlag = true : priceFlag = false;
  var product = {
    name: productForm.name.value,
    price: productForm.price.value,
    inventory: 0,
    category: indexCategorySelected,
    creationDate: cd,
    modificationDate: md,
    activ: productForm.activ.value,
    description: productForm.description.value,
    showPrice: priceFlag
  };
  return product;
}

function createFormDataProduct() {
  formdata = new FormData();
  var cd = new Date(productForm.creationDate.value);
  var md = new Date(productForm.modificationDate.value);
  var priceFlag;
  productForm.showPrice.value == "true" ? priceFlag = true : priceFlag = false;
  formdata.append('isUpdating', isUpdating);
  formdata.append('idProduct', productForm.idProduct.value);
  formdata.append('imageToFirebase', imageToFirebase);
  formdata.append('name', productForm.name.value);
  formdata.append('price', productForm.price.value);
  formdata.append('inventory', 0);
  formdata.append('category', indexCategorySelected);
  formdata.append('creationDate', cd);
  formdata.append('modificationDate', md);
  formdata.append('activ', productForm.activ.value);
  formdata.append('description', productForm.description.value);
  formdata.append('showPrice', priceFlag);
  formdata.append('inputGroupFile01', productForm.inputGroupFile01.files[0]);
  return formdata;
}

function setProductToUpdate() {
  if (productToUpdate.category != indexCategorySelected) {
    console.log('removing');
    var del = document.getElementById(productToUpdate.idProduct);
    document.getElementById(productToUpdate.category).removeChild(del);
  } else {
    console.log('removing');
    var del = document.getElementById(productToUpdate.idProduct);
    document.getElementById(indexCategorySelected).removeChild(del);
  }

  var up = {
    inventory: productToUpdate.inventory,
    idProduct: productToUpdate.idProduct
  };
  productToUpdate = createProduct();
  productToUpdate.inventory = up.inventory;
  productToUpdate.idProduct = up.idProduct;
}

function loadProductForm(doc) {
  productForm.idProduct = doc.idProduct;
  productForm.name.value = doc.name;
  productForm.price.value = doc.price;
  productForm.stateSelect.value = doc.category;
  productForm.creationDate.value = doc.creationDate.year + "-" + doc.creationDate.month + "-" + doc.creationDate.date;
  productForm.modificationDate.valueAsDate = new Date();
  productForm.activ.value = doc.activ;
  productForm.description.value = doc.description;
  productForm.showPrice.value = doc.showPrice;
  $('#imageFirebase').attr('src', url + doc.idProduct + urlPlus);
}

function clearForm() {
  productForm.reset();
  productForm.inputGroupFile01.innerHTML = chooseFileMessage;
  productForm.imageFirebase.setAttribute('src', '#');
  productToUpdate == null ? console.log("reseting the form") : productList.push(productToUpdate);
  productToUpdate = null;
  this.isUpdating = false;
  this.imageToFirebase = false;
  productFormMessage.innerHTML = '';
  btnResetForm.setAttribute('style', 'visibility: hidden;');
  productForm.creationDate.valueAsDate = new Date();
  productForm.modificationDate.valueAsDate = new Date();
  indexCategorySelected = categoryList[0].idCategory;
  hideAndShowDivFuction();
}