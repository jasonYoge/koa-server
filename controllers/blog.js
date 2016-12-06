'use strict';
const mongoose = require('mongoose');

const fn_index = function *() {
    this.type = 'application/json';
    //  open database connection
    const db = require('../dbs/config/getArticles')();
    const Articles = mongoose.model('article_list');
    this.body = yield Articles.find({});
    //  close database connection
    db.disconnect();
}

module.exports = {
    'GET /bloglist': fn_index
}
