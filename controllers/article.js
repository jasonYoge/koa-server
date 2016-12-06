'use strict';
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

const fn_article = function *(next) {
    const id = this.params.id;
    const db = require('../dbs/config/getArticles')();
    const Articles = mongoose.model('article_list');
    let doc;
    try {
        doc = yield Articles.findById(id);
    } catch (e) {
        this.body = 'Not found.';
        db.disconnect();
        return;
    }
    const filepath = path.resolve(__dirname, '../public/articles/', doc.filename);

    let exist = fs.existsSync(filepath);
    if (exist) {
        let rs = fs.createReadStream(filepath);
        this.type = 'text/plain';
        this.body = rs;
    } else {
        this.body = 'Not found.';
    }
    db.disconnect();
}

module.exports = {
    'GET /article/:id': fn_article
}
