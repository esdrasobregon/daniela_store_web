/**
 * this function calls the server
 * to retreive all categories
 */
function getCategories() {
  fetch(localHost + "/categories/?allCategories", {
      method: 'GET'
    }).then(response => response.json())
    .then(result => {
      console.log(result);
      sessionStorage.setItem('categories', JSON.stringify(result));
    })
    .catch(error => {
      console.error('Error:', error);
    });
}
/**
 * this function calls the server
 * to retreive all categories
 */
async function getAsyncCategories() {
  const result = await fetch(localHost + "/categories/?allCategories", {
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