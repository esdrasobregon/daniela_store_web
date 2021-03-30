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

window.onload = async function () {
    if (sessionStorage.getItem('currentUser') == null) {
        document.location.replace(localHost + "/pages/login.html");
    } else {
        if (sessionStorage.getItem('categories') == null) {
            document.location.replace(localHost + "/pages/login.html");
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

// create element & render cafe
function renderCategories(doc) {
    let tr = document.createElement('tr');
    tr.setAttribute('id', doc.idCategory);
    tr.setAttribute('class', 'table-success');
    let blank = document.createElement('td');
    blank.setAttribute('class', 'table-success');
    let idCategory = createCustomTextTag('td', 'table-success', doc.idCategory);
    let name = createCustomTextTag('td', 'table-success', doc.name);
    let price = createCustomTextTag('td', 'table-success', doc.price);
    let state = createCustomTextTag('td', 'table-success', doc.status);

    let tdActions = createCustomNonTextTag('td', 'row');
    var btnDelete = createCustomTextTag('button', 'btn btn-danger', 'X');
    btnDelete.setAttribute('style', 'margin-right:5px');
    var btnUpdate = createCustomTextTag('button', 'btn btn-warning', '!');
    appendChildListTag([btnDelete, btnUpdate], tdActions);

    tr.setAttribute('data-id', doc.idProduct);

    appendChildListTag([blank, idCategory, name, state], tr);

    tr.appendChild(tdActions);

    categoryTableList.appendChild(tr);

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
    document.getElementById("thIdCategoryTable").innerHTML = thIdCategoryTable;
    document.getElementById("thNameCategoryTable").innerHTML = thNameCategoryTable;
    document.getElementById("thStateCategoryTable").innerHTML = thStateCategoryTable;
    document.getElementById("thActionsCategoryTable").innerHTML = thActionsCategoryTable;

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