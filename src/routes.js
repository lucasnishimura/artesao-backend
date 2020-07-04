const { Router } = require('express');

const artisanController = require('./controllers/artisanController');
const searchController = require('./controllers/searchController');
const emailController = require('./controllers/emailController');
const regionController = require('./controllers/regionController');
const productsController = require('./controllers/productsController');

const routes = Router();

routes.get('/artisan', artisanController.index); //ok
routes.post('/artisan', artisanController.store); //ok
routes.get('/search', searchController.index); 
routes.post('/email', emailController.index); //ok
routes.get('/region/:city', regionController.index); //ok
routes.get('/products', searchController.distinctProducts); //ok
routes.get('/aproveAll', artisanController.aproveAll); //ok

module.exports = routes;