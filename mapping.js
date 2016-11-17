'use strict';
const fs = require('fs');
const path = require('path');
/**
 *  Add router mapping
 *  @param {Object} router 'router in koa'
 *  @param {Object} mapping 'controller objects'
 *  @return null
 */
function addMapping (router, mapping) {
    for (var url in mapping) {
        if (url.startsWith('GET')) {
            let path = url.substring(4);
            router.get(path, mapping[url]);
        } else if (url.startsWith('POST')) {
            let path = url.substring(5);
            router.post(path, mapping[url]);
        } else {
            throw new Error(`Invalid URL: ${url}`);
        }
    }
}
/**
 *  Get controllers from './controllers'
 *  @param {Object} router 'router in koa'
 *  @return null
 */
function addControllers (router, dir) {
    const files = fs.readdirSync(path.resolve(__dirname, dir));
    const js = files.filter((file) => {
        return file.endsWith('.js');
    });

    for (let file of js) {
        let mapping = require(path.resolve(__dirname, dir, file));
        addMapping(router, mapping);
    }
}
//  export middleware
module.exports = function (dir) {
    let controllers_dir = dir || './controllers';
    let router = require('koa-router')();
    addControllers(router, controllers_dir);
    return router.routes();
}
