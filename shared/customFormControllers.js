 //customize nav var anchor 
 function createCustomAnchor(anchorText, anchorLink, anchorClass){
    var aTag = document.createElement("a");
    aTag.href = anchorLink;
    aTag.innerHTML = anchorText;
    aTag.setAttribute('class', anchorClass);
    return aTag ;
}
//customize nav bar items
function createCustomVarItem(pClass){
    var item = document.createElement('li');
    item.setAttribute('class', pClass);
    return item;
}

//customize a div tag with class and style
function createDivTagClassStyle(pClass, pStyle){
	var item = document.createElement('div');
    item.setAttribute('class', pClass);
    item.setAttribute('style', pStyle);
    return item;	
}
//customize a img tag
function createImgTag(pClass, pSrc){
	var item = document.createElement('img');
    item.setAttribute('class', pClass);
    item.setAttribute('src', pSrc);
    return item;	
}
//customize a text container tag
function createCustomTextTag(typeTag, pClass, textContent){
    var item = document.createElement(typeTag);
    item.setAttribute('class', pClass);
    item.innerHTML = textContent;
    return item;    
}
//customize a non text container tag
function createCustomNonTextTag(typeTag, pClass){
    var item = document.createElement(typeTag);
    item.setAttribute('class', pClass);
    return item;    
}
//customize a non text container tag
function appendChildListTag(pChildList, mainTag){
    pChildList.forEach(element => mainTag.appendChild(element));    
}

function hideAndShowDiv(elementId) {
  if (elementId.style.display === "none") {
    elementId.style.display = "block";
  } else {
    elementId.style.display = "none";
  }
}
//no leters
function noLetters(evt) {
    if (evt.which < 48 || evt.which > 57)
    {
        evt.preventDefault();
    }
}
function hideAndShowDivFuction(){
    hideAndShowDiv(document.getElementById("container-add-product-form"));
}
function comeBack(){
	window.history.back();
} 
function orderArray(arrayToOrder, parameterToCompare){
    arrayToOrder.sort(function (a, b) {
  if (a.parameterToCompare > b.parameterToCompare) {
    return 1;
  }
  if (a.parameterToCompare < b.parameterToCompare) {
    return -1;
  }
  // a must be equal to b
  return 0;
});
}
function strReplace(pText, pcharsToChage){
    var newStr = pText.replace(pcharsToChage, ' ');
    return newStr;
}