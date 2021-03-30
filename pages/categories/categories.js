//categories settings

document.title = webSiteName + " categories";
document.getElementById("categoryListH1").innerHTML += categoryListH1;
document.getElementById("webSiteName").innerHTML += webSiteName;


categories.forEach(category => {
    if (category.status == 1) {
        var productcount = prods.find((element) => element.category == category.idCategory);
        if (productcount != null) {
            var storeLink = '../' + 'store.html?id=' + category.idCategory;
            var catIdText = category.idCategory;

            var listCategoryDescription = category.description.split(".");
            var ulCategoryDescription = createCustomNonTextTag("ul", "list-group list-group-flush");
            ulCategoryDescription.appendChild(createCustomTextTag("li", "list-group-item active", categoryDescriptionListTitle));
            listCategoryDescription.forEach((desc) => {
                const l = createCustomTextTag("li", "list-group-item", desc);
                ulCategoryDescription.appendChild(l);
            });

            var catDescriptions = createCustomNonTextTag('div', 'row clearfix');
            catDescriptions.setAttribute('style', 'margin: 20px');
            catDescriptions.appendChild(ulCategoryDescription);
            var categoryCol = createCustomNonTextTag('div', 'card border border-primary');
            categoryCol.setAttribute('id', catIdText);
            categoryCol.setAttribute("style", "margin: 10px");
            var headder = createCustomNonTextTag('h3', 'text-info');
            var anchor = createCustomAnchor(category.name, storeLink, 'text-primary');
            anchor.setAttribute('style', 'margin: 5px');
            headder.appendChild(anchor);
            var showMore = createCustomAnchor(showMoreMessage, storeLink, "text-muted");
            var imgDiv = createCustomNonTextTag('div', 'd-md-flex');
            var imgScroll = createCustomNonTextTag('div', 'overflow-auto p-3 mb-3 mb-md-0 mr-md-3 bg-light');
            var img = createImgTag('img-fluid rounded', url + category.idCategory + urlPlus);
            imgScroll.appendChild(img);
            imgScroll.setAttribute('style', 'max-width: 800px; max-height: 350px;');
            imgDiv.appendChild(imgScroll);
            imgDiv.addEventListener('click', async (e) => {
                e.stopPropagation();
                document.location.href = storeLink;
            });
            catDescriptions.addEventListener('click', async (e) => {
                e.stopPropagation();
                document.location.href = storeLink;
            });
            appendChildListTag([headder, imgDiv, catDescriptions, showMore], document.getElementById('category-container'));
            $('#category-container').append(categoryCol);
        }

    }
});