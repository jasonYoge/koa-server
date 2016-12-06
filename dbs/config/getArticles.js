'use strict';
const mongoose = require('mongoose');
const config = require('./config');

module.exports = () => {
    let db = mongoose.connect(config.mongodb);
    require('../models/article.model.js');
    return db;
}
