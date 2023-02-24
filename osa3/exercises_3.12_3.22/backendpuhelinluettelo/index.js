const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
app.use('/static/images', express.static('./public/img'));
app.use(express.json());

// api/index.js <--- Verceliin tarvittava polku, jotta express server toimii
// Listen port tiedot pitää poistaa index.js tiedostosta
// Tarvitaan myös index.js loppuun module.exports = app;
// Lisäksi on hyvä lisätä vercel.json tiedosto projektin juureen, joka sisältää konfiguraatiot.
// Huomioitavaa, tiedostot joita käytetään index.js:ssä ei saa olla projektin juuressaa,
// vaan ne tulee sijoittaa omiin kansioihin niin kuin index.js, jotta niitä voidaan käyttää/hakea

const dataLogger = require('./middlewares/DataLogger');
dataLogger(app);

const router = require('./routes/Router');
router(app);

const unknownEndpoint = require('./middlewares/UnknownEndpoint');
unknownEndpoint(app);

const errorHandler = require('./middlewares/ErrorHandler');
errorHandler(app);

const port = process.env.port || 3001;
app.listen(port, () => console.log(`Server is running on port ${port}`));

//module.exports = app;