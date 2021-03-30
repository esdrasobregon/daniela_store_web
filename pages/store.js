//show jus one category and its products
document.getElementById("webSiteName").innerHTML = webSiteName;
document.getElementById("footerMenuText").innerHTML = footerMenuText;
document.getElementById("headerMenuText").innerHTML = headerMenuText;
document.getElementById("productListH1").innerHTML = productListH1;

document.title = webSiteName + " " + storeText;
document.getElementById("modalWebSiteName").innerHTML = webSiteName;
var localUrl = document.URL;
var split = localUrl.split('?');
var idCategory = split[1].split('=')[1];
var selectCategory = categories.find((element) => element.idCategory == idCategory);

var br = document.createElement('br');
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
var prodsToShow = [];

prods.forEach(prod => {
	showPleaseWait();
	if (prod.category == idCategory) {
		prodsToShow.push(prod);
	}
	hidePleaseWait();
});

//productos settings
prodsToShow.forEach(prod => {
	showPleaseWait();
	if (prod.activ == '1') {
		var utlReady = 'javascript:void(0)';
		//setting the containers
		var mainCol = createCustomNonTextTag('div', 'col-lg-3 col-md-4 col-sm-12 border border-primary');
		mainCol.setAttribute("style", "margin: 10px; padding: 10px;")
		var itemCard = createCustomNonTextTag('div', 'card product_item');
		var body = createCustomNonTextTag('div', 'body');
		var imgDiv = createCustomNonTextTag('div', 'cp_img');
		imgDiv.style.marginTop = "20px";
		var plusCarDiv = createCustomNonTextTag('div', 'hover');
		var detailsDiv = createCustomNonTextTag('div', 'product_details');
		detailsDiv.setAttribute("style", "margin-bottom: 20px; padding: 5px;");

		appendChildListTag([imgDiv, detailsDiv], body);
		itemCard.appendChild(body);
		mainCol.appendChild(itemCard);
		//inner content
		//image settings
		var img = createImgTag('img-fluid', url + prod.idProduct + urlPlus);
		img.setAttribute('alt', 'Product');
		appendChildListTag([img, plusCarDiv], imgDiv);
		var plussAncle = createCustomNonTextTag('a', 'btn btn-primary btn-sm waves-effect');
		var plusIcon = createCustomNonTextTag('i', 'zmdi zmdi-plus');
		plussAncle.appendChild(plusIcon);
		plussAncle.setAttribute('href', utlReady);
		plussAncle.style.margin = "5px";
		plussAncle.setAttribute('data-toggle', 'modal');
		plussAncle.setAttribute('data-target', '#productDetailsModLabel');
		var carAncle = createCustomNonTextTag('a', 'btn btn-primary btn-sm waves-effect');
		carAncle.style.margin = "5px";
		carAncle.setAttribute('data-toggle', 'modal');
		carAncle.setAttribute('data-target', '#productDetailsModLabel');
		var carIcon = createCustomNonTextTag('i', 'zmdi zmdi-shopping-cart');
		carAncle.setAttribute('href', utlReady);
		carAncle.appendChild(carIcon);
		appendChildListTag([plussAncle, carAncle], plusCarDiv);
		//details settings
		var nameHeadder = document.createElement('h5');
		var headerAncle = document.createElement('a');
		headerAncle.setAttribute('href', utlReady);
		headerAncle.innerHTML = "Name: " + prod.name;
		nameHeadder.appendChild(headerAncle);
		var pricedetails = createCustomNonTextTag('ul', 'product_price list-unstyled');
		var priceLi = createCustomTextTag('li', 'new_price', prod.showPrice == true ? 'Price: ₡' + prod.price : 'Price: ₡' + '???');
		pricedetails.appendChild(priceLi);
		//show
		var showMore = createCustomTextTag("small", "text-muted", showMoreMessage);
		appendChildListTag([nameHeadder, pricedetails, showMore], detailsDiv);
		document.getElementById(prod.category).appendChild(mainCol);

		carAncle.addEventListener('click', async (e) => {
			e.stopPropagation();
			showProductDetailsModal(prod);
		});
		mainCol.addEventListener('click', async (e) => {
			e.stopPropagation();
			showProductDetailsModal(prod);
		});
		plussAncle.addEventListener('click', async (e) => {
			e.stopPropagation();
			showProductDetailsModal(prod);
		});
	}
	hidePleaseWait();
});

function showProductDetailsModal(prod) {
	var listProdDescription = prod.description.split(".");
	var ulProdDescription = createCustomNonTextTag("ul", "list-group list-group-flush");
	ulProdDescription.appendChild(createCustomTextTag("li", "list-group-item active", categoryDescriptionListTitle));
	listProdDescription.forEach((desc) => {
		const l = createCustomTextTag("li", "list-group-item", desc);
		ulProdDescription.appendChild(l);
	});
	document.getElementById("productDetailsModLabelLabel").innerHTML = prod.name;
	document.getElementById("name").innerHTML = prodModaldetailsName + prod.name;
	document.getElementById("price").innerHTML = prod.showPrice == true ?
		prodModaldetailsPrice + prod.price
		: prodModaldetailsNotPrice;
	var divDesc = document.getElementById("description");
	//removing the actual content
	while (divDesc.firstChild) {
		divDesc.removeChild(divDesc.firstChild);
	}
	divDesc.appendChild(ulProdDescription);
	document.getElementById("whatsAppNumber").innerHTML = prodModaldetailsCallPhone + whatsAppNumber;
	$('#imageFirebase')
		.attr('src', url + prod.idProduct + urlPlus);
	$('#productDetailsModLabel').modal('show');
}


