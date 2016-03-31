var authController = require('./controllers/authController');
var userController = require('./controllers/userController');
var trabajoController = require('./controllers/trabajoController');

exports.endpoints = [{method: 'GET', path: '/', config: {handler: function(request, reply){reply('API v1, Trabajos')}}},
	{method: 'GET', path: '/v1/trabajos', config: trabajoController.getTrabajos},
  {method: 'GET', path: '/v1/trabajo', config: trabajoController.getTrabajo}
  {method: 'POST', path: '/v1/trabajo', config: trabajoController.createTrabajo},
	{method: 'DELETE', path: '/v1/deleterRegalo/{title}', config: trabajoController.deleteTrabajo},
	{method: 'POST', path: '/v1/modificarRegalo/{title}', config: trabajoController.updateTrabajo},

	{method: 'POST', path: '/v1/register', config: userController.createUser},
  {method: 'DELETE', path: '/v1/deleteuser', config: userController.deleteuser},
	{method: 'POST', path: '/v1/login', config: authController.login},
	{method: 'GET', path: '/v1/logout', config: authController.logout}
];
