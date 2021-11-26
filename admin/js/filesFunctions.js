
/**
 * this function reads a file from any input html tag
 * @param {*} input the input tag where the file is located
 * @param {*} idImageTag the id of the tag to show the image 
 */
function readImageURL(input, idImageTag) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {

            document.getElementById(idImageTag)
            .setAttribute("src", e.target.result);
            document.getElementById(input.id)
                .innerHTML = uploadFileMessage;
        };
        reader.readAsDataURL(input.files[0]);
    }
}
