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