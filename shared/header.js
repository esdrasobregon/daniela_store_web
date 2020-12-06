
 $(document).ready(function(){     
    
    var content = document.createElement('ul');
    content.innerHTML = "";
    var liststart = document.createElement('ul');
    liststart.setAttribute('class', 'navbar-nav');
    var outDiv = document.createElement('div');
    outDiv.setAttribute('class', 'collapse');
    outDiv.setAttribute('id', 'navbarToggleExternalContent');
    var darkDiv = document.createElement('div');
    darkDiv.setAttribute('class', 'bg-dark p-4');

    var innerDiv = document.createElement('div');
    innerDiv.setAttribute('class', 'collapse navbar-collapse');
    innerDiv.setAttribute('id', 'navbarNavAltMarkup');
    var aBrand = createCustomAnchor('Daniela store', window.rootFile+'index.html', 'navbar-brand');
    innerDiv.appendChild(aBrand);

    var navBar = document.createElement('nav');
    navBar.setAttribute('class', 'navbar navbar-expand-lg navbar-light bg-light');
    var centralDiv = document.createElement('div');
    centralDiv.setAttribute('class', 'col-md-8 offset-md-2');
    navBar.appendChild(centralDiv);
    darkDiv.appendChild(navBar);
    outDiv.appendChild(darkDiv);

    //button menu hide
    var navBarButtonHide = document.createElement('nav');
    navBarButtonHide.setAttribute('class', 'navbar navbar-dark bg-dark');
    var buttonHide = document.createElement('button');
    buttonHide.setAttribute('class', 'navbar-toggler');
    buttonHide.setAttribute('type', 'button');
    buttonHide.setAttribute('data-toggle', 'collapse');
    buttonHide.setAttribute('data-target', '#navbarToggleExternalContent');
    buttonHide.setAttribute('aria-controls', 'navbarToggleExternalContent');
    buttonHide.setAttribute('aria-expanded', 'false');
    buttonHide.setAttribute('aria-label', 'Toggle navigation');
    var spanButtonHide = document.createElement('span');
    spanButtonHide.setAttribute('class','navbar-toggler-icon');
    buttonHide.appendChild(spanButtonHide);
    navBarButtonHide.appendChild(buttonHide);
    //list
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
    itemsProfile.appendChild(myAcount);
    itemsProfile.appendChild(logout);
    aProfile.appendChild(itemsProfile);
    profile.appendChild(aProfile);

    //facebook item 
    var facebook = document.createElement('li');
    facebook.setAttribute('class','nav-item active');
    var aFacebook = createCustomAnchor('Facebook', 'http://wwww.facebook.com', 'nav-link');
    facebook.appendChild(aFacebook);

    var home = createCustomVarItem('nav-item');
    var about = createCustomVarItem('nav-item');
    var contact = createCustomVarItem('nav-item');
        //anchors
    var aHome = createCustomAnchor('Home', window.rootFile+'index.html', 'nav-link');
    var aAbout = createCustomAnchor('about', window.rootFile+ 'pages/about.html', 'nav-link');
    var aContact = createCustomAnchor('Contact', window.rootFile+'pages/contact.html', 'nav-link');
        //append the anchors to the list
    home.appendChild(aHome);
    about.appendChild(aAbout);
    contact.appendChild(aContact);
        //append the nav bar list items 
    liststart.appendChild(innerDiv);
    liststart.appendChild(home);
    liststart.appendChild(about);
    liststart.appendChild(contact);
    liststart.appendChild(facebook);
    liststart.appendChild(profile);
    content.appendChild(liststart);
    centralDiv.appendChild(content);
    
    $("#header").append(outDiv);
    $("#header").append(navBarButtonHide);
});
