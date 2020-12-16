$(function () {
    $('#WAButton').floatingWhatsApp({
      phone: '506+70729796', //WhatsApp Business phone number
      headerTitle: 'Chat with us on WhatsApp!', //Popup Title
      popupMessage: 'Hello, how can we help you?', //Popup Message
      showPopup: true, //Enables popup display
      buttonImage: '<img src="./../shared/images/whatsapp.svg" />', 
      //Button Image
      //headerColor: 'crimson', //Custom header color
      //backgroundColor: 'crimson', //Custom background button color
      position: "right" //Position: left | right
    });
});