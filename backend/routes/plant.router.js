const plantRouter = require('express').Router();

const plantController = require('../controllers/plant.controller');

// toutes les plantes :
plantRouter.route('/')
    .get(plantController.getAll)
    // .post(plantController.insert)

plantRouter.route('/:id')
    .get(plantController.getById)
//     .put(plantController.update)
//     .delete(plantController.delete)
//     .patch(plantController.updatedStatus)

// plantRouter.route('/user/:id')

module.exports = plantRouter;