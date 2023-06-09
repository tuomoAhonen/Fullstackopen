const app = require('./app');
const {port} = require('./utils/appconfig');
const {infolog, errorlog} = require('./utils/loggers');

let https;

try {
  https = require('node:https');
  infolog('https enabled');
} catch (err) {
  errorlog('https support is disabled!');
}

app.listen(port, () => infolog(`Server is running on port ${port}`));

//module.exports = app;