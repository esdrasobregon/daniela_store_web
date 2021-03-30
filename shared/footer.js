
$(document).ready(function () {
    showPleaseWait();

    var liststart = document.createElement('ul');
    liststart.setAttribute("class", "navbar-nav mr-auto");
    var aBrand = createCustomAnchor('Lillian store', window.rootFile + 'index.html', 'navbar-brand');
    //profile header
    var profile = document.createElement('li');
    profile.setAttribute('class', 'nav-item dropdown');
    var aProfile = createCustomAnchor('Profile', '#', 'nav-link dropdown-toggle');
    aProfile.setAttribute('id', 'navbarDropdownMenuLink-4');
    aProfile.setAttribute('data-toggle', 'dropdown');
    aProfile.setAttribute('aria-haspopup', 'true');
    aProfile.setAttribute('aria-expanded', 'false');
    var itemsProfile = document.createElement('div');
    itemsProfile.setAttribute('class', 'dropdown-menu dropdown-menu-right dropdown-info');
    itemsProfile.setAttribute('aria-labelledby', 'navbarDropdownMenuLink-4');
    var myAcount = createCustomAnchor('My acount', '#', 'dropdown-item');
    var logout = createCustomAnchor('Log out', '#', 'dropdown-item');
    appendChildListTag([myAcount, logout], itemsProfile);
    aProfile.appendChild(itemsProfile);
    profile.appendChild(aProfile);

    //facebook item 
    var facebook = document.createElement('li');
    facebook.setAttribute('class', 'nav-item active');
    var aFacebook = createCustomAnchor('Facebook', 'http://wwww.facebook.com', 'nav-link');
    facebook.appendChild(aFacebook);

    var about = createCustomVarItem('nav-item');
    var home = createCustomVarItem('nav-item');
    var contact = createCustomVarItem('nav-item');
    var store = createCustomVarItem('nav-item');
    //anchors
    var aAbout = createCustomAnchor(aboutText, window.rootFile + 'pages/about.html', 'nav-link');
    var aHome = document.createElement("a");
    aHome.href = localHost;
    aHome.innerHTML = homeText;
    aHome.setAttribute("class", "nav-link");
    var aContact = createCustomAnchor(contactText, window.rootFile + 'pages/contact.html', 'nav-link');
    var aStore = createCustomAnchor(storeText, window.rootFile + 'pages/categories/categories.html', 'nav-link');
    //append the anchors to the list
    aHome.href == document.location.href != true ? home.appendChild(aHome) : aHome.setAttribute("class", "nav-link disabled");
    aAbout.href == document.location.href != true ? about.appendChild(aAbout) : about.setAttribute("class", "nav-link disabled");
    aContact.href == document.location.href != true ? contact.appendChild(aContact) : contact.setAttribute("class", "nav-link disabled");
    aStore.href == document.location.href != true ? store.appendChild(aStore) : store.setAttribute("class", "nav-link disabled");

    //append the nav bar list items 
    appendChildListTag([home, about, contact, facebook, store], liststart);

    $("#footer").append(liststart);
    hidePleaseWait();
});
