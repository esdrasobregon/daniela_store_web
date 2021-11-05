/**
 * this function calls the server
 * to retreive profile
 */
async function getServerFolderFileList(folder) {
  const result =
    await fetch(localHost + "/files/?fileList/?" + folder, {
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
  var result = await fetch(localHost + "/files/", {
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
 * @param {*} fileName is the file name 
 * @param {*} folderNane is folder location 
 * @returns a server response object
 */
async function deleteServerFile(fileName, folderNane) {
  const fileObject = {
    fileName: fileName,
    case: folderNane
  }
  var result = await fetch(localHost + "/files/", {
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