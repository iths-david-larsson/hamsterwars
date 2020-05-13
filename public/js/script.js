firebase.initializeApp({
    apiKey: process.env.API_KEY,
    authDomain: "hamsterwarsiths.firebaseapp.com",
    databaseURL: process.env.DB_URL,
    projectId: "hamsterwarsiths",
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: "266291692865",
    appId: "1:266291692865:web:aa5116c7fd62ccd2a98dc0"
});

let storage = firebase.storage();
let imgRef = storage.ref('Hamsters/hamster-2.jpg');
imgRef.getDownloadURL().then(function (url) {
    let dest = document.querySelector('#img');
    dest.src = url;
})
