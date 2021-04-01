var shortcutDiv = document.createElement("div");
shortcutDiv.setAttribute("style", "display: none");
var aWebShortCut = document.createElement("a");
aWebShortCut.setAttribute("href", localHost);
var iconDiv = document.createElement("div");
iconDiv.setAttribute("style", "background-image:url(" + window.rootFile + "/shared/images/homebanne.jpeg);width:32px;height:32px;");
var titleShortCutDiv = document.createElement("div");
titleShortCutDiv.innerHTML = localHost;
aWebShortCut.appendChild(iconDiv);
aWebShortCut.appendChild(titleShortCutDiv);
var pMessage = document.createElement("p");

pMessage.innerHTML = createShortCutMessage;
var pTitleMessage = document.createElement("p");
pTitleMessage.setAttribute("class", "text-primary");
pTitleMessage.setAttribute("style", "text-decoration: underline;")
pTitleMessage.innerHTML = createShortCutTitle;
shortcutDiv.appendChild(pMessage);
shortcutDiv.appendChild(aWebShortCut);
document.getElementById("shortcutDiv").appendChild(pTitleMessage);
document.getElementById("shortcutDiv").appendChild(shortcutDiv);
pTitleMessage.addEventListener('click', (e) => {
    e.stopPropagation();
    if (shortcutDiv.style.display === "none") {
        shortcutDiv.style.display = "block";
    } else {
        shortcutDiv.style.display = "none";
    }
});