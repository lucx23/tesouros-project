'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

const createSequelizeInstance = () => {
  const connectionUrl = process.env.DATABASE_URL || process.env.MYSQL_URL;

  if (connectionUrl) {
    return new Sequelize(connectionUrl, {
      dialect: 'mysql',
      logging: false,
      dialectOptions: process.env.NODE_ENV === 'production'
        ? {
            ssl: {
              require: true,
              rejectUnauthorized: false,
            },
          }
        : {},
    });
  }

  return new Sequelize(
    process.env.MYSQLDATABASE || config.database,
    process.env.MYSQLUSER || config.username,
    process.env.MYSQLPASSWORD || config.password,
    {
      host: process.env.MYSQLHOST || config.host,
      port: process.env.MYSQLPORT || config.port || 3306,
      dialect: 'mysql',
      logging: false,
    }
  );
};

const sequelize = createSequelizeInstance();

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
