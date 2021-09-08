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
/**
 * this function calls the server
 * to retreive all products
 */
async function getAsyncProducts() {
    var result = await fetch(localHost + "/products/?allProducts", {
            method: 'GET'
        }).then(response => response.json())
        .then(result => {
            return result;
        })
        .catch(error => {
            console.error('Error:', error);
            return null;
        });
    return result;
}