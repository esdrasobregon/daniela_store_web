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
//if the current user is not set up
//it returns to the client side
window.onload = async function () {
    currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    productForm.creationDate.valueAsDate = new Date();
    productForm.modificationDate.valueAsDate = new Date();

    verifyUserCredentials();
    getInformation();
}

productForm.inputGroupFile01.addEventListener('change', (e) => {
    imageToFirebase = !imageToFirebase;
});
//get information from the session storage
//and render the categories options
async function getInformation() {
    if (sessionStorage.getItem('allReceipts') == null) {
        console.log("getting purchases");
        getAllPurchases();
    } else {
        receiptList = JSON.parse(sessionStorage.getItem('allReceipts'));
    }
    categoryList = JSON.parse(sessionStorage.getItem('categories'));
    categoryList.forEach(item => {
        var li = createCustomTextTag('option', 'divider', item.name);
        li.setAttribute('role', 'presentation');
        li.setAttribute('value', item.idCategory);
        productForm.categorySelect.appendChild(li);
        renderCategoryList(item);
    });
    if (categoryList != null) {
        indexCategorySelected = categoryList[0].idCategory;
    }
    productList = JSON.parse(sessionStorage.getItem('allProducts'));
    productList.forEach(item => {
        renderProductList(item);
    });
}

productForm.price
    .addEventListener("keypress", (ev) => noLetters(ev));

//adding and updating product registers
productForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (isUpdating) {
        await callUpdateServer();
        showPleaseWait();
        setTimeout(() => {
            hidePleaseWait();
        }, 3000);
    } else {
        await callServer();
        showPleaseWait();
        setTimeout(() => {
            hidePleaseWait();
        }, 3000);
    }


});

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

//create a list for every category
function renderProductList(doc) {
    var btnDelete = createCustomTextTag('button', 'btn btn-danger', 'X');
    btnDelete.setAttribute('style', 'margin-right:5px');
    var btnUpdate = createCustomTextTag('button', 'btn btn-warning', '!');
    btnUpdate.setAttribute('style', 'margin-right:5px');
    var btnPurchse = createCustomTextTag('button', 'btn btn-info', '!');


    var divProdDetails = createCustomNonTextTag('div', 'container-fluid border border-primary rounded');
    divProdDetails.setAttribute("style", "margin: 10px; padding: 10px;");
    var divPurchase = createCustomNonTextTag("div", "form-check form-check-inline");
    var purchaseCheck = createCustomNonTextTag("input", "form-check-input");
    purchaseCheck.setAttribute("id", "check" + doc.idProduct);
    var purchaseLabel = createCustomTextTag('label', "form-check form-check-inline", "Purchase: " + doc.name);

    divPurchase.appendChild(purchaseCheck);
    divPurchase.appendChild(purchaseLabel);
    purchaseCheck.type = "checkbox";
    purchaseCheck.name = "purchase";
    var pName = createCustomTextTag('h3', 'h3', prodModaldetailsName + doc.name + " ");
    var pShowImage = createCustomTextTag('small', 'text-primary', showProductImage);
    pShowImage.setAttribute("style", "text-decoration: underline;")
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
    appendChildListTag([pName, divPurchase, pidProduct, pidProduct, pPrice, pShowPrice, pInventory, pState, pCreation, pModification, btnDelete, btnUpdate, btnPurchse], divProdDetails);

    var prodli = document.createElement('div');
    prodli.setAttribute('class', 'col-sm');
    prodli.setAttribute('id', doc.idProduct);
    prodli.appendChild(divPurchase);
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
    btnPurchse.addEventListener('click', (e) => {
        e.stopPropagation();
        window.location.href = '/admin/pages/purchases/purchase?id=' + doc.idProduct;
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
        var productToPurchase = productsTopurchase
            .find(element => element.idProduct == doc.idProduct);
        console.log(productToPurchase);
        if (productToPurchase == undefined) {
            productsTopurchase.push(doc);
            productsToSales.push(doc);
            //addPurchaseToTheForm(doc);
        } else {
            var i = 0;
            while ((productsTopurchase[i].idProduct !=
                    productToPurchase.idProduct) || productsTopurchase.length < i) {
                i++;
            }
            productsTopurchase.splice(i, 1);
            productsToSales.splice(i, 1);
            //deletePurchaseToTheForm(doc);
        }

    });
}

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
    formdata.append('inputGroupFile01', productForm.inputGroupFile01.files[0]);
    return formdata;
}

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