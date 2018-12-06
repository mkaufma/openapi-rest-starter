import express from 'express';
import path from 'path';
import logger from 'morgan';
import _ from 'lodash';
import bodyParser from 'body-parser';
import OpenAPIBackend from 'openapi-backend';
import { readdirSync } from 'fs';

let apiDefs = {};

let handlers = {
    validationFail: async (c, req, res) => res.status(400).json({ err: c.validation.errors }),
    notFound: async (c, req, res) => res.status(404).json({ err: 'not found' }),
    notImplemented: async (c, req, res) => {
        const { status, mock } = c.api.mockResponseForOperation(c.operation.operationId);
        return res.status(status).json(mock);
    }
};

readdirSync(`${__dirname}/controllers/`).forEach(file => {
    handlers = _.assignIn(handlers, require(`./controllers/${file}`).default);
});

readdirSync(`${__dirname}/routeSchemas/`).forEach(file => {
    apiDefs = _.merge(apiDefs, require(`./routeSchemas/${file}`));
});

// import petsController from './controllers/pets';
// import validatesSample from './controllers/validatesSample';
//
// // import routes from './routes';
// const validatesOpenApisDefs = require('./routeSchemas/validatesSample.json');
// const petsOpenApisDefs = require('./routeSchemas/pets.json');
//
// apiDefs = _.merge(apiDefs, petsOpenApisDefs);
// apiDefs = _.merge(apiDefs, validatesOpenApisDefs);
//
// handlers = _.assignIn(handlers, petsController);
// handlers = _.assignIn(handlers, validatesSample);

const api = new OpenAPIBackend({
    definition: apiDefs,
    handlers: handlers
});
const app = express();
app.disable('x-powered-by');

// View engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'pug');

app.use(logger('dev', {
  skip: () => app.get('env') === 'test'
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../public')));

// app.use((req, res) => petsApi.handleRequest(req, req, res));
// app.use((req, res) => validatesApi.handleRequest(req, req, res));
app.use((req, res) => api.handleRequest(req, req, res));

// app.use('/', routes);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handler
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  res
    .status(err.status || 500)
    .render('error', {
      message: err.message
    });
});

export default app;
