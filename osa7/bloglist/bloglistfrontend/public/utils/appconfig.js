require('dotenv').config();

const port = process.env.PORT;
const nodeEnvironment = process.env.NODE_ENV;
const secret = process.env.SECRET;

module.exports = {port, nodeEnvironment, secret};