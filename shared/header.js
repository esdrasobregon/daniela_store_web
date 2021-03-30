

$(document).ready(function () {
    showPleaseWait();
    var currentUser = sessionStorage.getItem('currentUser');
    var liststart = document.createElement('ul');
    liststart.setAttribute("class", "navbar-nav mr-auto");
    var aBrand = createCustomAnchor('Lillian store', window.rootFile + 'index.html', 'navbar-brand');
    //adminMenu header
    var adminMenu = document.createElement('li');
    adminMenu.setAttribute('class', 'nav-item dropdown');
    var aAdmin = createCustomAnchor(adminMenuText, '#', 'nav-link dropdown-toggle');
    aAdmin.setAttribute('id', 'navbarDropdownMenuLink-4');
    aAdmin.setAttribute('data-toggle', 'dropdown');
    aAdmin.setAttribute('aria-haspopup', 'true');
    aAdmin.setAttribute('aria-expanded', 'false');
    var itemsAdmin = document.createElement('div');
    itemsAdmin.setAttribute('class', 'dropdown-menu dropdown-menu-right dropdown-info');
    itemsAdmin.setAttribute('aria-labelledby', 'navbarDropdownMenuLink-4');
    var aAdminProduct = createCustomAnchor(aAdminProductsMenu, window.rootFile + "admin/pages/products/product.html", 'dropdown-item');
    var aAdminCategorie = createCustomAnchor(aAdminCategoriesMenu, window.rootFile + "admin/pages/categories/categories.html", 'dropdown-item');
    appendChildListTag([aAdminProduct, aAdminCategorie], itemsAdmin);
    aAdmin.appendChild(itemsAdmin);
    adminMenu.appendChild(aAdmin);

    //facebook item 
    var facebook = document.createElement('li');
    facebook.setAttribute('class', 'nav-item active');
    var aFacebook = createCustomAnchor('Facebook', 'http://wwww.facebook.com', 'nav-link');
    facebook.appendChild(aFacebook);

    var about = createCustomVarItem('nav-item');
    var login = createCustomVarItem('nav-item');
    var home = createCustomVarItem('nav-item');
    var contact = createCustomVarItem('nav-item');
    var store = createCustomVarItem('nav-item');
    //anchors
    var aLogin = createCustomAnchor(currentUser == null ? aloginText : loginOut, window.rootFile + 'pages/login.html', 'nav-link');
    var aAbout = createCustomAnchor(aboutText, window.rootFile + 'pages/about.html', 'nav-link');
    var aHome = document.createElement("a");
    aHome.href = localHost;
    aHome.innerHTML = homeText;
    aHome.setAttribute("class", "nav-link");
    var aContact = createCustomAnchor(contactText, window.rootFile + 'pages/contact.html', 'nav-link');
    var aStore = createCustomAnchor(storeText, window.rootFile + 'pages/categories/categories.html', 'nav-link');
    //append the anchors to the list
    login.appendChild(aLogin);
    aHome.href == document.location.href != true ? home.appendChild(aHome) : aHome.setAttribute("class", "nav-link disabled");
    aAbout.href == document.location.href != true ? about.appendChild(aAbout) : about.setAttribute("class", "nav-link disabled");
    aContact.href == document.location.href != true ? contact.appendChild(aContact) : contact.setAttribute("class", "nav-link disabled");
    aStore.href == document.location.href != true ? store.appendChild(aStore) : store.setAttribute("class", "nav-link disabled");

    login.addEventListener('click', async (e) => {
        e.stopPropagation();
        currentUser == null ? console.log("Login out") : sessionStorage.removeItem('currentUser');
    });
    aAdminProduct.addEventListener('click', async (e) => {
        e.stopPropagation();
        window.location.href = window.rootFile + "admin/pages/products/product.html";
    });
    aAdminCategorie.addEventListener('click', async (e) => {
        e.stopPropagation();
        window.location.href = window.rootFile + "admin/pages/categories/categories.html";
    });
    //append the nav bar list items 
    currentUser == null ? appendChildListTag([home, about, contact, store, login], liststart)
        : appendChildListTag([home, about, contact, adminMenu, store, login], liststart);;

    $("#header").append(liststart);
    hidePleaseWait();
});
