const { Sequelize } = require('sequelize');
require('dotenv').config()

const postgresqlConnect = new Sequelize(process.env.postgresql_database, process.env.postgresql_user, process.env.postgresql_password, {
    host: process.env.postgresql_host,
    port: process.env.postgresql_port,
    dialect: 'postgres'
  });
  
module.exports = { postgresqlConnect };