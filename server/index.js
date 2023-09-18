require('dotenv').config();
const cors = require('cors');
const express = require('express');
const app = express();
const errorHandlers = require('./handlers/errorHandlers');
app.use(cors('*'));

// On spécifie une limite de taille de body
// une clé redis peut pesée jusqu'à 600MB
// Un document MongoDB sera limité à 16MB
app.use(express.json({ extended: false, limit: '16mb' }));

const router = require('./app/routers');

// Middleware
app.use(router);
//  404
app.use(errorHandlers.notFound);

// * Bonus ; ajouter un middleware d'erreur qui donnera le stack d'erreur en plus du message
// * Si on est en prod on utilise le middleware qui est fait
// * si on est den développemnt, on utilise le middleware fraichement créé

if (app.get('env') === 'development') {
    app.use(errorHandlers.devErrors);
} else {
    app.use(errorHandlers.prodErrors);
}

app.set('base_url', process.env.BASE_URL);
app.set('port', process.env.PORT);

app.listen(app.get('port'), _ => {
    console.log(`${app.get('base_url')}:${app.get('port')}`);
});
