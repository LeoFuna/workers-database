const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user');

// Alteraçao da rota de users para user para seguir o padrao de Api Restful
// app.get('/user', teste1.getUser);
// app.post('/user', teste2);
// app.delete('/user', teste3);
// app.put('/user', teste4);

// Não é o ideal usar o name sendo que temos o id
// Mas para seguir com a definiçao irei manter
router.get('/:name', new UserController().getUser);
// router.get('/user/access', teste5);

module.exports = router;
