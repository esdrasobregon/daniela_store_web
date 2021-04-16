
const productcategoryList = document.querySelector('#category-product-list');
const productForm = document.querySelector('#add-product-form');
const productFormMessage = document.querySelector('#productFormMessage');
const btnResetForm = document.querySelector('#btnResetForm');
var categoryList;
var productList;
var productToUpdate = null;
var indexCategorySelected;
var imageToFirebase = false;
var isUpdating = false;
var currentUser = null;

window.onload = async function () {
    currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    if (currentUser != null) {
        if (!currentUser.userState) {
            document.location.replace("/pages/login");
        } else {
            productForm.creationDate.valueAsDate = new Date();
            productForm.modificationDate.valueAsDate = new Date();
            if (!currentUser.userState) {
                document.location.replace("/pages/login");
            }
            if (sessionStorage.getItem('allProducts') == null) {
                document.location.replace(localHost + "/pages/login");
            } else {
                console.log('getting the local sessionStorage');
                getInformation();
            }
        }
    } else {
        document.location.replace("/pages/login");
    }

}
productForm.inputGroupFile01.addEventListener('change', (e) => {
    imageToFirebase = !imageToFirebase;
});
//get information from the session storage
//and render the categories options
async function getInformation() {
    categoryList = JSON.parse(sessionStorage.getItem('categories'));
    categoryList.forEach(item => {
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
    productList.forEach(item => {
        renderProductList(item);
    });
}
function chageIndexSelected(sel) {
    indexCategorySelected = categoryList[sel.selectedIndex].idCategory;
}
productForm.price.addEventListener("keypress", (ev) => noLetters(ev));

//add or update products
productForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (isUpdating) {
        console.log('updating');
        setProductToUpdate();
        showPleaseWait();
        await updateProduct(productToUpdate).then(async () => {
            if (imageToFirebase) {
                console.log('se agrega imagen');
                await uploadImage(product.idProduct);
            }

            console.log("rendering");
            productList.push(productToUpdate);
            renderProductList(productToUpdate);
            sessionStorage.setItem('allProducts', JSON.stringify(productList));
            productToUpdate = null;
            clearForm();
            hidePleaseWait();
        });

    } else {
        var product = createProduct();
        if (imageToFirebase) {
            showPleaseWait();
            await addProduct(product);
            await uploadImage(product.idProduct);
            productList.push(product);
            sessionStorage.setItem('allProducts', JSON.stringify(productList));
            renderProductList(product);
            clearForm();
            hidePleaseWait();
        } else {
            alert(addImageMessage);
        }
    }
});

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
    divProdDetails.setAttribute("style", "margin: 10px; padding: 10px;")
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
    appendChildListTag([pName, pidProduct, pidProduct, pPrice, pShowPrice, pInventory, pState, pCreation, pModification, btnDelete, btnUpdate, btnPurchse], divProdDetails);

    var prodli = document.createElement('div');
    prodli.setAttribute('class', 'col-sm');
    prodli.setAttribute('id', doc.idProduct);
    prodli.appendChild(divProdDetails);


    document.getElementById(doc.category).appendChild(prodli);
    // deleting data
    btnDelete.addEventListener('click', async (e) => {
        e.stopPropagation();
        let id = doc.idProduct;
        showPleaseWait();
        await deleteProduct(id);
        var i = 0;
        while (productList[i] != doc) {
            i++;
        }
        productList.splice(i, 1);
        sessionStorage.setItem('allProducts', JSON.stringify(productList));
        hidePleaseWait();
        document.getElementById(doc.category).removeChild(prodli);

    });
    // updating data
    btnUpdate.addEventListener('click', (e) => {
        e.stopPropagation();
        hideAndShowDivFuction();
        clearForm();
        btnResetForm.setAttribute('style', 'visibility: visible;')
        productFormMessage.innerHTML = updatingFormMessage;
        productToUpdate = doc;
        var i = 0;
        while (productList[i] != doc) {
            i++;
        }
        productList.splice(i, 1);
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
    var md = new Date(productForm.modificationDate.value);
    var priceFlag;
    productForm.showPrice.value == "true" ? priceFlag = true : priceFlag = false;
    productToUpdate.name = productForm.name.value;
    productToUpdate.price = productForm.price.value;
    productToUpdate.category = indexCategorySelected;
    productToUpdate.modificationDate = md;
    productToUpdate.activ = productForm.activ.value;
    productToUpdate.description = productForm.description.value;
    productToUpdate.showPrice = priceFlag;
}
function loadProductForm(doc) {
    productForm.name.value = doc.name;
    productForm.price.value = doc.price;
    productForm.stateSelect.value = doc.category;
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
    productToUpdate == null ? console.log("reseting the form") : productList.push(productToUpdate);
    productToUpdate = null;
    this.isUpdating = false;
    this.imageToFirebase = false;
    productFormMessage.innerHTML = '';
    btnResetForm.setAttribute('style', 'visibility: hidden;');
    productForm.creationDate.valueAsDate = new Date();
    productForm.modificationDate.valueAsDate = new Date();
    hideAndShowDivFuction();
}
