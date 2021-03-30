const productcategoryList = document.querySelector('#category-product-list');
const purchaseTable = document.querySelector('#purchase-table');
const purchaseForm = document.querySelector('#add-purchase-form');
const btnResetForm = document.querySelector('#btnResetForm');
var purchaseList;
var productList;
var purchasetToUpdate;
var indexPurchaseSelected;
var imageToFirebase = false;
var isUpdating = false;
var idProduct = document.location.search.split('=')[1];


window.onload = async function () {
    loadingPageSettings();

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
}
//get information from the session storage
//and render the categories options
async function getInformation() {
    purchaseList = await getAllPurchasesByIdProduct(idProduct);
    purchaseList.forEach(item => {
        renderPurchase(item);
    });
    var statuslist = [{ 'payment': 'Done' }, { 'payment': 'Pendient' }];
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
    var d = new Date(purchaseForm.modificationDate.value)
    var purchase = {
        idProduct: idProduct,
        receipt: purchaseForm.receipt.value,
        unitPrice: parseFloat(purchaseForm.unitPrice.value),
        tottalUnits: parseFloat(purchaseForm.tottalUnits.value),
        creationDate: d,
        updateDate: d,
        state: purchaseForm.paymentState.value,
        description: purchaseForm.description.value
    };
    if (isUpdating) {
        //console.log('is updating');
        purchase.idProduct = purchasetToUpdate.idProduct;
        console.log('updating');
        showPleaseWait();

        await updatePurchase(purchase).then(async () => {
            location.reload();
        });

    } else {
        showPleaseWait();
        await addPurchase(purchase).then(async () => {
            var prds = JSON.parse(sessionStorage.getItem('allProducts'));
            var p = prds.find((elenent) => elenent.idProduct == purchase.idProduct);
            var quantity = parseFloat(purchase.tottalUnits) + parseFloat(p.inventory);
            await updateProductStock(purchase.idProduct, quantity).then(() => {
                prds.find((element) => {
                    if (element.idProduct == p.idProduct) {
                        element.inventory = quantity;
                    }
                });
                sessionStorage.setItem('allProducts', JSON.stringify(prds));
            });
            location.reload();
        });
        hidePleaseWait();
    }
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
    let creationDatetd = createCustomTextTag('td', 'table-success', doc.creationDate.toDate().toDateString());
    let updateDatetd = createCustomTextTag('td', 'table-success', doc.updateDate.toDate().toDateString());
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
    appendChildListTag([btnUpdate, btnDelete, btnSales], tdActions);

    tr.setAttribute('data-id', doc.idPurchase);

    appendChildListTag([blank, idPurchase, receipt, state, creationDatetd, updateDatetd, tottalUnits, unitPrice], tr);

    tr.appendChild(tdActions);

    purchaseTable.appendChild(tr);


    // updating data
    btnUpdate.addEventListener('click', async (e) => {
        e.stopPropagation();
        if (doc.state == 'Pendient') {
            showPleaseWait();
            var result = await updatePurchase(doc);
            if (result == null) {
                hidePleaseWait();
                alert("Purchase payment no updated");
                location.reload();
            } else {
                hidePleaseWait();
                alert("Purchase payment updated");
            }
        } else alert('No need');
    });
    btnSales.addEventListener('click', async (e) => {
        prod = productList.find(Element => Element.idProduct == idProduct);
        actualPurchaseId = doc.idPurchase;
        actualpur = purchaseList.find(Element => Element.idPurchase == actualPurchaseId);
        salesList = await getAllSalesByIdPurchase(actualPurchaseId);
        outStock = 0;
        if (salesList != null) {
            salesList.forEach(item => {
                outStock += item.tottalUnits;
            });
        }
        availableUnits = actualpur.tottalUnits - outStock;
        salesForm.availableUnits.value = availableUnits;
        salesForm.unitPriceSales.value = "" + prod.price;
    });
    btnDelete.addEventListener("click", async (e) => {
        e.stopPropagation();
        alert("deleting");
        await getAllSalesByIdPurchase(doc.idPurchase);
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
    document.getElementById("receiptLabel").innerHTML = purchaseRecieptLabel;
    purchaseForm.receipt.setAttribute("placeholder", purchaseRecieptLabel);
    document.getElementById("unitPriceLabel").innerHTML = purchaseUnitPriceLabel;
    purchaseForm.unitPrice.setAttribute("placeholder", purchaseUnitPriceLabel);
    document.getElementById("tottalUnitsLabel").innerHTML = purchaseTottalUnitsLabel;
    purchaseForm.tottalUnits.setAttribute("placeholder", purchaseTottalUnitsLabel);
    document.getElementById("paymentStateLabel").innerHTML = purchasePaymentStateLabel;
    purchaseForm.paymentState.setAttribute("placeholder", purchasePaymentStateLabel);
    document.getElementById("descriptionLabel").innerHTML = purchaseDescriptionLabel;
    purchaseForm.description.setAttribute("placeholder", purchaseDescriptionLabel);
    document.getElementById("creationDateLabel").innerHTML = purchaseCreationDateLabel;
    document.getElementById("modificationDateLabel").innerHTML = purchaseModificationDateLabel;
    document.getElementById("btnPurchaseSubmit").innerHTML = btnPurchaseSubmit;
    document.getElementById("purchaseHeader").innerHTML = purchasePageHeader;
}

function clearForm() {
    purchaseForm.reset();
    purchasetToUpdate = null;
    this.isUpdating = false;
    btnResetForm.setAttribute('style', 'visibility: hidden;');
    creationDate.valueAsDate = new Date();
    modificationDate.valueAsDate = new Date();
    hideAndShowDivFuction();
}