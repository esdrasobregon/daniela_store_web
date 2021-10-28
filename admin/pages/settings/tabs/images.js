const selectActionsToDo = document.getElementById("actionsToDo");
var selectedImageOption = null;
var imagesNameList = [];
var imagesOption = document.getElementById("ImagesOptions");
var inputImage = document.getElementById("inputGroupFile01");
var imageVisor = document.getElementById("imageFirebase");
var imageForm = document.getElementById("add-images-form");

async function loadImagesNameList() {
    if (sessionStorage.getItem("imageList") == null) {
        imagesNameList = await getServerFolderFileList("shared/images");
        sessionStorage.setItem("imageList", JSON.stringify(imagesNameList));
        addImageOptionsEventListener();
    } else {
        imagesNameList = JSON.parse(sessionStorage.getItem("imageList"));
        console.log("imageList allready loadded");
        addImageOptionsEventListener();
    }
    imagesNameList.forEach(element => {
        console.log(element);
    });
}

function loadImagesOptions() {
    imagesNameList.length > 0 ?
        selectedImageOption = imagesNameList[0] :
        console.log("no image options");
    imagesNameList.forEach(element => {
        var opt = document.createElement("option");
        opt.innerHTML = element;
        opt.value = element;
        imagesOption.appendChild(opt);
    });
}

function showImage(image) {
    imageVisor
        .setAttribute("src", "../../../shared/images/" + image);
}

function addImageOptionsEventListener() {
    imagesOption.addEventListener('change', async (event) => {
        console.log(`You like ${event.target.value}`);
        selectedImageOption = event.target.value;
        showImage(selectedImageOption);
    });
}

async function changeBannerImage() {
    showPleaseWait();
    await writeFile(selectedImageOption);
    resetView();
    hidePleaseWait();
}

selectActionsToDo.addEventListener("change", async (event) => {
    option = event.target.value;
    var flag = confirm("Are you sure, you want to continue?");
    flag ?
        handleImageOPtions(option) :
        resetView();
});

function handleImageOPtions(option) {

    switch (option) {
        case "1":
            changeBannerImage();
            break;
        case "2":
            checkToUploadImage();
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
        var result = await addImageToServer(createFormDataImage());

        if (result.success) {
            sessionStorage.removeItem("imageList");
            await loadImagesNameList();
            resetImageOptions();
            loadImagesOptions();
        }
        hidePleaseWait();
        alert(result);
    } else alert("There is not an image to upload");
    resetView();
}

function resetView() {
    selectActionsToDo.selectedIndex = 0;
    imageVisor.setAttribute("src", "#");
    inputImage.value = "";
}

function resetImageOptions() {
    while (imagesOption.length > 0) {
        imagesOption.remove(0)
    }
}

/**
 * loads an objects by taken the 
 * values from the product form
 * @returns a form data object
 */
function createFormDataImage() {
    var name = prompt("Please change image name", inputImage.files[0].name);
    formdata = new FormData();
    formdata.append('name', name);
    formdata.append('case', "addSharedImage");
    formdata.append('inputfile', inputImage.files[0]);
    return formdata;
}