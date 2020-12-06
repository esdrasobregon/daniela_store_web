var linkList = ["pages/home.html", "pages/about.html", "pages/contact.html"];
var titleList = ["item a", "item b", "item c"];

let sidebar = document.querySelector('#header');

linkList.forEach((x,i) => {
  sidebar.insertAdjacentHTML("beforeend",`<a href="${x}"><div>${titleList[i]}</div></a>`)
});