const { combineRouters } = require('../utils');
const root = require('./root');

const routes = combineRouters([root]);

module.exports = routes;
