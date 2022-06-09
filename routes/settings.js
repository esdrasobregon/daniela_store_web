const homeRoute = require("./client/home.js");
const contactRoute = require("./client/contact.js");
const aboutRouter = require("./client/about.js");
const loginRouter = require("./login.js");
const storeRouter = require("./client/store.js");
const clientCateRouter = require("./client/categories.js");
const userRoute = require("./admin/user.js");
const prouductRoute = require("./admin/products.js");
const categoryRoute = require("./admin/categories.js");
const purchaseRoute = require("./admin/purchase.js");
const saleRoute = require("./admin/sales.js");
const receiptRoute = require("./admin/receipt.js");
const receiptTypeRoute = require("./admin/receiptType.js");
const conteosRoute = require("./admin/conteos.js");
const profileRoute = require("./admin/profile.js");
const settingsRoute = require("./admin/settings.js");
const filesRoute = require("./admin/files.js");
const downloadsRoute = require("./admin/downloads.js");
const conteos = require("../js/models/conteos.js");


const appRouterSettings = function (app) {
    app.use("/", homeRoute);
    app.use("/pages/contact", contactRoute);
    app.use("/pages/about", aboutRouter);
    app.use("/pages/login", loginRouter);
    app.use("/pages/store", storeRouter);
    app.use("/pages/categories/categories", clientCateRouter);
    app.use("/user", userRoute);
    app.use("/products", prouductRoute);
    app.use("/categories", categoryRoute);
    app.use("/purchase", purchaseRoute);
    app.use("/sale", saleRoute);
    app.use("/receipt", receiptRoute);
    app.use("/receiptType", receiptTypeRoute);
    app.use("/conteos", conteosRoute);
    app.use("/profile", profileRoute);
    app.use("/settings", settingsRoute);
    app.use("/files", filesRoute);
    app.use("/downloads", downloadsRoute);
}

module.exports = {
    appRouterSettings: appRouterSettings
}