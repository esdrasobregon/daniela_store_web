//getting all the products
async function getProducts() {
    var prods;
    const HttpProd = new XMLHttpRequest();
    const urlProds = localHost + '/allProducts';
    HttpProd.open("GET", urlProds);
    HttpProd.send();

    HttpProd.onreadystatechange = (e) => {
        prods = HttpProd.responseText;
        sessionStorage.setItem('allProducts', prods);
    }
}
