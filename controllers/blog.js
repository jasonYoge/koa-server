'use strict';
const fs = require('fs');

const fn_index = function *() {
    this.type = 'application/json';
    this.body = JSON.stringify({
        items: [
            { title: 'XHR', desc: 'This is desc section.', date: 'September 2009', tag: ['javascript', 'node.js']},
            { title: 'XHR', desc: 'This is desc section.', date: 'September 2009', tag: ['javascript', 'node.js']},
            { title: 'XHR', desc: 'This is desc section.', date: 'September 2009', tag: ['javascript', 'node.js']},
            { title: 'XHR', desc: 'This is desc section.', date: 'September 2009', tag: ['javascript', 'node.js']},
            { title: 'XHR', desc: 'This is desc section.', date: 'September 2009', tag: ['javascript', 'node.js']}
        ],
        length: 5
    });
}

module.exports = {
    'GET /bloglist': fn_index
}
