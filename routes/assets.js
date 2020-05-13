const { Router } = require('express');
const router = new Router;
const { db } = require('./../firebase');
const fs = require('fs');

//Hämta datan från data.json och ladda upp det i databasen
////////////////////////////////////////////////////////////////
// fs.readFile('./data.json', 'utf-8', (err, data) => {
//     let parseData = JSON.parse(data);
//     for (let hamster of parseData) {
//         db.collection('hamsters').doc(`${hamster.id}`).set(
//             {
//                 id: hamster.id,
//                 name: hamster.name,
//                 age: hamster.age,
//                 favFood: hamster.favFood,
//                 loves: hamster.loves,
//                 imgName: hamster.imgName,
//                 wins: hamster.wins,
//                 defeats: hamster.defeats,
//                 games: hamster.games
//             })
//     }
//     if (err) {
//         console.error(err)
//         return
//     }
// })
////////////////////////////////////////////////////////////////

router.get('/', async (req, res) => {
    let hamstersRef = await db.collection('hamsters');
    let query = hamstersRef.get()
        .then(snapshot => {
            if (snapshot.empty) {
                console.log('Nothing to get here');
                return;
            }

            let assetsToReturn = [];
            snapshot.forEach(doc => {
                assetsToReturn.push(doc.data().imgName);
            });
            res.send(assetsToReturn)
        })
})



module.exports = router;