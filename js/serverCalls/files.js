/**
 * this function calls the server
 * to retreive profile
 */
 async function getServerFolderFileList(folder) {
    const result =
      await fetch(localHost + "/profile/?fileList/?" + folder, {
        method: 'GET'
      }).then(response => response.json())
      .then(result => {
        return result.list;
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
   * @param {*} formData is a formdata object 
   * @returns a server response object
   */
  async function addImageToServer(formData) {
    var result = await fetch(localHost + "/settings/", {
        method: 'POST',
        body: formData
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
  /**
   * this function calls the server to add a
   * image register to the server
   * @param {*} fileName is a formdata object 
   * @returns a server response object
   */
  async function deleteServerFile(fileName) {
    const fileObject = {
      fileName: fileName,
      case: "delete"
    }
    var result = await fetch(localHost + "/profile/", {
        method: 'DELETE',
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
  /**
   * this function calls the server to add a
   * image register to the server
   * @param {*} fileName is a formdata object 
   * @returns a server response object
   */
  async function writeFile(fileName) {
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