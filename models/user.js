let {DataTypes , Sequelize} = require('sequelize');

//let postgresqlConfig = require("../database/pgsql.connection");
const postgresqlSequelize = require("../database/pgsql.connection");

const userSchema =  postgresqlSequelize.postgresqlConnect.define('USER',{
  id: {
    field: 'id',
    type: DataTypes.INTEGER,
    primaryKey: true, // Define the id field as primary key
    autoIncrement: true, // Enable auto-increment for the id field
  },
  username: {
    field: 'username',
    type: DataTypes.STRING
},
email: {
    field: 'email',
    type: DataTypes.STRING,
    unique: true,
},
password: {
    field: 'password',
    type: DataTypes.STRING
},
role: {
  field: 'role',
  type: DataTypes.STRING
}
}, {
  timestamps: true,
});

(async () => {
  try {
    await postgresqlSequelize.postgresqlConnect.sync({ alter: true });
    console.log('Table is created or altered if necessary');
  } catch (error) {
    console.error('Error creating or altering table:', error);
  }
})();


module.exports = userSchema;  
