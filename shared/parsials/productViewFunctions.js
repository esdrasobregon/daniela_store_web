/**
 * this function load a product object
 * and then retuns the view 
 * @param {*} prod a product object 
 * @returns the product div
 */
function renderProduct(prod) {

    if (prod.activ == '1') {
        var utlReady = 'javascript:void(0)';
        //setting the containers
        var mainCol = createCustomNonTextTag('div', 'col-lg-3 col-md-4 col-sm-12 border border-primary');
        mainCol.setAttribute("style", "margin: 10px; padding: 10px;");
        mainCol.setAttribute("id", "card" + prod.idProduct);
        var itemCard = createCustomNonTextTag('div', 'card product_item');
        var body = createCustomNonTextTag('div', 'body');
        body.setAttribute("id", "product" + prod.idProduct);
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

        showMore.addEventListener('click', async (e) => {
            e.stopPropagation();
            showProductDetailsModal(prod);
        });
        carAncle.addEventListener('click', async (e) => {
            e.stopPropagation();
            showProductDetailsModal(prod);
        });
        plussAncle.addEventListener('click', async (e) => {
            e.stopPropagation();
            showProductDetailsModal(prod);
        });
        return mainCol;
    }
}