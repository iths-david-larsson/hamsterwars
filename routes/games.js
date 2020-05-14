const { Router } = require('express');
const router = new Router;
const { db } = require('./../firebase');

//Langa alla tidigare match-object
router.get('/', async (req, res) => {
    let recentGames = [];

    let games = await db
        .collection('games')
        .get();

    games.forEach(game =>
        recentGames.push(game.data())
    );

    res.send(recentGames);
});

//Posta ett nytt match/game-object
router.post('/', async (req, res) => {
    let recentGames = [];

    let games = await db
        .collection('games')
        .get();

    games.forEach(game =>
        recentGames.push(game.data())
    );
    let newId = recentGames.length + 1
    //Formaterar datumet som sätts i databasen
    let date = new Date();
    var dd = String(date.getDate()).padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0');
    var yyyy = date.getFullYear();
    var curHour = date.getHours() > 12 ? date.getHours() - 12 : (date.getHours() < 10 ? "0" + date.getHours() : date.getHours());
    var curMinute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    var curSeconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
    date = 'Date ' + mm + '/' + dd + '/' + yyyy + " - Time: " + curHour + ':' + curMinute + ':' + curSeconds;
    //Skicka till DB
    await db.collection('games').doc(`${newId}`).set(
        {
            id: newId,
            timeStamp: date,
            contestants: req.body.contestants,
            winner: req.body.winner
        }
    )
    res.status(200).send({ msg: "New game added." })
})
module.exports = router;