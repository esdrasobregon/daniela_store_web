//categories settings
categories.forEach(category => {
    if(category.status == 1){
        var productcount = prods.find((element) => element.category == category.idCategory );
        if(productcount != null){
            var storeLink = '../' +'store.html?id=' + category.idCategory;
            var catIdText = category.idCategory;
            var catDescriptions = createCustomNonTextTag('div', 'row clearfix');
            catDescriptions.setAttribute('style', 'margin: 20px');
            var desc = createCustomTextTag('p', 'row clearfix', category.description);
            catDescriptions.appendChild(desc);
            var categoryCol = createCustomNonTextTag('div', 'row clearfix');
            categoryCol.setAttribute('id', catIdText);
            categoryCol.style.marginLeft = "5px";
            categoryCol.style.marginRight = "5px";
            categoryCol.style.marginTop = "10px";
            categoryCol.style.marginBottom = "10px";
            var headder = createCustomNonTextTag('h3', 'text-info');
            var anchor = createCustomAnchor(category.name, storeLink, 'text-info');
            anchor.setAttribute('style', 'margin: 20px');
            headder.appendChild(anchor);
            var imgDiv = createCustomNonTextTag('div', 'd-md-flex');
            var imgScroll = createCustomNonTextTag('div', 'overflow-auto p-3 mb-3 mb-md-0 mr-md-3 bg-light');
            var img = createImgTag('img-fluid', url+category.idCategory+urlPlus);
            imgScroll.appendChild(img);
            imgScroll.setAttribute('style', 'max-width: 800px; max-height: 350px;');
            imgDiv.appendChild(imgScroll);
            //categoryCol.appendChild(headder);
            appendChildListTag([ headder, catDescriptions, imgDiv], document.getElementById('category-container'));
            $('#category-container').append(categoryCol);
        } 
        
    }
});