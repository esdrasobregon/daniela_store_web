//#region variables

const selectActionsToDo = document.getElementById("actionsToDo");
var selectedImageOption = null;
var imagesNamesList = [];
var imagesOption = document.getElementById("ImagesOptions");
var inputImage = document.getElementById("inputGroupFile01");
var imageVisor = document.getElementById("imageFirebase");
var imageForm = document.getElementById("add-images-form");

//#endregion variables

//#region view

/**
 * this function fills the select image options
 * in the view
 */
function loadImagesOptions() {
    imagesNamesList.length > 0 ?
        selectedImageOption = imagesNamesList[0] :
        console.log("no image options");
    imagesNamesList.forEach(element => {
        var opt = document.createElement("option");
        opt.innerHTML = element;
        opt.value = element;
        imagesOption.appendChild(opt);
    });
}

imagesOption.addEventListener('change', async (event) => {
    console.log(`You like ${event.target.value}`);
    selectedImageOption = event.target.value;
    showImage(imageVisor,"./shared/images/" +selectedImageOption);
});

/**
 * this function resets the client view.
 * Use it after make chages
 */
function resetView() {
    selectActionsToDo.selectedIndex = 0;
    imageVisor.setAttribute("src", "#");
    inputImage.value = "";
}

/**
 * this function sets a function for the
 * action options select
 */
selectActionsToDo.addEventListener("change", async (event) => {
    option = event.target.value;
    var flag = confirm("Are you sure, you want to continue?");
    flag ?
        handleImageOPtions(option) :
        resetView();
});

//#endregion view

//#region dynamic

/**
 * this funtion loads the share images names
 * and then creates an session storage variable
 * containing the same list
 */
async function loadImagesNameList() {
    if (sessionStorage.getItem("imageList") == null) {
        imagesNamesList = await getServerFolderFileList("shared/images");
        sessionStorage.setItem("imageList", JSON.stringify(imagesNamesList));
    } else {
        imagesNamesList = JSON.parse(sessionStorage.getItem("imageList"));
        console.log("imageList allready loadded");
    }
    imagesNamesList.forEach(element => {
        console.log(element);
    });
}

/**
 * this function calls the server to set
 * the banner configuration file
 */
async function changeBannerImage() {
    showPleaseWait();
    await setPageSettings(selectedImageOption);
    resetView();
    hidePleaseWait();
}

/**
 * this function sets functions to the select 
 * images options
 * @param {*} option the option selected
 */
function handleImageOPtions(option) {

    switch (option) {
        case "1":
            changeBannerImage();
            break;
        case "2":
            checkToUploadImage();
            break;
        case "3":
            deleteShareImage();
            break;

        default:
            alert("Option not available");
            resetView();
            break;
    }
}

async function checkToUploadImage() {
    if (inputImage.files.length > 0) {
        showPleaseWait();
        var result = await
        addImageToServer(createFormDataImage("addSharedImage", inputImage.files[0]));
        if (result.success) {
            sessionStorage.removeItem("imageList");
            await loadImagesNameList();
            resetSelectTag(imagesOption);
            loadImagesOptions();
        }
        hidePleaseWait();
        alert(result);
    } else alert("There is not an image to upload");
    resetView();
}

/**
 * this funtion calls the server to delete the
 * image selected from the shared folder
 */
async function deleteShareImage() {
    showPleaseWait();
    var result = await deleteServerFile(selectedImageOption, "shared");
    if (result.success) {
        sessionStorage.removeItem("imageList");
        await loadImagesNameList();
        resetSelectTag(imagesOption);
        loadImagesOptions();
    }
    hidePleaseWait();
    console.log(result);
    resetView();
}


/**
 * loads an objects by taken the 
 * values from the product form
 * @param {*} proccessCase
 * @returns a form data object
 */
function createFormDataImage(proccessCase, file) {
    var name = prompt("Please change image name", file.name);
    formdata = new FormData();
    formdata.append('name', name);
    formdata.append('case', proccessCase);
    formdata.append('inputfile', file);
    return formdata;
}

//#endregion dynamic