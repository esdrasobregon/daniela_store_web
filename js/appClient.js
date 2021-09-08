//#region variables

//this are the app variables 
var prods = sessionStorage.getItem('allProducts');
prods = JSON.parse(prods);
var categories = sessionStorage.getItem('categories');
categories = JSON.parse(categories);

//#endregion variables

//#region functions
/**
 * this function loads all the client info 
 * needded in the app
 */
async function getClientInfo() {

	if (prods == null || categories == null) {
		showPleaseWait();
		prods = await getAsyncProducts();
		console.log(prods);
		sessionStorage.setItem("allProducts", JSON.stringify(prods));
		console.log('categories allready loaded');

		categories = await getAsyncCategories();
		console.log(categories);
		sessionStorage.setItem("categories", JSON.stringify(categories));

		if ((categories == null) || (prods == null)) {
			alert("please reload the page");
		}
		hidePleaseWait();
	}
}
//#endregion functions