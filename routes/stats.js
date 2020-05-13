const { Router } = require('express');
const router = new Router;
const { db } = require('./../firebase');

router.get('/', async (req, res) => {
    let recentGames = [];

    let games = await db
        .collection('games')
        .get()

    games.forEach(game =>
        recentGames.push(game.data())
    );
    let numberOfGames = recentGames.length

    res.send({ msg: `There are currently ${numberOfGames} games played.` });
});







module.exports = router;