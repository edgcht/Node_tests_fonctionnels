const express = require('express');
const router = express.Router();

const service = require('../../services/v1/user');
const middlewareSecureRoute = require('../../middleware/tokenJwtMiddleware');
const middlewareCheckRole = require('../../middleware/checkRoleMiddleware');

router.get('/:name', middlewareSecureRoute.checkTokenMiddleware, service.getById);

router.get('/', middlewareSecureRoute.checkTokenMiddleware, service.getAll);

router.post('/register', service.register);

router.post('/login', service.login);

router.put('/update/:name', [middlewareSecureRoute.checkTokenMiddleware, middlewareCheckRole.checkRoleAdmin], service.update);

router.delete('/delete/:name', [middlewareSecureRoute.checkTokenMiddleware, middlewareCheckRole.checkRoleAdmin], service.delete);

module.exports = router;