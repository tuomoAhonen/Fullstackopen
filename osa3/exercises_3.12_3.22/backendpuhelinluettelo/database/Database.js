const dotenv = require('dotenv');
dotenv.config();
const pgp = require('pg-promise')();

const url = process.env.DBURLWITHPW;
const db = pgp(url);

module.exports = db;