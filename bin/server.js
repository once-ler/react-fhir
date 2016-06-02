// use bluebird for Promises
require('babel-runtime/core-js/promise').default = require('bluebird');
require('bluebird').promisifyAll(require('fs-extra'));

import config from '../config';
import server from '../server/main';
import _debug from 'debug';

const debug = _debug('app:bin:server');
const port = config.server_port;
const host = config.server_host;
server.listen(port);

debug(`Server is now running at http://${host}:${port}.`);
