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

//adding and updating product registers
productForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (productForm.idProduct.value == "") {
        showPleaseWait();
        callServer();
        hidePleaseWait();
    } else {
        if (isUpdating) {
            showPleaseWait();
            callServer();
            hidePleaseWait();
        } else
            alert(addImageMessage);
    }

});

//call the server
function callServer() {
    const formData = createFormDataProduct();
    const options = {
        method: 'POST',
        body: formData
    }
    fetch(localHost + "/addProduct", {
            method: 'POST',
            body: formData
        }).then(response => response.json())
        .then(result => {
            result.idProduct == "" ?
                alert(addImageMessage) :
                afterServerCallsettings(result);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}
//call the server
function callDeleteServer(idProductToDelete) {

    var data = {
        idProduct: idProductToDelete
    }
    const options = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    fetch(localHost + "/deleteProduct", options).then(
        result => result.json()
    ).then((result) => {
        alert("Product id: " + result + " deleted");
    });
    hidePleaseWait();

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
        productList.push(createProductFromCallServerResult(productResult));
    } else {
        productList.push(createProductFromCallServerResult(productResult));
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
        await callDeleteServer(id);
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
        clearForm();
        btnResetForm.setAttribute('style', 'visibility: visible;')
        productFormMessage.innerHTML = updatingFormMessage;
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

function createProductFromCallServerResult(productResult) {
    var p = {
        idProduct: productResult.idProduct,
        name: productResult.name,
        activ: productResult.activ,
        description: productResult.description,
        category: productResult.category,
        showPrice: productResult.showPrice,
        inventory: productResult.inventory,
        price: productResult.price,
        modificationDate: productResult.modificationDate,
        creationDate: productResult.creationDate
    };
    return p;
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
    productForm.showPrice.value == "true" ?
        priceFlag = true :
        priceFlag = false;

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
    productForm.idProduct.value = doc.idProduct;
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
    productFormMessage.innerHTML = '';
    btnResetForm.setAttribute('style', 'visibility: hidden;');
    productForm.creationDate.valueAsDate = new Date();
    productForm.modificationDate.valueAsDate = new Date();
    indexCategorySelected = categoryList[0].idCategory;
    hideAndShowDivFuction();
}