'use strict';

const fn_index = function *() {
    this.set('Content-type', 'text/plain');
    this.body = 'index page';
}

module.exports = {
    'GET /': fn_index,
    'GET /index': fn_index
}
