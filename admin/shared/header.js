$(document).ready(function () {
    showPleaseWait();

    var liststart = document.createElement('ul');
    liststart.setAttribute("class", "navbar-nav mr-auto");
    var categories = createCustomVarItem('nav-item');
    var home = createCustomVarItem('nav-item');
    var product = createCustomVarItem('nav-item');
    //anchors
    var aProduct = createCustomAnchor('Product', window.rootFile + 'pages/products/product.html', 'nav-link');
    var aCategory = createCustomAnchor('Categories', window.rootFile + 'pages/categories/categories.html', 'nav-link');
    var aHome = document.createElement("a");
    aHome.href = localHost;
    aHome.innerHTML = homeText;
    aHome.setAttribute("class", "nav-link");
    //append the anchors to the list
    aProduct.href == document.location.href != true ? product.appendChild(aProduct) : aProduct.setAttribute("class", "nav-link disabled");
    aHome.href == document.location.href != true ? home.appendChild(aHome) : aHome.setAttribute("class", "nav-link disabled");
    aCategory.href == document.location.href != true ? categories.appendChild(aCategory) : categories.setAttribute("class", "nav-link disabled");
    //append the nav bar list items 
    appendChildListTag([home, product, categories], liststart);

    $("#header").append(liststart);
    hidePleaseWait();
});
