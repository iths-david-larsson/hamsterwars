const { Router } = require('express');
const router = new Router;
const { db } = require('./../firebase');


//Langa topp-listan över vinster
router.get('/top', async (req, res) => {
    let hamstersRef = db.collection('hamsters');
    let query = hamstersRef.get()
        .then(snapshot => {
            if (snapshot.empty) {
                console.log('Nothing to get here');
                return;
            }
            let hamsters = [];
            snapshot.forEach(doc => {
                hamsters.push(doc.data());
            });

            let sortedHamsters = hamsters.sort(function (a, b) {
                return b.wins - a.wins
            })

            let topFive = [];
            for (i = 0; i < 5; i++) {
                topFive.push(sortedHamsters[i])
            }
            res.status(200).send(topFive)
        })
})

//Langa topp-listan över mest defeats 
router.get('/bottom', async (req, res) => {
    let hamstersRef = db.collection('hamsters');
    let query = hamstersRef.get()
        .then(snapshot => {
            if (snapshot.empty) {
                console.log('Nothing to get here');
                return;
            }
            let hamsters = [];
            snapshot.forEach(doc => {
                hamsters.push(doc.data());
            });

            let sortedHamsters = hamsters.sort(function (a, b) {
                return b.defeats - a.defeats
            })

            let lastFive = [];
            for (i = 0; i < 5; i++) {
                lastFive.push(sortedHamsters[i])
            }
            res.status(200).send(lastFive)
        })
})
module.exports = router;