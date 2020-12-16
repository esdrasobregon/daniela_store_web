const updateForm = document.querySelector('#update-product-form');
var url = document.URL;var split = url.split('?');
var idProducto = split[1].split('=')[1];
var targerFile = split[2].split('=')[1]+'?alt=media&token=7055f2ae-fdfa-4871-89c8-f37785b8568e';
var product ={};
var categories;
var indexCategorySelected;
var description = document.getElementById('description');

window.onload = async function(){
	categories = await getAllCategories();
    $('#imageFirebase')
        .attr('src', targerFile);
    
    categories.forEach(item =>{
        var li = createCustomTextTag('option', 'divider', item.description);
        li.setAttribute('value', item.idCategory);
        li.setAttribute('role', 'presentation');                    
        stateSelect.appendChild(li);
    });
	await getProduct(idProducto);
    updateForm.name.value = product.name;
    updateForm.price.value = product.price;
    updateForm.idProduct.value = product.idProduct;
    updateForm.inventory.value = product.inventory;
    indexCategorySelected = product.category;
    updateForm.activ.value = product.activ;
    updateForm.creationDate.value = product.creationDate;
    description.value = product.description;
    today = new Date();
    updateForm.modificationDate.valueAsDate = today; 
    
    var index =0;
    while(indexCategorySelected != categories[index].idCategory){
    	index ++;
    }

    
    stateSelect.selectedIndex = index;
}
                
               
updateForm.addEventListener('submit', async (e) =>  {
    e.preventDefault();
    await updateProduct(updateForm.name.value,updateForm.price.value, description.value);
    alert('updated '+idProducto);
    comeBack();
});
              
function redirectToUploadImage(){
     window.location.href = '../../shared/uploadImages.html?id='+idProducto+'?productName='+product.name;
}
function chageIndexSelected(sel) {
    indexCategorySelected = categories[sel.selectedIndex].idCategory;
}
inventory.addEventListener("keypress", (ev)=> noLetters(ev));
price.addEventListener("keypress", (ev)=> noLetters(ev));

updateForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    var pProduct = {
    	idProduct: idProducto,
        name: updateForm.name.value,
        price: updateForm.price.value,
        inventory: updateForm.inventory.value,
        category: indexCategorySelected,
        modificationDate: updateForm.modificationDate.value,
        activ: updateForm.activ.value,
        description: description.value
    };
    showPleaseWait();
    await updateProduct(idProducto, pProduct);
    hidePleaseWait();
    window.history.back();
});