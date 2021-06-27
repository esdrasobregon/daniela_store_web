const productcategoryList = document.querySelector('#category-product-list');
const purchaseTable = document.querySelector('#purchase-table');
const purchaseForm = document.querySelector('#add-purchase-form');
var purchaseList = {};
var productList;
var purchasetToUpdate;
var indexPurchaseSelected;
var imageToFirebase = false;
var isUpdating = false;
var idProduct = document.location.search.split('=')[1];


window.onload = async function () {

    loadingPageSettings();
    await getPurchases(idProduct);
    showPleaseWait();
    //it give some time for purchases callback function
    setTimeout(async () => {
        $('#imageFirebase')
            .attr('src', url + idProduct + urlPlus);
        if (sessionStorage.getItem('categories') == null) {
            await getCategories();
        }
        if (sessionStorage.getItem('allProducts') == null) {
            await getProducts();

            getInformation();
        } else {
            console.log('getting the local sessionStorage');
            getInformation();
        }
        hidePleaseWait();
    }, 3000);

}
//get information from the session storage
//and render the categories options
async function getInformation() {
    purchaseList.forEach(item => {
        renderPurchase(item);
    });
    var statuslist = [{
        'payment': 'Done'
    }, {
        'payment': 'Pendient'
    }];
    statuslist.forEach(item => {
        var li = createCustomTextTag('option', 'divider', item.payment);
        li.setAttribute('role', 'presentation');
        li.setAttribute('value', item.payment);
        purchaseForm.paymentState.appendChild(li);

    });
    productList = JSON.parse(sessionStorage.getItem('allProducts'));

}

function chageIndexSelected(sel) {
    indexPurchaseSelected = purchaseList[sel.selectedIndex].idPurchase;
}
tottalUnits.addEventListener("keypress", (ev) => noLetters(ev));
unitPrice.addEventListener("keypress", (ev) => noLetters(ev));

//add or update purchases
purchaseForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    var d = getCustomDate(new Date(purchaseForm.modificationDate.value));
    var creationDate = getCustomDate(new Date(purchaseForm.creationDate.value));
    var p = productList.find((elenent) => elenent.idProduct == idProduct);
    var quantity = parseFloat(purchaseForm.tottalUnits.value) + parseFloat(p.inventory);
    var purchase = {
        idProduct: idProduct,
        receipt: purchaseForm.receipt.value,
        unitPrice: parseFloat(purchaseForm.unitPrice.value),
        tottalUnits: parseFloat(purchaseForm.tottalUnits.value),
        creationDate: creationDate,
        updateDate: d,
        state: purchaseForm.paymentState.value,
        description: purchaseForm.description.value,
        quantity: quantity
    };
    showPleaseWait();
    await addPurchase(purchase);
    var listLength = purchaseList.length;
    setTimeout(() => {
        if (listLength < purchaseList.length) {
            productList.find((element) => {
                if (element.idProduct == idProduct) {
                    element.inventory = quantity;
                }
            });
            sessionStorage.setItem('allProducts', JSON.stringify(productList));
            renderPurchase(purchaseList[purchaseList.length - 1]);
            clearForm();
        } else {
            alert("server fail");
        }
        hidePleaseWait();
    }, 3000);
});
// render purchase table
function renderPurchase(doc) {
    let tr = document.createElement('tr');
    tr.setAttribute('id', doc.idPurchase);
    tr.setAttribute('class', 'table-success');
    let blank = document.createElement('td');
    blank.setAttribute('class', 'table-success');
    let idPurchase = createCustomTextTag('td', 'table-success', doc.idPurchase);
    let receipt = createCustomTextTag('td', 'table-success', doc.receipt);
    let creationDatetd = createCustomTextTag('td', 'table-success', doc.creationDate.date + "-" + doc.creationDate.month + "-" + doc.creationDate.year);
    let updateDatetd = createCustomTextTag('td', 'table-success', doc.updateDate.date + "-" + doc.updateDate.month + "-" + doc.updateDate.year);
    let state = createCustomTextTag('td', 'table-success', doc.state);
    let unitPrice = createCustomTextTag('td', 'table-success', doc.unitPrice);
    let tottalUnits = createCustomTextTag('td', 'table-success', doc.tottalUnits);

    let tdActions = createCustomNonTextTag('td', 'row');
    var btnDelete = createCustomTextTag('button', 'btn btn-danger', 'X');
    btnDelete.setAttribute('style', 'margin-right:5px');
    var btnSales = createCustomTextTag('button', 'btn btn-info btn-lg', 'Sales');
    btnSales.setAttribute('style', 'margin-right:5px');
    btnSales.setAttribute('data-toggle', "modal");
    btnSales.setAttribute("data-target", "#myModal");

    var btnUpdate;
    btnUpdate = doc.state == 'Pendient' ? createCustomTextTag('button', 'btn btn-warning', '!') : createCustomTextTag('button', 'btn btn-warning', 'No need');
    btnUpdate.setAttribute("id", "btnUpdate" + doc.idPurchase);
    appendChildListTag([btnUpdate, btnDelete, btnSales], tdActions);

    appendChildListTag([blank, idPurchase, receipt, state, creationDatetd, updateDatetd, tottalUnits, unitPrice], tr);

    tr.appendChild(tdActions);

    purchaseTable.appendChild(tr);


    // updating data
    btnUpdate.addEventListener('click', async (e) => {
        e.stopPropagation();
        if (doc.state == 'Pendient') {
            showPleaseWait();
            await updatePurchase(doc);
            setTimeout(() => {
                hidePleaseWait();
            }, 3000);
        } else alert('No need');
    });
    btnSales.addEventListener('click', async (e) => {
        prod = productList.find(Element => Element.idProduct == idProduct);
        actualPurchaseId = doc.idPurchase;
        actualpur = purchaseList.find(Element => Element.idPurchase == actualPurchaseId);
        showPleaseWait();
        await getAllSalesByIdPurchases(actualPurchaseId, salesList);
        setTimeout(() => {
            hidePleaseWait();
        }, 3000);
    });
    btnDelete.addEventListener("click", async (e) => {
        e.stopPropagation();
        deletePurchase(doc.idPurchase);
        //await getAllSalesByIdPurchase(doc.idPurchase);
    });

}
//create category list
function renderPurchaseList(item) {
    var divCat = createDivTagClassStyle('row', 'margin: 10px');
    var divHeadder = document.createElement('div');
    var headder = document.createElement('h5');
    var aHeader = createCustomTextTag('a', 'btn btn-primary', item.name);
    aHeader.setAttribute('role', 'button');
    headder.appendChild(aHeader);
    var catList = createCustomNonTextTag('ul', 'row');
    var divHide = createDivTagClassStyle('container', 'display: none');
    divHide.setAttribute('id', 'catList' + item.idCategory);
    headder.setAttribute('onClick', 'hideAndShowDiv(catList' + item.idCategory + ')');
    catList.setAttribute('style', 'list-style: none;');
    catList.setAttribute('id', item.idCategory);
    divHeadder.appendChild(headder);
    divHide.appendChild(catList);
    appendChildListTag([divHeadder, divHide], divCat);
    productcategoryList.appendChild(divCat);
};

function loadingPageSettings() {
    purchaseForm.creationDate.valueAsDate = new Date();
    purchaseForm.modificationDate.valueAsDate = new Date();
    document.getElementById("paymentStateLabel").innerHTML = purchasePaymentStateLabel;
    purchaseForm.paymentState.setAttribute("placeholder", purchasePaymentStateLabel);
}

function clearForm() {
    purchaseForm.reset();
    purchasetToUpdate = null;
    this.isUpdating = false;
    creationDate.valueAsDate = new Date();
    modificationDate.valueAsDate = new Date();
}