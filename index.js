const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config()

app.use(cors()); //Förhindra problem med CORS
app.use(express.json());
app.use(express.static('./public'));
//Authorize med API KEY
app.use((req, res, next) => {
    let reqKey = req.headers['authorization'];

    if (req.url === '/') {
        next();

    } else {
        if (reqKey === process.env.API_KEY) {
            console.log('API OK');
            next();
        } else {
            res.status(400).send({ msg: 'API-KEY NOT OK' })
        }
    }
})

//Set routes
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


//Sätt på öronen
app.listen(4000, () => {
    console.log("Hamster server is up, and it's running!")
});