/**
 * this function calls the server
 * to retreive all receipt type
 */
async function getAllConteos() {
    var result = await fetch(localHost + "/conteos/?allConteos", {
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