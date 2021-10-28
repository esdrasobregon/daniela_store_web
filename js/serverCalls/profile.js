/**
 * this function calls the server
 * to retreive profile
 */
async function getProfile() {
  const result = await fetch(localHost + "/profile/?profile", {
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
