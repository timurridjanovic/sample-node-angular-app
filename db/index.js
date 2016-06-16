'use strict';

var config = require('../config');
var Sequelize = require('sequelize');
var sequelize = new Sequelize(config.db.database, config.db.user, config.db.password, config.db.options);

module.exports = sequelize;
