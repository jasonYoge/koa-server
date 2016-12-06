'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let articleSchema = new Schema({
    title: String,
    filename: String,
    tags: [String],
    desc: String,
    date: Date
});

module.exports = mongoose.model('article_list', articleSchema);
