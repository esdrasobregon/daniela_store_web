//#region variables
const downloadActionsToDo = document.getElementById("downloadActionToDo");
const formDownload = document.getElementById("download-form");
var imagesNamesList = [];
var downloadOption = document.getElementById("downloadOptions");
var downloadList = [];
var selectedDownloadOption = null;
var donwloadImageVisor = document.getElementById("fileToDownload");

//#endregion variables

//#region view

/**
 * this function resets the client view.
 * Use it after make chages
 */
function resetDonwloadView() {
    downloadActionsToDo.selectedIndex = 0;
    donwloadImageVisor.setAttribute("src", "#");
    inputImage.value = "";
}

downloadOption.addEventListener('change', async (event) => {
    console.log(`You like ${event.target.value}`);
    selectedDownloadOption = event.target.value;
    showImage(donwloadImageVisor, "./downloads/" + selectedDownloadOption);
});

/**
 * this function fills the select download 
 * files options in the view
 */
function loadDownloadOptions() {
    downloadList.length > 0 ?
        selectedDownloadOption = downloadList[0] :
        console.log("no image options");
    downloadList.forEach(element => {
        var opt = document.createElement("option");
        opt.innerHTML = element;
        opt.value = element;
        downloadOption.appendChild(opt);
    });
}

//#endregion view

//#region dynamic

/**
 * this function sets the sellected file to be donwloaded
 * @param {*} fileName the file to be downloaded
 */
function download(fileName) {
    var element = document.createElement('a');
    element.setAttribute('href', "../../../downloads/" + fileName);
    //document.body.appendChild(element);
    element.setAttribute("role", "button");
    element.setAttribute("download", fileName);
    element.setAttribute("class", "btn btn-danger");
    element.click();
    resetDonwloadView();
}

/**
 * this function calls the server to get the 
 * available files to be donwloaded
 */
async function loadDownloadList() {
    if (sessionStorage.getItem("downloadList") == null) {
        downloadList = await getServerFolderFileList("downloads");
        sessionStorage.setItem("downloadList", JSON.stringify(downloadList));
    } else {
        downloadList = JSON.parse(sessionStorage.getItem("downloadList"));
        console.log("download allready loadded");
    }
    downloadList.forEach(element => {
        console.log(element);
    });
}

downloadActionsToDo.addEventListener("change", async (event) => {
    option = event.target.value;
    var flag = confirm("Are you sure, you want to continue?");
    flag ?
        handleDownloadOptions(option) :
        resetDonwloadView();
});
async function uploadFile() {
    var flag = confirm("are you sure you want to continue?");
    if (flag) {
        var file = formDownload.inputDownload.files[0];
        if (file != null) {
            showPleaseWait();
            var formdata = createFormDataImage("addDownloadFile", file);
            var result = await addImageToServer(formdata);
            if (result.success) {
                sessionStorage.removeItem("downloadList");
                await loadDownloadList();
                resetSelectTag(downloadOption);
                loadDownloadOptions();
            }
            resetDonwloadView();
            hidePleaseWait();
        } else {
            console.log("there is not file to upload");
        };
    } else {
        console.log("process aborted");
    }
}

/**
 * this funtion calls the server to delete the
 * image selected from the shared folder
 */
async function deleteDownloadFile() {
    showPleaseWait();
    var result = await deleteServerFile(selectedDownloadOption, "downloads");
    if (result.success) {
        sessionStorage.removeItem("downloadList");
        await loadDownloadList();
        resetSelectTag(downloadOption);
        loadDownloadOptions();
        resetDonwloadView();
    }
    hidePleaseWait();
    console.log(result);
    resetDonwloadView();
}

function handleDownloadOptions(option) {

    switch (option) {
        case "1":
            console.log("option " + option);
            selectedDownloadOption == null ?
                alert("not file to download") :
                download(selectedDownloadOption);
            break;
        case "2":
            console.log("option " + option);
            uploadFile();
            break;
        case "3":
            console.log("option " + option);
            deleteDownloadFile();
            break;

        default:
            alert("Option not available");
            break;
    }
}

//#endregion dynamic