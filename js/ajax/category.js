//getting all categories
async function getCategories() {
  var cat;
  const Http = new XMLHttpRequest();
  const url = localHost + '/allcategories';
  Http.open("GET", url);
  Http.send();

  Http.onreadystatechange = (e) => {
    cat = Http.responseText;
    console.log(Http.responseText);
    sessionStorage.setItem('categories', cat);
    window.location.href = './pages/categories/categories';
  }
}

