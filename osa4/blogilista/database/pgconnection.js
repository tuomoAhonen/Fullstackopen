const { Pool } = require('pg');
require('dotenv').config();

const uri = process.env.DBURI;

const config = {
  connectionString: uri,
  // Beware! The ssl object is overwritten when parsing the connectionString
  /*
  ssl: {
    rejectUnauthorized: true
  }
  */
};

const pool = new Pool(config);

/*
pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});
*/

module.exports = pool;