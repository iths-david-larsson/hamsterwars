const express = require('express');
const app = express();
require('dotenv').config()

app.use(express.json());
app.use(express.static('./public'));

const assetsRoute = require('./routes/assets')
app.use('/assets', assetsRoute)

const hamstersRoute = require('./routes/hamsters')
app.use('/hamsters', hamstersRoute);

const chartsRoute = require('./routes/charts')
app.use('/charts', chartsRoute);

const gamesRoute = require('./routes/games')
app.use('/games', gamesRoute);

const statsRoute = require('./routes/stats')
app.use('/stats', statsRoute);

app.listen(3000, () => {
    console.log("Hamster server is up, and it's running!")
});