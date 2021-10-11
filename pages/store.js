//#region varibles

//show just one category and its products
var localUrl = document.URL;
var split = localUrl.split('?');
var idCategory = split[1].split('=')[1];
var selectCategory = categories.find((element) => element.idCategory == idCategory);
var br = document.createElement('br');
var prodsToShow = [];

//#endregion varibles


//#region view

window.onload = async function () {
	showPleaseWait();
	renderCategoryDiv();
	prods.forEach(prod => {

		if (prod.category == idCategory) {
			prodsToShow.push(prod);
		}

	});
	prodsToShow.forEach(prod => {
		const divProd = renderProduct(prod);
        document.getElementById(prod.category).appendChild(divProd);
	});
	hidePleaseWait();
}

function renderCategoryDiv() {

	var catIdText = selectCategory.idCategory;
	var categoryCol = createCustomNonTextTag('div', 'row clearfix');
	categoryCol.setAttribute('id', catIdText);
	categoryCol.style.marginLeft = "5px";
	categoryCol.style.marginRight = "5px";
	categoryCol.style.marginTop = "10px";
	categoryCol.style.marginBottom = "10px";
	var headder = createCustomTextTag('h3', 'text-info', selectCategory.name);
	headder.setAttribute("style", "margin: 20px");
	var idProduct;
	//categoryCol.appendChild(headder);
	appendChildListTag([headder], document.getElementById('product-container'));
	$('#product-container').append(categoryCol);
}


//#endregion view