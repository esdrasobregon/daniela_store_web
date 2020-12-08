//this function upload an image from 
//the local memory to the image tag 
function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#imageFirebase')
            .attr('src', e.target.result)
            .width(100)
            .height(100);
                document.getElementById('inputImage').innerHTML = 'Image upload';
        };
        reader.readAsDataURL(input.files[0]); 
    }
}

//upload images to firestorage
function  uploadImage(imageName)  {
  const ref = firebase.storage().ref();
  const file = document.querySelector("#inputGroupFile01").files[0];
  const name = imageName;
  const metadata = {
    contentType: file.type
  };
  const task = ref.child(name).put(file, metadata).then(snapshot => snapshot.ref.getDownloadURL())
    .then(url => {
       console.log(url);
       document.querySelector("#imageFirebase").src = url;

    }).catch(console.error);
}
