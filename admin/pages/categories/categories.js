//#region variables

const categoryTableList = document.querySelector('#categories-table-list');
const categoryFormMessage = document.querySelector('#categoryFormMessage');
const btnResetForm = document.querySelector('#btnResetForm');
const categoriesform = document.querySelector('#add-category-form');
var categoryList;
var productsList;
var isUpdating = false;
var imageToFirebase = false;
var currentUser = null;

//#endregion variables

//#region view

window.onload = async function () {
    currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    if (verifyUserCredentials()) {
        loadingPageSettings();
        await getInformation();
        loadCategories();
    } else document.location.replace("/pages/login");

}
categoriesform.inputGroupFile01.addEventListener('change', (e) => {
    imageToFirebase = !imageToFirebase;
});

/**
 * this function loops through the category list
 * and prepare the view category id divs
 */
async function loadCategories() {
    categoryList.forEach(item => {
        var li = createCustomTextTag('option', 'divider', item.name);
        li.setAttribute('role', 'presentation');
    });
    categoryList.forEach(item => {
        renderCategories(item);
    });
}
//adding or updating category
categoriesform.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (categoriesform.idCategory.value == "") {
        addCategoryServerCall();
        showPleaseWait();
        setTimeout(() => {
            hidePleaseWait();
        }, 3000);
    } else {
        if (isUpdating) {
            updateCategoryServerCall();
            showPleaseWait();
            setTimeout(() => {
                hidePleaseWait();
            }, 3000);
        } else
            alert(addImageMessage);
    }

});

/**
 * this function loads the category object
 * and it´s functions on the view
 * @param {*} doc this is a category object
 */

function renderCategories(doc) {

    let tdActions = createCustomNonTextTag('div', 'container');
    let actionsMessage = createCustomTextTag('h5', 'text-success', thActionsCategoryTable);
    var btnDelete = createCustomTextTag('button', 'btn btn-danger', 'X');
    btnDelete.setAttribute('style', 'margin-right:5px');
    var btnUpdate = createCustomTextTag('button', 'btn btn-warning', '!');

    appendChildListTag([actionsMessage, btnDelete, btnUpdate], tdActions);


    var divBtnHide = createCustomNonTextTag('div', 'card');
    divBtnHide.setAttribute("id", "action" + doc.idCategory);
    divBtnHide.setAttribute("style", "margin: 10px;");
    var btnHide = document.createElement("button");
    divBtnHide.appendChild(btnHide);
    btnHide.setAttribute("class", "btn btn-info btn-lg");
    btnHide.innerHTML = doc.name;
    let idCategory = createCustomTextTag('p', 'text-success', thIdCategoryTable + ": " + doc.idCategory);
    let state = createCustomTextTag('p', 'text-success', thStateCategoryTable + ": " + doc.status);
    var mainContainer = document.createElement("div");
    mainContainer.setAttribute("class", "row border border-primary rounded");
    mainContainer.setAttribute("style", "margin:20px; padding:10px; display:none;");
    appendChildListTag([idCategory, state, tdActions], mainContainer);
    btnHide.addEventListener('click', (e) => {
        e.stopPropagation();
        if (mainContainer.style.display === "none") {
            mainContainer.style.display = "block";
        } else {
            mainContainer.style.display = "none";
        }
    });
    mainContainer.setAttribute("id", doc.idCategory);
    document.getElementById("categoryContainer").appendChild(divBtnHide);
    document.getElementById("categoryContainer").appendChild(mainContainer);

    // deleting data
    btnDelete.addEventListener('click', async (e) => {
        e.stopPropagation();
        var i = 0;
        var flag = false;
        while (!flag && i < productsList.length) {
            console.log(i);
            if (productsList[i].category == doc.idCategory) {
                flag = true;
            }
            i++;
        }
        if (!flag) {
            await callDeleteServer(doc);
            showPleaseWait();
            setTimeout(() => {
                hidePleaseWait();
            }, 3000);
        } else {
            alert(noDeleteCategoryWithRegMessage);
        }
    });
    // updating data
    btnUpdate.addEventListener('click', (e) => {
        isUpdating = true;
        console.log(updatingFormMessage);
        btnResetForm.setAttribute('style', 'visibility: visible;')
        categoryFormMessage.innerHTML = updatingFormMessage;
        categoriesform.name.value = doc.name;
        categoriesform.idCategory.value = doc.idCategory;
        categoriesform.activ.value = doc.status;
        categoriesform.description.value = doc.description;
        categoriesform.imageFirebase.setAttribute('src', url + doc.idCategory + urlPlus);
        document.getElementById("inputImage").innerHTML = chooseFileMessage;
        hideAndShowDivFuction();
    });
}
/**
 * this function sets the first fields in the 
 * view
 */
function loadingPageSettings() {
    var unActiveOption = document.createElement("option");
    unActiveOption.setAttribute("value", "0");
    unActiveOption.innerHTML = categoryInActiveOption;
    var activeOption = document.createElement("option");
    activeOption.setAttribute("value", "1");
    activeOption.innerHTML = categoryActiveOption;
    categoriesform.activ.appendChild(unActiveOption);
    categoriesform.activ.appendChild(activeOption);
}
/**
 * this function clean the form
 * fields after an action
 */
function clearForm() {
    categoriesform.reset();
    document.getElementById("inputImage").innerHTML = chooseFileMessage;
    categoriesform.imageFirebase.setAttribute('src', '#');
    this.isUpdating = false;
    this.imageToFirebase = false;
    categoryFormMessage.innerHTML = '';
    hideAndShowDivFuction();
    btnResetForm.setAttribute('style', 'visibility: hidden;');
}
//#endregion view

//#region dynamic

/**
 * this function prepare the info needded for the
 * view
 */
async function getInformation() {
    console.log('getting the categories from sessionStorage');
    await getClientInfo();
    categoryList = JSON.parse(sessionStorage.getItem('categories'));
    productsList = JSON.parse(sessionStorage.getItem('allProducts'));
}

/**
 * this function loads an formdata object
 * to be send to the server
 * @returns a formdata object
 */
function createFormDataAddCategory() {
    formdata = new FormData();
    formdata.append('isUpdating', isUpdating);
    formdata.append('imageToFirebase', imageToFirebase);
    formdata.append('idCategory', categoriesform.idCategory.value);
    formdata.append('name', categoriesform.name.value);
    formdata.append('description', categoriesform.description.value);
    formdata.append('status', categoriesform.activ.value);
    formdata.append('case', "add");
    formdata.append('inputFile', categoriesform.inputGroupFile01.files[0]);
    return formdata;
}

/**
 * this function loads an formdata object
 * to be send to the server
 * @returns a formdata object
 */
function createFormDataUpdateCategory() {
    formdata = new FormData();
    formdata.append('isUpdating', isUpdating);
    formdata.append('imageToFirebase', imageToFirebase);
    formdata.append('idCategory', categoriesform.idCategory.value);
    formdata.append('name', categoriesform.name.value);
    formdata.append('description', categoriesform.description.value);
    formdata.append('status', categoriesform.activ.value);
    formdata.append('case', "update");
    formdata.append('inputFile', categoriesform.inputGroupFile01.files[0]);
    return formdata;
}
/**
 * this function is call after a deleting 
 * call to the server
 * @param {*} categoryDeleted a category object
 */
function afterDeletingSettings(categoryDeleted) {
    var i = 0;
    while (categoryList[i].idCategory != categoryDeleted.idCategory) {
        i++;
    }
    categoryList.splice(i, 1);
    sessionStorage.setItem('categories', JSON.stringify(categoryList));
    document.getElementById(categoryDeleted.idCategory).remove();
    document.getElementById("action" + categoryDeleted.idCategory).remove();
    alert("Product deleted");
}
/**
 * this function is call after an add 
 * call to the server
 * @param {*} categoryDeleted a category object
 */
function afterServerCallsettings(categoryResult) {
    console.log('Success:', categoryResult);
    if (isUpdating) {
        document.getElementById(categoryResult.idCategory).remove();
        document.getElementById("action" + categoryResult.idCategory).remove();
        var i = 0;
        while (categoryList[i].idCategory != categoryResult.idCategory) {
            i++;
        }
        categoryList.splice(i, 1);
        categoryList.push(createCategoryFromCallServerResult(categoryResult));
    } else {
        categoryList.push(createCategoryFromCallServerResult(categoryResult));
    }
    sessionStorage.setItem('categories', JSON.stringify(categoryList));
    renderCategories(categoryResult);
    clearForm();
}
/**
 * this function create a category object 
 * usin the category server result after a server call
 * @param {*} categoryResult a server object result 
 * @returns a category object
 */
function createCategoryFromCallServerResult(categoryResult) {
    var result = {
        idCategory: categoryResult.idCategory,
        name: categoryResult.name,
        status: categoryResult.status,
        description: categoryResult.description
    };
    return result;
}

//#endregion dynamic