window.onload = async function () {
    showPleaseWait();
    await loadImagesNameList();
    loadImagesOptions();
    hidePleaseWait();
};