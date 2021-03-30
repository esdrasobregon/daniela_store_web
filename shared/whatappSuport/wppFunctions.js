var ImageWhats = document.createElement("img");
  ImageWhats.setAttribute("src", window.rootFile + "/shared/images/whatsapp.svg");
  
$(function () {
  $('#WAButton').floatingWhatsApp({
    phone: whatsAppNumber, //WhatsApp Business phone number
    headerTitle: whatsappTitleMessage, //Popup Title
    popupMessage: popupMessageText, //Popup Message
    showPopup: true, //Enables popup display
    buttonImage: ImageWhats,
    //Button Image
    //headerColor: 'crimson', //Custom header color
    //backgroundColor: 'crimson', //Custom background button color
    position: "right" //Position: left | right
  });
});