var firebaseConfig = {
    apiKey: "AIzaSyB3lwze2vP44bIUoMB7p6LBvNrQKtAKq3Y",
    authDomain: "dance-dance-high-scores.firebaseapp.com",
    databaseURL: "https://dance-dance-high-scores.firebaseio.com",
    projectId: "dance-dance-high-scores",
    storageBucket: "dance-dance-high-scores.appspot.com",
    messagingSenderId: "68670529871",
    appId: "1:68670529871:web:cf36ccd8497b5b84fc653a"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();