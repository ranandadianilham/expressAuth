let {DataTypes , Sequelize} = require('sequelize');

//let postgresqlConfig = require("../database/pgsql.connection");
const postgresqlSequelize = require("../database/pgsql.connection");

const userSchema =  postgresqlSequelize.postgresqlConnect.define('user',{
  id: {
    field: 'id',
    type: DataTypes.INTEGER,
    primaryKey: true, // Define the id field as primary key
    autoIncrement: true, // Enable auto-increment for the id field
  },
  username: {
    field: 'username',
    type: DataTypes.STRING,
    allowNull: false,
},
email: {
    field: 'email',
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
},
password: {
    field: 'password',
    type: DataTypes.STRING,
    allowNull: false,
},
role: {
  field: 'role',
  type: DataTypes.STRING,
  allowNull: false,
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


async function performBulkInsert(dataToInsert) {
  try {
    // Use the bulkCreate method to insert data into the table
    const insertedRecords = await userSchema.bulkCreate(dataToInsert);

    // The insertedRecords array will contain the inserted records with auto-generated IDs (if applicable)
    console.log('Bulk insert successful!');
    //console.log(insertedRecords);
  } catch (error) {
    console.error('Error performing bulk insert:', error);
  }
}


module.exports = userSchema;  
