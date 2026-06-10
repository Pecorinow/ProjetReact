const {Request, Response} = require('express');

const gardenService = require('../services/garden.service');

const gardenController = {
    /**
     * 
     * @param {Request} req 
     * @param {Response} res 
     */
    getAll : async(req, res) => {

        const userId = req.user.id;
        //* req.user.id :
        // Pourquoi pas user._id ?
        // Car id = le nom donné à l'id dans jwt.utils.js :
        // Dans jwt.utils.js, on a créé un "playload", qui contient les données du user, id et role : 
            // const playload = {
            //     id : user._id,
            //     role : user.role
            // }
        // Dans authenticationMiddleware, on décode le token reçu avec jwtUtils.decode(token), on met le résultat dans playload et on stocke ce playload dans req.user :
            // req.user = playload;
        // Ici dans garden.controller.js, on accède à req.user.id
        // => id = le nom donné à l'id dans le playload JWT, pas le nom de l'id en DB.
        console.log(userId);

        try {
            const gardens = await gardenService.find(userId);

            const length = gardens.length;
            const dataToSend = {
                length,
                gardens
            }
            // Pourquoi length ?
            // Pour permettre en front de vérifier si le tableau des jardins est vide ou non, dir "Vous avez X jardins", ...

            res.status(200).json(dataToSend);

        } catch(err) {
            console.log(err);
            res.status(500).json( { statusCode : 500, message : 'Erreur avec la DB 🫠'} );
        }
    },
    /**
     * 
     * @param {Request} req 
     * @param {Response} res 
     */
    getById : async(req, res) => {
        const id = req.params.id;

        try {
            const garden = await gardenService.findById(id);

            if (!garden) {
                res.status(404).json( { statusCode : 404, message : "Jardin non-trouvé." } )
            } else {
                res.status(200).json(garden);
            }

        } catch(err) {
            console.log(err);
            res.status(500).json( { statusCode : 500, message : 'Erreur avec la DB 🫠'} );
        }
    },
    /**
     * 
     * @param {Request} req 
     * @param {Response} res 
     */
    insert : async(req, res) => {
        
        const gardenToAdd = req.body;
            // = On crée une variable taskToAdd qui correspond au body de la request ( = aux données du nouveau jardin à ajouter)
        const userId = req.user.id;
        gardenToAdd.user_id = userId;
            // Équivalent de :
            // gardenToAdd.user_id = req.user.id;
            // = Ajoute la propriété user_id à l'objet gardenTo Add (= gardenToAdd.user_id), et cette propriété doit correspondre à l'id du user connecté, récupéré depuis le token via le middleware ( = req.user.id)

       try {
            const insertedGarden = await gardenService.create(gardenToAdd);

            res.location(`/api/gardens/${insertedGarden.id}`);
            res.status(201).json(insertedGarden);
       }
       catch(err) {
            res.sendStatus(500);
       }
    },
    /**
     * 
     * @param {Request} req 
     * @param {Response} res 
     */
    update : async(req, res) => {

        try {
            const id = req.params.id;
            const newData = req.body;

            const updatedGarden = await gardenService.update(id, newData);

            if(!updatedGarden) {
                // = Si updatedGarden vaut false dans le service :
                res.status(404).json({ statusCode: 404, message: "Jardin non trouvé" });
            } else {
            res.sendStatus(200);
                // et non : res.status(200).json(updatedGarden);
                // Car dans le service, updatedGarden retourne true, donc ici ça enverrait juste "true" au front, ce qui n'est pas utile.
                // Et c'est soit sendStatus(200), soit status(200).json(...), mais pas status(200) tout seul :
                // - res.sendStatus(200) : définit le code à renoyer ET envoie la réponse (le code de réussite seul, sans body).
                // - res.status(200).json(...) : définit le code ET envoie la réponse avec un body JSON en plus.
            }

            } catch(err) {
                res.sendStatus(500);
        }
    },

    /**
     * 
     * @param {Request} req 
     * @param {Response} res 
     */
    insertPlant : async(req, res) => {
        try {
            const id = req.params.id;
            const plantId = req.params.plantId;

            const addedPlant = await gardenService.addPlant(id, plantId);

            if (!addedPlant) {
                res.status(404).json({ statusCode: 404, message: "Plante non-trouvée" });
            }
            else {
                res.sendStatus(200);
            }

        } catch(err) {
            res.sendStatus(500);
        }
    },

    removePlant : async(req, res) => {
        try {
            const id = req.params.id;
            const plantId = req.params.plantId;
                // RAPPEL : params = contenu de l'url back, or dans gadenRouter on a défini la route comme '/:id/plants/:plantId' => on appelle chaque param par le nom qu'il porte dans le router !

            const removedPlant = await gardenService.removePlant(id, plantId);

            if (!removedPlant) {
                res.status(404).json({ statusCode: 404, message: "Plante non-trouvée" });
            }
            else {
                res.sendStatus(200);
            }

        } catch(err) {
            res.sendStatus(500);
        }
    },

    /**
     * 
     * @param {Request} req 
     * @param {Response} res 
     */
    delete : async(req, res) => {
        try {
            const id = req.params.id;

            const deletedGarden = await gardenService.delete(id);

            if(!deletedGarden) {
                // = Si deletedGarden vaut false dans le service : 
                res.status(404).json({ statusCode: 404, message: "Jardin non trouvé" });
            } else {

            res.sendStatus(204);
                // et non : res.status(200).json(...);
                // Car on utilise 200 pour les réussites où on a aussi des données à renvoyer.
                // Mais nous ici, on a supprimé une donnée, on ne va pas la renvoyer 
                // => 204 : message de réussite, mais rien d'autre à envoyer.
            }
        } catch(err) {
             res.sendStatus(500);
        }
    }
}

module.exports = gardenController;