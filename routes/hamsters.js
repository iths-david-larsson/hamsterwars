const { Router } = require('express');
const router = new Router;
const { db } = require('./../firebase');

router.get('/', async (req, res) => {
    let hamstersRef = db.collection('hamsters');
    let query = hamstersRef.get()
        .then(snapshot => {
            if (snapshot.empty) {
                console.log('Nothing to get here');
                return;
            }
            let hamstersToReturn = [];
            snapshot.forEach(doc => {
                hamstersToReturn.push(doc.data());
            });

            res.send(hamstersToReturn)
        })
});
router.get('/random', async (req, res) => {
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
            let randomHamster = hamsters[Math.floor(Math.random() * hamsters.length)];
            res.send(randomHamster)
        })
});


router.get('/:id', async (req, res) => {
    let hamstersRef = db.collection('hamsters');
    let query = hamstersRef.get()
        .then(snapshot => {
            if (snapshot.empty) {
                console.log('Nothing to get here');
                return;
            }
            let hamsterToReturn = [];
            snapshot.forEach(doc => {
                if (doc.data().id == req.params.id) {
                    hamsterToReturn.push(doc.data());
                }
            });
            res.send(hamsterToReturn);
        })
});

router.put('/:id/:result', async (req, res) => {
    try {
        if (req.params.result === "win") {
            let getWinsFromDb = db.collection('hamsters').doc(req.params.id).get();
            let newWinValue = (await getWinsFromDb).data().games + 1
            let getGamesFromDb = db.collection('hamsters').doc(req.params.id).get();
            let newGamesValue = (await getGamesFromDb).data().games + 1
            let hamster = db.collection('hamsters').doc(req.params.id).update({
                wins: newWinValue,
                games: newGamesValue
            });
            res.send({ msg: `Hamster with id:${req.params.id} has been updated in DB.` })
        } else {
            let getDefeatsFromDb = db.collection('hamsters').doc(req.params.id).get();
            let newDefeatsValue = (await getDefeatsFromDb).data().games - 1
            let getGamesFromDb = db.collection('hamsters').doc(req.params.id).get();
            let newGamesValue = (await getGamesFromDb).data().games + 1
            let hamster = db.collection('hamsters').doc(req.params.id).update({
                defeats: newDefeatsValue,
                games: newGamesValue
            });
            res.send({ msg: `Hamster with id:${req.params.id} has been updated in DB.` })
        }
    }
    catch {
        if (err) {
            console.error(err)
        }
    }
});

module.exports = router;