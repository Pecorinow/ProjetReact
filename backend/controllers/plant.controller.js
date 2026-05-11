const {Request, Response} = require('express');

const plantService = require ('../services/plant.service');

const plantController = {
    /**
     * @param {Request} req 
     * @param {Response} res
     */
    getAll : async(req, res) => {
        
        const query = req.query;
        console.log(query);

        try {
            const plants = await plantService.find(query);
            res.status(200).json(plants);
        } catch(err) {
            console.log(err);
            // Le controller reçoit l'erreur envoyée par le service => renvoie une réponse HTTP au client (le front) :
            res.status(500).json( {statusCode : 500,
                message : "Erreur avec la DB 😬"});
        }
    },

    /**
     * @param {Request} req 
     * @param {Response} res
     */
    getById : async(req, res) => {
        
        const id = req.params.id;

        try {
            const plant = await plantService.findById(id);

            // Si plant est undefined ou null = si l'id recherché n'existe pas :
            if (!plant) {
                res.status(404).json( { statusCode : 404, message : "Plante introuvable"})
            } 
            // Si l'id existe, on renvoie la plante :
            else {
                res.status(200).json(plant);
            }

        } catch(err) {
            console.log(err);
            res.status(500).json( {statusCode : 500,
                message : "Erreur avec la DB 😬"});
        }
    }
}

module.exports = plantController;