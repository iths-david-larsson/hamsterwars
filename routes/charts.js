const { Router } = require('express');
const router = new Router;
const { db } = require('./../firebase');



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
            console.log(sortedHamsters)
            let topFive = [];
            for (i = 0; i < 5; i++) {
                topFive.push(sortedHamsters[i])
            }
            res.send(topFive)
        })
})

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
            console.log(sortedHamsters)
            let lastFive = [];
            for (i = 0; i < 5; i++) {
                lastFive.push(sortedHamsters[i])
            }
            res.send(lastFive)
        })
})
module.exports = router;