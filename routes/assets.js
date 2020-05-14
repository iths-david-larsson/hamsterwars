const { Router } = require('express');
const router = new Router;
const { db, storage } = require('./../firebase');
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


// Downloads IMG from storage
router.get('/:imgname', async (req, res) => {
    let imgFromStorage = await storage.bucket().file(`Hamsters/${req.params.imgname}`).download();
    let img = Buffer.concat(imgFromStorage);
    res.send(img);
})



module.exports = router;