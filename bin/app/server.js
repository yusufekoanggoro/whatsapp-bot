const restify = require('restify');
const project = require('../../package.json');
const wrapper = require('../helpers/utils/wrapper');
const basicAuth = require('../auth/basic_auth_helper');
const corsMiddleware = require('restify-cors-middleware');
const sockets = require('../infrastructure/socket.io/connection');

function AppServer () {
  this.server = restify.createServer({
    name: `${project.name}-server`,
    version: project.version
  });

  this.server.serverKey = '';
  this.server.use(restify.plugins.acceptParser(this.server.acceptable));
  this.server.use(restify.plugins.queryParser());
  this.server.use(restify.plugins.bodyParser({ requestBodyOnGet: true }));
  this.server.use(restify.plugins.authorizationParser());
  // required for CORS configuration
  const corsConfig = corsMiddleware({
    preflightMaxAge: 5,
    origins: ['*'],
    // ['*'] -> to expose all header, any type header will be allow to access
    // X-Requested-With,content-type,GET, POST, PUT, PATCH, DELETE, OPTIONS -> header type
    allowHeaders: ['Authorization'],
    exposeHeaders: ['Authorization']
  });
  this.server.pre(corsConfig.preflight);
  this.server.use(corsConfig.actual);

  // required for basic auth
  this.server.use(basicAuth.init());

  // anonymous can access the end point, place code bellow
  this.server.get('/', (req, res) => {
    wrapper.response(res, 'success', wrapper.data('Index'), 'This service is running properly');
  });

  /*
    ====================
        Add new route
    ====================
  */
 

  sockets.init(this.server);
}

module.exports = AppServer;
