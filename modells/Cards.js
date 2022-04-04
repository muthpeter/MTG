const { Sequelize, Model, DataTypes } = require('sequelize');
const db = require('../config/database')

const Cards = db.define('Cards', {

    name: {
      type: Sequelize.STRING
    },
    price: {
      type: Sequelize.STRING
    }
  },
  );
  

  module.exports = Cards