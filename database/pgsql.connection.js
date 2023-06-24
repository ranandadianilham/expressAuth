const { Sequelize } = require('sequelize');

//const postgresqlConnect = new Sequelize('postgres://postgres:root@localhost:5432/nandasample'); // Example for postgres
const postgresqlConnect = new Sequelize('nandasample', 'postgres', 'root', {
    host: 'localhost',
    port: '5432',
    dialect: 'postgres'
  });
module.exports = { postgresqlConnect };