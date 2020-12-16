const productTableList = document.querySelector('#product-table-list');
const form = document.querySelector('#add-product-form');
var categories;
var productList;
var indexCategorySelected;
var creationDate = document.getElementById('creationDate');
creationDate.valueAsDate = new Date();
var modificationDate = document.getElementById('modificationDate');
modificationDate.valueAsDate = new Date();
var selectcategories = document.getElementById("categories");
var stateSelect = document.getElementById("stateSelect");
var inventory = document.getElementById("inventory");
var price = document.getElementById("price");
var description = document.getElementById("description");


window.onload = async function(){
    categories = await getAllCategories();
    
    categories.forEach(item =>{
        var li = createCustomTextTag('option', 'divider', item.description);
        li.setAttribute('role', 'presentation');
                    
        stateSelect.appendChild(li);
    });
    if(categories != null){
        indexCategorySelected = categories[0].idCategory;
    }
    productList = await getAllProducts();
    productList.forEach(item =>{
        renderProduct(item);
    });
}
function chageIndexSelected(sel) {
    indexCategorySelected = categories[sel.selectedIndex].idCategory;
}
inventory.addEventListener("keypress", (ev)=> noLetters(ev));
price.addEventListener("keypress", (ev)=> noLetters(ev));

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    var product = {
        name: form.name.value,
        price: form.price.value,
        inventory: form.inventory.value,
        category: indexCategorySelected,
        creationDate: form.creationDate.value,
        modificationDate: form.modificationDate.value,
        activ: form.activ.value,
        description: description.value
    };
    showPleaseWait();
    await addProduct(product);
    cleanForm();
    hidePleaseWait();
});

//this function clean the inputs contents
function cleanForm(){
    form.name.value = form.price.value = form.inventory.value ='';
}
// real-time listener
db.collection('product').orderBy('category').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        console.log(change.doc.data());
        if(change.type == 'added'){
            renderProduct(change.doc);
        } else if (change.type == 'removed'){
            let li = productTableList.querySelector('[data-id=' + change.doc.id + ']');
            productTableList.removeChild(li);
        }
    });
});

// create element & render cafe
function renderProduct(doc){
    let tr = document.createElement('tr');
    tr.setAttribute('id', doc.idProduct);
    tr.setAttribute('class', 'table-success');
    let blank = document.createElement('td');
    blank.setAttribute('class', 'table-success');
    let idProduct = createCustomTextTag('td', 'table-success', doc.idProduct);
    let name = createCustomTextTag('td', 'table-success', doc.name);
    let price = createCustomTextTag('td', 'table-success', doc.price);
    let inventory = createCustomTextTag('td', 'table-success', doc.inventory);
    let state = createCustomTextTag('td', 'table-success', doc.activ);
    let createD = createCustomTextTag('td', 'table-success', doc.creationDate);
    let modificationD = createCustomTextTag('td', 'table-success', doc.modificationDate);
    let category = createCustomTextTag('td', 'table-success', doc.category);

    let tdActions = createCustomNonTextTag('td', 'row');
    var btnDelete = createCustomTextTag('button', 'btn btn-danger', 'X');
    btnDelete.setAttribute('style', 'margin-right:5px');
    var btnUpdate = createCustomTextTag('button', 'btn btn-warning', '!');
    appendChildListTag([btnDelete, btnUpdate], tdActions);

    tr.setAttribute('data-id', doc.idProduct);

    appendChildListTag([blank, idProduct, name, price, inventory, state, createD, modificationD, category], tr);
    
    tr.appendChild(tdActions);

    productTableList.appendChild(tr);

    // deleting data
    btnDelete.addEventListener('click', async (e) => {
        e.stopPropagation();
        let id = doc.idProduct;
        showPleaseWait();
        await deleteProduct(id);
        hidePleaseWait();
        location.reload();
        /*let tr = productTableList.querySelector(id);
        productTableList.removeChild(tr);*/

    });
    // updating data
    btnUpdate.addEventListener('click', (e) => {
        window.location.href = '../../pages/products/update.html?id='+doc.idProduct+'?imageUrl='+'https://firebasestorage.googleapis.com/v0/b/daniela-store.appspot.com/o/'+doc.idProduct;
    });
}