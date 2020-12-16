//getting all products
var prods = sessionStorage.getItem('allProducts');
prods = JSON.parse(prods);
var categories = sessionStorage.getItem('categories');
categories = JSON.parse(categories);

if(prods == null || prods.length == 0){
	window.location.replace('./../index.html');
}