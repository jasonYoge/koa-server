'use strict';
const koa = require('koa');
const bodyParser = require('koa-bodyparser');
const logger = require('koa-log4js');
const staticServer = require('koa-static');
const cors = require('koa-cors');
const mapping = require('./mapping');
const path = require('path');
const app = koa();

//  use body-parser to get data from body.
app.use(bodyParser());
//  cors.
app.use(cors());
//  use static.
app.use(staticServer(path.resolve(__dirname, './public')));
//  use log4js module to save log info.
app.use(logger({ file: './log/server.log' }));
//  mapping url to defined router.
app.use(mapping());
//  start app.
app.listen(3000, () => {
    console.log('Server is running at port 3000.\n');
});
