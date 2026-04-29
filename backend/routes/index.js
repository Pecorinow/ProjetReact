// Point d'entrée de toutes les routes :

// ! 1) Créer un objet "routeur" (router) 
const router = require('express').Router();

//! 2) Configurer les routes :
router.get('/', (req, res) => {
    res.send('Bienvenue sur mon API', 200);
});

//! 3) Rendre l'objet router exportable :
module.exports = router;
