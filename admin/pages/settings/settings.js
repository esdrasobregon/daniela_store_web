window.onload = async function () {
    showPleaseWait();
    await loadImagesNameList();
    await loadDownloadList();
    loadDownloadOptions();
    loadImagesOptions();
    hidePleaseWait();
};