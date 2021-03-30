const salesForm = document.querySelector('#add-sales-form');
var actualPurchaseId;
var salesList;
var availableUnits;
var actualpur;
var outStock;
var prod;
//add sales
salesForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (actualpur.tottalUnits > outStock) {
        if (parseFloat(salesForm.salesTottalUnit.value) <= availableUnits) {
            var sale = {
                idPurchase: actualPurchaseId,
                idProduct: idProduct,
                unitPrice: parseFloat(salesForm.unitPriceSales.value),
                tottalUnits: parseInt(salesForm.salesTottalUnit.value),
                paymentMethod: salesForm.paymentMethod.value,
                creationDate: new Date(),
                description: salesForm.saleDescription.value
            };
            showPleaseWait();
            await addSale(sale);
            if (sale == null) {
                alert("Sale no added");
            } else {
                var newInventory = (prod.inventory - sale.tottalUnits);
                await updateProductStock(idProduct, newInventory).then(() => {
                    productList.find((element) => {
                        if (element.idProduct == prod.idProduct) {
                            element.inventory = newInventory;
                        }
                    });
                    sessionStorage.setItem('allProducts', JSON.stringify(productList));
                });

                outStock += parseFloat(salesForm.salesTottalUnit.value);
                if (outStock >= actualpur.tottalUnits) {
                    await updatePurchaseOutOfStock(actualpur);
                    document.getElementById(actualPurchaseId).remove();
                }
                resetHideModal()
            }
            hidePleaseWait();
        } else {
            alert("Just " + (actualpur.tottalUnits - outStock) + " there are left");
        }
    } else {
        alert("Just " + (actualpur.tottalUnits - outStock) + " units available");
    }
});
//reset and hide modal
function resetHideModal() {
    salesForm.reset();
    $('#myModal').modal('hide');
}