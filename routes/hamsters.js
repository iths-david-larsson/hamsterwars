const { Router } = require('express');
const router = new Router;
const { db, storage } = require('./../firebase');
const fs = require('fs')

//Langa alla hamsters som finns
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

            res.status(200).send(hamstersToReturn);
        })
});

//Get random hamster
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
            res.status(200).send(randomHamster)
        })
});

//Hämsta enskild hamster-object
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
            res.status(200).send(hamsterToReturn);
        })
});

//Uppdatera win/defeat och games för hamster i DB
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
            res.status(200).send({ msg: `Hamster with id:${req.params.id} has been updated in DB.` })
        } else {
            let getDefeatsFromDb = db.collection('hamsters').doc(req.params.id).get();
            let newDefeatsValue = (await getDefeatsFromDb).data().games - 1
            let getGamesFromDb = db.collection('hamsters').doc(req.params.id).get();
            let newGamesValue = (await getGamesFromDb).data().games + 1
            let hamster = db.collection('hamsters').doc(req.params.id).update({
                defeats: newDefeatsValue,
                games: newGamesValue
            });
            res.status(200).send({ msg: `Hamster with id:${req.params.id} has been updated in DB.` })
        }
    }
    catch {
        if (err) {
            console.error(err)
        }
    }
});

//Lägg till ny hamster
router.post('/', async (req, res) => {
    //Ta fram nästa unika ID att sätta på det nya hamster-objectet;
    let numberOfHamsters = [];
    let hamsters = await db
        .collection('hamsters')
        .get()

    hamsters.forEach(hamster =>
        numberOfHamsters.push(hamster.data())
    );
    let newId = numberOfHamsters.length + 1
    //Skicka in nya objektet i DB. 
    let data = req.body;

    console.log(data)
    await db.collection('hamsters').doc(`${newId}`).set({
        id: newId,
        name: data.name,
        age: data.age,
        favFood: data.favFood,
        loves: data.loves,
        imgName: data.imgName,
        wins: 0,
        defeats: 0,
        games: 0
    })
    //Skicka tillbaka meddelande och objektet som du precis lagt till.
    let addedObject = await db.collection('hamsters').doc(`${newId}`).get();
    res.status(200).send({
        msg: "hamster added",
        object: addedObject.data()
    })
})

module.exports = router;