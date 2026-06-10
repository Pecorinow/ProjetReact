const authenticationMiddleware = require('../middlewares/auth/authentication.middleware');
const gardenController = require('../controllers/garden.controller');
const gardenRouter = require('express').Router();

gardenRouter.route('/')
    .get(authenticationMiddleware(), gardenController.getAll)
    .post(authenticationMiddleware(), gardenController.insert)

gardenRouter.route('/:id')
    .get(authenticationMiddleware(), gardenController.getById)
    .put(authenticationMiddleware(), gardenController.update)
    .delete(authenticationMiddleware(), gardenController.delete)

gardenRouter.route('/:id/plants/:plantId')
    .post(authenticationMiddleware(), gardenController.insertPlant)
    .delete(authenticationMiddleware(), gardenController.removePlant)

module.exports = gardenRouter;