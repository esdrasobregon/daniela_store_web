
//categories settings
categories.forEach(category => {
	var br = document.createElement('br');
	var catIdText = category.idCategory;
	var categoryCol = createCustomNonTextTag('div', 'row clearfix border border-success');
	categoryCol.setAttribute('id', catIdText);
	categoryCol.style.marginLeft = "5px";
	categoryCol.style.marginRight = "5px";
	categoryCol.style.marginTop = "10px";
	categoryCol.style.marginBottom = "10px";
	var headder = createCustomTextTag('h3', 'text-info', category.description);

	//categoryCol.appendChild(headder);
	appendChildListTag([br, br, br, headder], document.getElementById('product-container'));
	$('#product-container').append(categoryCol);
});
//productos settings
prods.forEach(prod => {
	var utlReady = 'productDetails.html?id='+prod.idProduct+'?imageUrl='+url+prod.idProduct;
	//setting the containers
    var mainCol = createCustomNonTextTag('div', 'col-lg-3 col-md-4 col-sm-12');
	var itemCard = createCustomNonTextTag('div', 'card product_item');
	var body = createCustomNonTextTag('div', 'body');
	var imgDiv = createCustomNonTextTag('div', 'cp_img');
	imgDiv.style.marginTop = "20px";
	var plusCarDiv = createCustomNonTextTag('div', 'hover');
	var detailsDiv = createCustomNonTextTag('div', 'product_details');
	detailsDiv.style.marginBottom = "20px"

	appendChildListTag([imgDiv, detailsDiv], body);
	itemCard.appendChild(body);
	mainCol.appendChild(itemCard);
	//inner content
	//image settings
	var img = createImgTag('img-fluid', url+prod.idProduct+urlPlus);
	img.setAttribute('alt', 'Product');
	appendChildListTag([img, plusCarDiv], imgDiv);
	var plussAncle = createCustomNonTextTag('a', 'btn btn-primary btn-sm waves-effect');
	var plusIcon = createCustomNonTextTag('i','zmdi zmdi-plus');
	plussAncle.appendChild(plusIcon);
	plussAncle.setAttribute('href', utlReady);
	plussAncle.style.margin = "5px";
	var carAncle = createCustomNonTextTag('a', 'btn btn-primary btn-sm waves-effect');
	carAncle.style.margin = "5px";
	var carIcon = createCustomNonTextTag('i','zmdi zmdi-shopping-cart');
	carAncle.setAttribute('href', utlReady);
	carAncle.appendChild(carIcon);
	appendChildListTag([plussAncle, carAncle], plusCarDiv);
	//details settings
	var nameHeadder = document.createElement('h5');
	var headerAncle = document.createElement('a');
	headerAncle.setAttribute('href', utlReady);
	headerAncle.innerHTML = prod.name;
	nameHeadder.appendChild(headerAncle);
	var pricedetails = createCustomNonTextTag('ul', 'product_price list-unstyled');
	var priceLi = createCustomTextTag('li', 'new_price','₡'+ prod.price);
	pricedetails.appendChild(priceLi);
	appendChildListTag([nameHeadder, pricedetails], detailsDiv);
	document.getElementById(prod.category).appendChild(mainCol);
});
function showDetails(idProduct){
	window.location.replace('productDetails.html?id='+idProduct+'?imageUrl='+url+idProduct);
}
function hideAndShowDivFuction(idContainer){

}


