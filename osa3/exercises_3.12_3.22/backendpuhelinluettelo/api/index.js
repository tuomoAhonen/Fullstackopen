const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());
app.use('/static/images', express.static('./public/img'));
const dataLogger = require('../middlewares/DataLogger');
const unknownEndpoint = require('../middlewares/UnknownEndpoint');
const errorHandler = require('../middlewares/ErrorHandler');
const index = require('../controllers/IndexRouter');
const infoRouter = require('../controllers/InfoRouter');
const persons = require('../controllers/PersonsRouter');

// api/index.js <--- Verceliin tarvittava polku, jotta express server toimii
// Listen port tiedot pitää poistaa index.js tiedostosta
// Tarvitaan myös index.js loppuun module.exports = app;
// Lisäksi on hyvä lisätä vercel.json tiedosto projektin juureen, joka sisältää konfiguraatiot.
// Huomioitavaa, tiedostot joita käytetään index.js:ssä ei saa olla projektin juuressaa,
// vaan ne tulee sijoittaa omiin kansioihin niin kuin index.js, jotta niitä voidaan käyttää/hakea

app.use(dataLogger);

index(app);
infoRouter(app);
persons(app);

app.use(unknownEndpoint);
app.use(errorHandler);

module.exports = app;

//const dataLogger = require('./middlewares/DataLogger');
//app.use(dataLogger);

//const unknownEndpoint = require('./middlewares/UnknownEndpoint');
//app.use(unknownEndpoint);

//const errorHandler = require('./middlewares/ErrorHandler');
//app.use(errorHandler);

//const port = process.env.port || 3001;
//app.listen(port, () => console.log(`Server is running on port ${port}`));

//module.exports = app;