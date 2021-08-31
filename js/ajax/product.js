/**
 * this function calls the server
 * to retreive all products
 */
function getProducts() {
    fetch(localHost + "/products/?allProducts", {
            method: 'GET'
        }).then(response => response.json())
        .then(result => {
            console.log(result);
            sessionStorage.setItem('allProducts', JSON.stringify(result));
        })
        .catch(error => {
            console.error('Error:', error);
        });
}