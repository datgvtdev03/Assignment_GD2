const express = require('express');
const routes = express.Router();

const userController = require('../../controllers/users/userController')

routes.post('/register', userController.registerUser);

module.exports = routes;