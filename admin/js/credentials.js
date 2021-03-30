// For Firebase JS SDK v7.20.0 and later, measurementId is optional const 
firebaseConfig = {
  apiKey: "AIzaSyAFE3Bgf0HKetXNk8JIi5p67LqjC7b93lo",
  authDomain: "daniela-store.firebaseapp.com",
  databaseURL: "https://daniela-store.firebaseio.com",
  projectId: "daniela-store",
  storageBucket: "daniela-store.appspot.com",
  messagingSenderId: "233633068106",
  appId: "1:233633068106:web:a33e58c8ab8415bbf9a2b3" 
};
 
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
db.settings({ timestampsInSnapshots: true });