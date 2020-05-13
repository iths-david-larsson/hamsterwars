firebase.initializeApp({
    apiKey: "AIzaSyAHFQEHkjdigK1SGrYLAxpKNiEG4j9pmKs",
    authDomain: "hamsterwarsiths.firebaseapp.com",
    databaseURL: "https://hamsterwarsiths.firebaseio.com",
    projectId: "hamsterwarsiths",
    storageBucket: "hamsterwarsiths.appspot.com",
    messagingSenderId: "266291692865",
    appId: "1:266291692865:web:aa5116c7fd62ccd2a98dc0"
});

let storage = firebase.storage();
let imgRef = storage.ref('Hamsters/hamster-2.jpg');
imgRef.getDownloadURL().then(function (url) {
    let dest = document.querySelector('#img');
    dest.src = url;
})
