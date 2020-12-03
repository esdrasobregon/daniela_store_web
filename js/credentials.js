// For Firebase JS SDK v7.20.0 and later, measurementId is optional const 
firebaseConfig = {
  apikey : "AIzaSyCibjmmD8yvLi5vrH9tS6Y7ALAX3ndTzBw" ,   
  authDomain : "daniela-store-a5654.firebaseapp.com" ,   
  projectId : "daniela-store-a5654" ,
  storageBucket : "daniela-store-a5654.appspot.com" ,   
  messagingSenderId : "770307470724" ,   
  appId : "1: 770307470724: web: 34765deae97865e8df19d1" ,   
  measurementId : "G-FQ2WZMXXWD" 
};
 
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
db.settings({ timestampsInSnapshots: true });