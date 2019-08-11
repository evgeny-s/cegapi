const express = require('express');

const {
  userController,
  roleController,
  weatherController,
} = require('../controllers');

const router = express.Router();

router.get('/users', userController.get);
router.post('/users', userController.create);
router.put('/users/:id', userController.update);
router.delete('/users/:id', userController.delete);
router.post('/users/:id/assignRole/:roleId', userController.assign);

router.get('/roles', roleController.get);
router.post('/roles', roleController.create);
router.put('/roles/:id', roleController.update);
router.delete('/roles/:id', roleController.delete);

router.get('/weather/current', weatherController.current);

module.exports = router;
