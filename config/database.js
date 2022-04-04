const { Sequelize, Model, DataTypes } = require('sequelize');
const {database, username, password, host, dialect } = require('../auth')
const db = new Sequelize(database, username, password, {
    host,
    dialect });

module.exports = db