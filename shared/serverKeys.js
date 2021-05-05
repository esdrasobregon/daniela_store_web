﻿const user = require("../js/user")

var key = {
    webSiteName: "My store",
    footerMenuText: "Opciones",
    headerMenuText: "Opciones",
    btnContactText: "Contactanos",
    btnSaveLabel: "Guardar",
    btnShowFormabel: "Abrir formulario",
    btnCloseLabel: "Cerrar",
    uploadedImageMessage: "Imagen cargada",
    registerUploadedMessage: "Registro creado",
    registerUpdatedMessage: "Registro actualizado",
    sendEmailMessage: "Enviar un correo",
    notEmailFormForMobiles: "Formulario de correo no está disponible",
    enterNameForEmal: "Su nombre por favor",
    enterCommentForEmal: "Tu comentario",
    btnSendForEmailText: "Enviar",
    greetings: "Bienvenido",
    credentialsErrorMessage: "Sus credenciales no son correctos",
    wellcomeUser: "Bienvenido ",
    loginOut: "Salir",
    adminMenuText: "Admini",
    aAdminProductsMenu: "Productos",
    aAdminCategoriesMenu: "Categorías",
    categoryListH1: "Lista de categorías",
    productAdminPage: "Productos",
    categoryAdminPage: "Categoría",
    productListH1: "Lista de productos",
    hideAndShowButtonMessage: "Mostrar formulario",
    addUpdateProducts: "Agregar/actualizar productos",
    addUpdateCategory: "Agregar/actualizar categories",
    btnResetFormText: "Resetear formulario",
    categoryListH1: "Lista de categorías",
    placeHolderProductName: "Nombre producto",
    placeHolderProductPrice: "Precio",
    placeHolderProductDescription: "Descripción",
    selectProductCategoryMessage: "Seleccionar categoría",
    showProductPriceMessage: "Mostrar precio",
    creationdateMessage: "Fecha de creación",
    lastModificationMessage: "Última modificación",
    productStateMessage: "Estado del producto",
    btnProductPormSubmit: "Cargar",
    placeHolderCategoryDescription: "Descripción",
    categoryStateLabelMessage: "Estado de categoría",
    submitCategoryForm: "Cargar",
    addPurchaseHeaderLabel: "Agregar una compra de",
    purchaseRecieptLabel: "Factura",
    purchaseUnitPriceLabel: "Pricio unitario",
    purchaseTottalUnitsLabel: "Total de unidades",
    purchaseDescriptionLabel: "Descripción de la compra",
    purchaseCreationDateLabel: "Fecha de creación",
    purchaseModificationDateLabel: "Última modificación",
    btnPurchaseSubmit: "Guardar",
    purchasePageHeader: "Agregar una compra de",
    createShortCutMessage: "Arrastra esta imagen al escritorio o a la marca de libro para crear un acceso directo",
    createShortCutTitle: "Crear un acceso directo para My store",
}
var pagesNames = {
    aloginText: "Ingresar",
    homeText: "Inicio",
    aboutText: "Acerca de nosotros",
    contactText: "Contactanos",
    storeText: "Tienda",
    adminProductText: "Administrar productos",
    adminCategoriesText: "Administrar categorías",
    adminPurchaseText: "Administrar compras"
}
var currentUser = null;
//new from the 85 line on
module.exports = {
    key: key,
    pagesNames: pagesNames,
    currentUser: currentUser
}