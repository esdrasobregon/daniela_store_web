
$(document).ready(function () {
    showPleaseWait();

    var liststart = document.createElement('ul');
    liststart.setAttribute("class", "navbar-nav mr-auto");
    var aBrand = createCustomAnchor('Lillian store', window.rootFile + 'index.html', 'navbar-brand');

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

    $("#footer").append(liststart);
    hidePleaseWait();
});
//profile header
    // var profile = document.createElement('li');
    // profile.setAttribute('class', 'nav-item dropdown');
    // var aProfile = createCustomAnchor('Profile', '#', 'nav-link dropdown-toggle');
    // aProfile.setAttribute('id', 'navbarDropdownMenuLink-4');
    // aProfile.setAttribute('data-toggle', 'dropdown');
    // aProfile.setAttribute('aria-haspopup', 'true');
    // aProfile.setAttribute('aria-expanded', 'false');
    // var itemsProfile = document.createElement('div');
    // itemsProfile.setAttribute('class', 'dropdown-menu dropdown-menu-right dropdown-info');
    // itemsProfile.setAttribute('aria-labelledby', 'navbarDropdownMenuLink-4');
    // var myAcount = createCustomAnchor('My acount', '#', 'dropdown-item');
    // var logout = createCustomAnchor('Log out', '#', 'dropdown-item');
    // appendChildListTag([myAcount, logout], itemsProfile);
    // aProfile.appendChild(itemsProfile);
    // profile.appendChild(aProfile);