const { Sequelize, Model, DataTypes } = require('sequelize');
const db = require('../config/database')

const Targets = db.define('Targets', {

    name: {
      type: Sequelize.STRING
    },
    price: {
      type: Sequelize.STRING
    }
  },
  );
  

  module.exports = Targets