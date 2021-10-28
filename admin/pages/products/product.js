//#region variables

const productcategoryList = document.querySelector('#category-product-list');
const productForm = document.querySelector('#add-product-form');
const productFormMessage = document.querySelector('#productFormMessage');
const btnResetForm = document.querySelector('#btnResetForm');
var categoryList;
var productList;
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

/**
 * this function renders the user view with the
 * products and categories available 
 */
function renderView() {
    categoryList.forEach(item => {
        var li = createCustomTextTag('option', 'divider', item.name);
        li.setAttribute('role', 'presentation');
        li.setAttribute('value', item.idCategory);
        productForm.categorySelect.appendChild(li);
        renderCategoryList(item);
    });
    productList.forEach(prod => {
        var divProd = renderProduct(prod);
        document.getElementById(prod.category).appendChild(divProd);
        adminProductButtons(prod);
    });
}
productForm.price
    .addEventListener("keypress", (ev) => noLetters(ev));

//this function handles the add and update products
productForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (isUpdating) {
        showPleaseWait()
        var result = await callAsyncUpdateServer(createFormDataProduct());
        result.success ?
            afterServerCallsettings(result.product) :
            alert(addImageMessage);
        hidePleaseWait();
    } else {
        showPleaseWait();
        var result = await callAsyncAddServer(createFormDataProduct());
        result.success ?
            afterServerCallsettings(result.product) :
            alert(addImageMessage);
        hidePleaseWait();
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
    var btnHide = document.createElement("container");
    divBtnHide.appendChild(btnHide);
    btnHide.setAttribute("class", "btn btn-info btn-lg");
    btnHide.innerHTML = item.name;
    var divHide = createCustomNonTextTag('div', 'card');
    divHide.setAttribute("style", "margin: 10px;");
    var mainContainer = document.createElement("div");
    mainContainer.setAttribute("class", "row");
    divHide.setAttribute("style", "margin:10px; padding:5px; display:none;");
    divBtnHide.addEventListener('click', (e) => {
        e.stopPropagation();
        if (divHide.style.display === "none") {
            divHide.style.display = "block";
        } else {
            divHide.style.display = "none";
        }
    });
    mainContainer.setAttribute("id", item.idCategory);
    divHide.appendChild(mainContainer);
    productcategoryList.appendChild(divBtnHide);
    productcategoryList.appendChild(divHide);

};

/**
 * use this function to render a product
 * objects to the view
 * @param {*} doc is a product object
 */

function adminProductButtons(doc) {
    var availableUnits = getPurchasesAvalilableUnits(doc.idProduct);
    var inventoryDiv = createCustomTextTag("div");
    inventoryDiv.innerHTML = "inventory: " + availableUnits;
    inventoryDiv.setAttribute("id", "inventory" + doc.idProduct);
    var productDiv = document.getElementById("product" + doc.idProduct);
    var btnDelete = createCustomTextTag('button', 'btn btn-danger', 'X');
    btnDelete.setAttribute('style', 'margin-right:5px');
    var btnUpdate = createCustomTextTag('button', 'btn btn-warning', '!');
    btnUpdate.setAttribute('style', 'margin-right:5px');
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
    availableUnits == 0 ?
        divSale.style.display = "none" :
        console.log("Available units");
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


    divSale.appendChild(saleCheck);
    divSale.appendChild(saleLabel);
    saleCheck.type = "checkbox";
    saleCheck.name = "sale";
    //end sale
    appendChildListTag(
        [
            inventoryDiv,
            divSale,
            divPurchase,
            btnDelete,
            btnUpdate
        ],
        productDiv
    );
    btnDelete.addEventListener('click', async (e) => {
        await handleDeleteProduct(e, doc);
    });
    // updating data
    btnUpdate.addEventListener('click', async (e) => {
        await handleUpdateProduct(e, doc);
    });

    purchaseCheck.addEventListener("change", () => {
        handleProductsToPurchaseList(doc);
    });
    saleCheck.addEventListener("change", () => {
        handleProductsToSaleList(doc);
    });
}

/**
 * this function deletes a product object
 * @param {*} e button function object
 * @param {*} doc product object
 */
async function handleDeleteProduct(e, doc) {
    e.stopPropagation();
    showPleaseWait();
    var result = await callAsyncDeleteServer(doc);
    result.success ? afterDeletingSettings(doc) :
        alert("Product not deleted: " + result.success);
    hidePleaseWait();
}
/**
 * this function updates a product object
 * @param {*} e button function object
 * @param {*} doc product object
 */
async function handleUpdateProduct(e, doc) {
    e.stopPropagation();
    clearForm();
    btnResetForm.setAttribute('style', 'visibility: visible;')
    productFormMessage.innerHTML = updatingFormMessage;
    isUpdating = true;
    loadProductForm(doc);
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
    productForm.creationDate.value = doc.creationDate.year +
        "-" + doc.creationDate.month +
        "-" + doc.creationDate.date;
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
    showPleaseWait();
    productForm.creationDate.valueAsDate = new Date();
    productForm.modificationDate.valueAsDate = new Date();
    await getInformation();
    renderView();
    //setProductInventoryView();
    hidePleaseWait();
}

/**
 * this function handles the adding and 
 * removing product to sale from the list
 * @param {*} doc a product object
 */
function handleProductsToSaleList(doc) {
    var idProductToSale = productsToSale
        .find(element => element.idProduct == doc.idProduct);
    console.log(idProductToSale);
    if (idProductToSale == undefined) {
        addProductToSaleList(doc);

    } else {
        spliceProductToSaleList(doc);

    }
}
/**
 * this function handles the adding
 * to the sale list
 * @param {*} doc a product object
 */
function addProductToSaleList(doc) {
    if (getPurchasesAvalilableUnits(doc.idProduct) > 0) {
        productsToSale.push(doc);
    } else {
        alert("Not available");
        document.getElementById("saleCheck" + doc.idProduct)
            .checked = false;
    }
}
/**
 * this function handles the 
 * removing product to sale from the list
 * @param {*} doc a product object
 */
function spliceProductToSaleList(doc) {
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

    await getClientInfo();
    productList = JSON.parse(sessionStorage.getItem('allProducts'));
    categoryList = JSON.parse(sessionStorage.getItem('categories'));

    if (sessionStorage.getItem('allReceipts') == null) {
        console.log("getting purchases");
        await getAllPurchasesReceipts();
        await getAllReceipType();
    } else {
        receiptList = JSON.parse(sessionStorage.getItem('allReceipts'));
        receipTypetList = JSON.parse(sessionStorage.getItem('allReceiptType'));
    }
    if (categoryList != null) {
        indexCategorySelected = categoryList[0].idCategory;
    }
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
    const prodli = document.getElementById("card" + productDeleted.idProduct);
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
        var del = document.getElementById("card" + productResult.idProduct);
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
    var prodDiv = renderProduct(productResult);
    document.getElementById(productResult.category)
        .appendChild(prodDiv);
    adminProductButtons(productResult);
    clearForm();
}

//#endregion dynamic