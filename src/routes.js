const { Router } = require('express');

const artisanController = require('./controllers/artisanController');
const searchController = require('./controllers/searchController');
const emailController = require('./controllers/emailController');
const regionController = require('./controllers/regionController');

const routes = Router();

routes.get('/artisan', artisanController.index);
routes.post('/artisan', artisanController.store);
routes.get('/search', searchController.index); 
routes.post('/email', emailController.index);
routes.get('/region/:city', regionController.index);
routes.get('/products', searchController.distinctProducts);
routes.get('/aproveAll', artisanController.aproveAll);

module.exports = routes;