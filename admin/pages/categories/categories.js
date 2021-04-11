const categoryTableList = document.querySelector('#categories-table-list');
const imageInput = document.querySelector('#inputGroupFile01');
const categoryFormMessage = document.querySelector('#categoryFormMessage');
const btnResetForm = document.querySelector('#btnResetForm');
const categoriesform = document.querySelector('#add-category-form');
const imageFi = document.querySelector('#imageFirebase');
var categoryList;
var categoryToUpdate = null;
var productsList;
var isUpdating = false;
var imageToFirebase = false;
var currentUser = null;

window.onload = async function () {
    currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    if (currentUser == null) {
        document.location.replace("/pages/login");
    } else {
        if (!currentUser.userState) {
            document.location.replace("/pages/login");
        }
        loadingPageSettings();
        getInformation();
        loadCategories();
    }
}
async function getInformation() {
    console.log('getting the categories from sessionStorage');
    categoryList = JSON.parse(sessionStorage.getItem('categories'));
    productsList = JSON.parse(sessionStorage.getItem('allProducts'));

}
async function loadCategories() {
    categoryList.forEach(item => {
        var li = createCustomTextTag('option', 'divider', item.name);
        li.setAttribute('role', 'presentation');
    });
    categoryList.forEach(item => {
        renderCategories(item);
    });
}

imageInput.addEventListener('change', (e) => {
    imageToFirebase = !imageToFirebase;
});
//adding or updating category
categoriesform.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (isUpdating) {
        console.log('updating');
        setcategoryToUpdate();
        showPleaseWait();
        await updateCategory(categoryToUpdate).then(async () => {
            if (imageToFirebase) {
                console.log('se agrega imagen');
                await uploadImage(categoryToUpdate.idCategory);
            }
            document.getElementById(categoryToUpdate.idCategory).remove();
            document.getElementById("action" + categoryToUpdate.idCategory).remove();
            renderCategories(categoryToUpdate);
            categoryList.push(categoryToUpdate);
            sessionStorage.setItem('categories', JSON.stringify(categoryList));
            categoryToUpdate = null;
            clearForm();
            hidePleaseWait();
        });
    } else {
        var category = {
            name: categoriesform.name.value,
            status: categoriesform.activ.value,
            description: categoriesform.description.value
        };
        if (imageToFirebase) {
            showPleaseWait();
            await addCategory(category);
            await uploadImage(category.idCategory);
            categoryList.push(category);
            renderCategories(category);
            sessionStorage.setItem('categories', JSON.stringify(categoryList));
            clearForm();
            hidePleaseWait();
        } else {
            alert(addImageMessage);
        }
    }

});

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
        var counter = 0;
        var i = 0;
        while (counter == 0 && i < productsList.length) {
            console.log(i);
            if (productsList[i].category == doc.idCategory) {
                counter++;
            }
            i++;
        }
        if (counter == 0) {
            let id = doc.idCategory;
            showPleaseWait();
            await deleteCategory(id).then(
                await deleteFile(id));
            var i = 0;
            while (categoryList[i] != doc) {
                i++;
            }
            categoryList.splice(i, 1);
            sessionStorage.setItem('categories', JSON.stringify(categoryList));
            document.getElementById("action" + doc.idCategory).remove();
            document.getElementById(doc.idCategory).remove();

            hidePleaseWait();
            //location.reload();
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
        categoriesform.activ.value = doc.status;
        categoriesform.description.value = doc.description;
        categoryToUpdate = doc;
        var i = 0;
        while (categoryList[i] != doc) {
            i++;
        }
        categoryList.splice(i, 1);
        $('#imageFirebase')
            .attr('src', url + doc.idCategory + urlPlus);
        imageInput.innerHTML = chooseFileMessage;
        hideAndShowDivFuction();
    });
}
function loadingPageSettings() {
    var unActiveOption = document.createElement("option");
    unActiveOption.setAttribute("value", "0");
    unActiveOption.innerHTML = categoryInActiveOption;
    var activeOption = document.createElement("option");
    activeOption.setAttribute("value", "1");
    activeOption.innerHTML = categoryActiveOption;
    categoriesform.activ.appendChild(unActiveOption);
    categoriesform.activ.appendChild(activeOption);

    document.getElementById("categoryStateLabelMessage").innerHTML = categoryStateLabelMessage;
    document.getElementById("submitCategoryForm").innerHTML = submitCategoryForm;
    document.getElementById("btnResetForm").innerHTML = btnResetFormText;
    document.getElementById("hideAndShowButtonMessage").innerHTML = hideAndShowButtonMessage;
    document.getElementById("addUpdateCategory").innerHTML = addUpdateCategory;
    document.getElementById("inputImage").innerHTML = chooseFileMessage;
    categoriesform.name.setAttribute("placeholder", placeHolderCategoryName);
    categoriesform.description.setAttribute("placeholder", placeHolderCategoryDescription);
}
function setcategoryToUpdate() {

    categoryToUpdate.name = categoriesform.name.value;
    categoryToUpdate.status = categoriesform.activ.value;
    categoryToUpdate.description = categoriesform.description.value;
}
function clearForm() {
    categoriesform.reset();
    imageInput.innerHTML = chooseFileMessage;
    imageFi.setAttribute('src', '#');
    this.isUpdating = false;
    this.imageToFirebase = false;
    categoryFormMessage.innerHTML = '';
    categoryToUpdate == null ? console.log("reseting the form") : categoryList.push(categoryToUpdate);
    categoryToUpdate = null;
    hideAndShowDivFuction();
    btnResetForm.setAttribute('style', 'visibility: hidden;');
}