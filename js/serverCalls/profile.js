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
 /**
   * this function calls the server to add a
   * image register to the server
   * @param {*} fileName is a formdata object 
   * @returns a server response object
   */
  async function setPageSettings(fileName) {
    const fileObject = {
      fileName: fileName,
      case: "writeSettings"
    }
    var result = await fetch(localHost + "/profile/", {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(fileObject)
      }).then(response => response.json())
      .then(result => {
        return result;
      })
      .catch(error => {
        console.error('Error:', error);
        var result = {
          success: false,
          error: error
        }
        return result;
      });
    console.log(result);
    return result;
  }