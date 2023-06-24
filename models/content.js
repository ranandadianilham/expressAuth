let { DataTypes, Sequelize } = require('sequelize');

//let postgresqlConfig = require("../database/pgsql.connection");
const postgresqlSequelize = require("../database/pgsql.connection");

const contentSchema = postgresqlSequelize.postgresqlConnect.define('CONTENT', {
    id: {
        field: 'id',
        type: DataTypes.INTEGER,
        primaryKey: true, // Define the id field as primary key
        autoIncrement: true, // Enable auto-increment for the id field
    },
    title: {
        field: 'title',
        type: DataTypes.STRING
    },
    content: {
        field: 'content',
        type: DataTypes.STRING,
        unique: true,
    },
    videoPath: {
        field: 'videoPath',
        type: DataTypes.STRING,
        unique: true,
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    }, 
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false,
    },
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


module.exports = contentSchema;  