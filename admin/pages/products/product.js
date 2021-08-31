//#region variables

const productcategoryList = document.querySelector('#category-product-list');
const productForm = document.querySelector('#add-product-form');
const productFormMessage = document.querySelector('#productFormMessage');
const btnResetForm = document.querySelector('#btnResetForm');
var categoryList;
var productList;
var receiptList = [];
var indexCategorySelected;
var imageToFirebase = false;
var isUpdating = false;
var currentUser = null;
var productsToSale = [];
var productsTopurchase = [];

//#endregion variables

//#region view

productForm.inputGroupFile01.addEventListener('change', (e) => {
    imageToFirebase = !imageToFirebase;
});

function renderView() {
    categoryList.forEach(item => {
        var li = createCustomTextTag('option', 'divider', item.name);
        li.setAttribute('role', 'presentation');
        li.setAttribute('value', item.idCategory);
        productForm.categorySelect.appendChild(li);
        renderCategoryList(item);
    });

    productList = JSON.parse(sessionStorage.getItem('allProducts'));
    productList.forEach(item => {
        renderProductList(item);
    });
}
productForm.price
    .addEventListener("keypress", (ev) => noLetters(ev));

//this function handles the add and update products
productForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (isUpdating) {
        await callUpdateServer();
        showPleaseWait();
        setTimeout(() => {
            hidePleaseWait();
        }, 3000);
    } else {
        await callAddServer();
        showPleaseWait();
        setTimeout(() => {
            hidePleaseWait();
        }, 3000);
    }


});
/**
 * use this function to render a category
 * to the view
 * @param {*} item is a category object
 */
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
    btnHide.addEventListener('click', (e) => {
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

};

/**
 * use this function to render a product
 * objects to the view
 * @param {*} doc is a product object
 */
function renderProductList(doc) {
    var availableUnits = getPurchasesAvalilableUnits(doc.idProduct);
    var btnDelete = createCustomTextTag('button', 'btn btn-danger', 'X');
    btnDelete.setAttribute('style', 'margin-right:5px');
    var btnUpdate = createCustomTextTag('button', 'btn btn-warning', '!');
    btnUpdate.setAttribute('style', 'margin-right:5px');

    var divProdDetails =
        createCustomNonTextTag('div', 'container-fluid border border-primary rounded');
    divProdDetails.setAttribute("style", "margin: 10px; padding: 10px;");

    //purchase
    var divPurchase = createCustomNonTextTag("div", "form-check form-check-inline");
    var purchaseCheck = createCustomNonTextTag("input", "form-check-input");
    purchaseCheck.setAttribute("id", "check" + doc.idProduct);
    var purchaseLabel =
        createCustomTextTag('label', "form-check form-check-inline", "Purchase: " + doc.name);

    divPurchase.appendChild(purchaseCheck);
    divPurchase.appendChild(purchaseLabel);
    purchaseCheck.type = "checkbox";
    purchaseCheck.name = "purchase";
    //end purchase
    //sale
    var divSale = createCustomNonTextTag("div", "form-check form-check-inline");
    divSale.setAttribute("id", "divSale" + doc.idProduct);
    availableUnits == 0 ?
        divSale.style.display = "none" :
        console.log("Available units");
    var saleCheck = createCustomNonTextTag("input", "form-check-input");
    saleCheck.setAttribute("id", "saleCheck" + doc.idProduct);
    var saleLabel = createCustomTextTag('label', "form-check form-check-inline", "Sale: " +
        doc.name);

    divSale.appendChild(saleCheck);
    divSale.appendChild(saleLabel);
    saleCheck.type = "checkbox";
    saleCheck.name = "sale";
    //end sale

    var pName = createCustomTextTag('h3', 'h3', prodModaldetailsName + doc.name + " ");
    var pShowImage = createCustomTextTag('small', 'text-primary', showProductImage);
    pShowImage.setAttribute("style", "text-decoration: underline;")
    pName.appendChild(pShowImage);
    var pidProduct = createCustomTextTag('p', 'lead', placeHolderProductId + doc.idProduct);
    var pPrice = createCustomTextTag('p', 'lead', placeHolderProductPrice + ": " + doc.price);
    var pShowPrice = createCustomTextTag('p', 'lead', doc.showPrice == true ?
        showProductPriceMessageYes :
        showProductPriceMessageNo);
    var pInventory = createCustomTextTag('p', 'lead', placeHolderProductInventory +
        availableUnits);
    pInventory.setAttribute("id", "inventory" + doc.idProduct);
    var pState = createCustomTextTag('p', 'lead', placeHolderProductState + doc.activ);
    var d = new Date(doc.creationDate);
    var pCreation = createCustomTextTag('p', 'lead', creationdateMessage + ": " +
        doc.creationDate.year +
        '-' + doc.creationDate.date +
        '-' + doc.creationDate.month);
    d = new Date(doc.modificationDate);
    var pModification = createCustomTextTag('p', 'lead', lastModificationMessage + ": " +
        doc.modificationDate.year +
        '-' + doc.modificationDate.date + '-' +
        doc.modificationDate.month);

    appendChildListTag(
        [pName,
            divPurchase,
            divSale,
            pidProduct,
            pidProduct,
            pPrice,
            pShowPrice,
            pInventory,
            pState,
            pCreation,
            pModification,
            btnDelete,
            btnUpdate
        ],
        divProdDetails
    );

    var prodli = document.createElement('div');
    prodli.setAttribute('class', 'col-sm');
    prodli.setAttribute('id', doc.idProduct);
    prodli.appendChild(divProdDetails);


    document.getElementById(doc.category).appendChild(prodli);
    // deleting data
    btnDelete.addEventListener('click', async (e) => {
        e.stopPropagation();
        await callDeleteServer(doc);
        showPleaseWait();
        setTimeout(() => {
            hidePleaseWait();
        }, 3000);
    });
    // updating data
    btnUpdate.addEventListener('click', (e) => {
        e.stopPropagation();
        clearForm();
        btnResetForm.setAttribute('style', 'visibility: visible;')
        productFormMessage.innerHTML = updatingFormMessage;
        isUpdating = true;
        loadProductForm(doc);
    });
    //show product image
    pShowImage.addEventListener('click', async (e) => {
        e.stopPropagation();
        document.getElementById("productDetailsModLabelLabel").innerHTML = doc.name;
        $('#modalImageFirebase')
            .attr('src', url + doc.idProduct + urlPlus);
        $('#productDetailsModLabel').modal('show');
    });
    purchaseCheck.addEventListener("change", () => {
        handleProductsToPurchaseList(doc);
    });
    saleCheck.addEventListener("change", () => {
        handleProductsToSaleList(doc);
    });
}

/**
 * this funtion shows the check sale div
 * @param {*} idProduct id product to show
 */
function showSaleDiv(idProduct) {
    document.getElementById("divSale" + idProduct).style.display = "block";
};
/**
 * loads an objects by taken the 
 * values from the product form
 * @returns a product object
 */
function createFormDataProduct() {
    formdata = new FormData();
    var cd = new Date(productForm.creationDate.value);
    var md = new Date(productForm.modificationDate.value);
    var priceFlag;
    productForm.showPrice.value == "true" ?
        priceFlag = true :
        priceFlag = false;
    formdata.append('isUpdating', isUpdating);
    formdata.append('idProduct', productForm.idProduct.value);
    formdata.append('imageToFirebase', imageToFirebase);
    formdata.append('name', productForm.name.value);
    formdata.append('price', productForm.price.value);
    formdata.append('inventory', 0);
    formdata.append('category', productForm.categorySelect.value);
    formdata.append('creationDate', cd);
    formdata.append('modificationDate', md);
    formdata.append('activ', productForm.activ.value);
    formdata.append('description', productForm.description.value);
    formdata.append('showPrice', priceFlag);
    formdata.append('inputfile', productForm.inputGroupFile01.files[0]);
    isUpdating ? formdata.append('case', "update") :
        formdata.append('case', "add");
    return formdata;
}
/**
 * load a product objects values to 
 * the form to updated the same product
 * @param {*} doc a product object 
 */
function loadProductForm(doc) {
    productForm.idProduct.value = doc.idProduct;
    productForm.name.value = doc.name;
    productForm.price.value = doc.price;
    productForm.categorySelect.value = doc.category;
    productForm.creationDate.value = doc.creationDate.year + "-" + doc.creationDate.month + "-" + doc.creationDate.date;
    productForm.modificationDate.valueAsDate = new Date();
    productForm.activ.value = doc.activ;
    productForm.description.value = doc.description;
    productForm.showPrice.value = doc.showPrice;
    $('#imageFirebase')
        .attr('src', url + doc.idProduct + urlPlus);
}

/**
 * this function cleans the product
 * form fields
 */
function clearForm() {
    productForm.reset();
    productForm.inputGroupFile01.innerHTML = chooseFileMessage;
    productForm.imageFirebase.setAttribute('src', '#');
    this.isUpdating = false;
    productFormMessage.innerHTML = '';
    btnResetForm.setAttribute('style', 'visibility: hidden;');
    productForm.creationDate.valueAsDate = new Date();
    productForm.modificationDate.valueAsDate = new Date();
    indexCategorySelected = categoryList[0].idCategory;
    hideAndShowDivFuction();
}
/**
 * this function sets the product inventory
 * inventory
 */
function setProductInventoryView() {
    productList.forEach(element => {
        var id = element.idProduct;
        var stock = getPurchasesAvalilableUnits(id);
        document.getElementById("inventory" + id).innerHTML =
            placeHolderProductInventory + stock;
    });
}
//#endregion view

//#region dynamic

window.onload = async function () {
    currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    productForm.creationDate.valueAsDate = new Date();
    productForm.modificationDate.valueAsDate = new Date();
    verifyUserCredentials();
    getInformation();
    renderView();
}

/**
 * this function handles the adding and 
 * removing product to sale
 * @param {*} doc a product object
 */
function handleProductsToSaleList(doc) {
    var idProductToSale = productsToSale
        .find(element => element.idProduct == doc.idProduct);
    console.log(idProductToSale);
    if (idProductToSale == undefined) {
        if (getPurchasesAvalilableUnits(doc.idProduct) > 0) {
            productsToSale.push(doc);
        } else {
            alert("Not available");
            document.getElementById("saleCheck" + doc.idProduct)
                .checked = false;
        }

    } else {
        var exist = false;
        var i = 0;
        while (!exist && i < productsToSale.length) {
            console.log(i);
            exist = productsToSale[i].idProduct ==
                doc.idProduct;
            if (exist) {
                productsToSale.splice(i, 1);
                document.getElementById("check" + doc.idProduct)
                    .checked = false;
            }
            i++;
        }

    }
}
/**
 * this function handles the adding and 
 * removing product to purchase
 * @param {*} doc a product object
 */
function handleProductsToPurchaseList(doc) {
    var idProductToPurchase = productsTopurchase
        .find(element => element.idProduct == doc.idProduct);
    console.log(idProductToPurchase);
    if (idProductToPurchase == undefined) {
        productsTopurchase.push(doc);
    } else {
        var i = 0;
        while (productsTopurchase[i] != idProductToPurchase) {
            console.log(i);
            i++;
        }
        productsTopurchase.splice(i, 1);
    }
}

/**
 * this fuction gets the info nedded from the 
 * session storage or from the database, to
 * show the user view
 */
async function getInformation() {
    if (sessionStorage.getItem('allReceipts') == null) {
        console.log("getting purchases");
        getAllPurchasesReceipts();
    } else {
        receiptList = JSON.parse(sessionStorage.getItem('allReceipts'));
    }
    categoryList = JSON.parse(sessionStorage.getItem('categories'));

    if (categoryList != null) {
        indexCategorySelected = categoryList[0].idCategory;
    }
}
/**
 * use it to know the current inventory of the certain pruduct
 * @param {*} idProduct the product id in serch
 * @returns the current inventory number in stock 
 */
function getPurchasesAvalilableUnits(idProduct) {
    var result = 0;
    receiptList.forEach(element => {
        element.purchases.forEach(p => {
            if (p.idProduct == idProduct) {
                result += p.tottalUnits - p.notAvailableUnits;
            }
        });
    });
    return result;
}
/**
 * this function sets the final steps after 
 * delete a product object. 
 * Call this fuction after delete a product
 * @param {*} productDeleted a product object
 */
function afterDeletingSettings(productDeleted) {
    var i = 0;
    while (productList[i].idProduct != productDeleted.idProduct) {
        i++;
    }
    productList.splice(i, 1);
    sessionStorage.setItem('allProducts', JSON.stringify(productList));
    var prodli = document.getElementById(productDeleted.idProduct);
    document.getElementById(productDeleted.category).removeChild(prodli);
    alert("Product deleted");
}
/**
 * this function sets the final steps after 
 * add or update a product object 
 * call this fuction after add or update a product
 * @param {*} productResult a product object 
 */
function afterServerCallsettings(productResult) {
    console.log('Success:', productResult);
    productResult.creationDate = getCustomDateNew(new Date(productForm.creationDate.value));
    productResult.modificationDate = getCustomDateNew(new Date(productForm.modificationDate.value));
    if (isUpdating) {
        var p = productList.find(element =>
            element.idProduct == productResult.idProduct);
        var indexCategory = categoryList.find(element =>
            element.idCategory == p.category).idCategory;
        var del = document.getElementById(productResult.idProduct);
        document.getElementById(indexCategory).removeChild(del);
        var i = 0;
        while (productList[i].idProduct != productResult.idProduct) {
            i++;
        }
        productList.splice(i, 1);
        productList.push(productResult);
    } else {
        productList.push(productResult);
    }
    sessionStorage.setItem('allProducts', JSON.stringify(productList));
    renderProductList(productResult);
    clearForm();
}

//#endregion dynamic