// Point d'entrée de toutes les routes après le /api :

const plantRouter = require('./plant.router');
const authRouter = require('./auth.router');

// ! 1) Créer un objet "routeur" (router) 
const router = require('express').Router();

//! 2) Configurer les routes :
router.get('/', (req, res) => {
    res.send('Bienvenue sur mon API', 200);
});

router.use('/plants', plantRouter);
router.use('/auth', authRouter);

//! 3) Rendre l'objet router exportable :
module.exports = router;
