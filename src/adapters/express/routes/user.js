const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user');
const authorized = require('../middlewares/authorized');
const privateAccess = require('../middlewares/privateAccess');

// Não é o ideal usar o name sendo que temos o id
// Mas para seguir com a definiçao irei manter em alguns casos garantindo que pelo menos ele seja único

router.use(authorized);

router.get('/:name', new UserController().getUser);
router.get('/', new UserController().getUsers);
router.post('/', new UserController().createUser);
router.delete('/:name', privateAccess, new UserController().deleteUser);
router.put('/:id', privateAccess, new UserController().updateUser);
router.get('/:name/access', new UserController().countUserAccess);

module.exports = router;
