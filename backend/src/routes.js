const express = require('express');
const routes = express.Router();
const ongController = require('./controllers/ongController');
const incidentController = require('./controllers/incidentController');
const ProfileController = require('./controllers/ProfilleController');
const SessionController = require('./controllers/SessionController');

routes.post('/sessions', SessionController.create)

routes.get('/ongs', ongController.index);
routes.post('/ongs', ongController.create);

routes.get('/incidents', incidentController.index);
routes.post('/incidents', incidentController.create);
routes.delete('/incidents/:id', incidentController.delete);


routes.get('/profile', ProfileController.index);


module.exports = routes;