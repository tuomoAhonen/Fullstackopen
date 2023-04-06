const {Sequelize} = require('sequelize');
const dburi = require('../database/dbconfig');

const sequelizeConnection = new Sequelize(dburi, {
  /*logging: false,*/
});

module.exports = sequelizeConnection;