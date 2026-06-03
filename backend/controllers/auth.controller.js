const authService = require('../services/auth.service');
const jwtUtils = require('../utils/jwt.utils');

const authController = {
    register : async(req, res) => {
        try {
            //* Récupérer le body de la request et en faire une variable :
            const userToAdd = req.body;

            //* Vérifier si l'email de userToAdd est unique via le service :
            if (await authService.emailAlreadyExists(userToAdd.email)) {

                //* Si la condition est remplie (= si l'email existe déjà) => "early return" :
                return res.status(409).json( {
                    statusCode : 409,
                    message : 'Cet email existe déjà'} )
                    // 409 = une requête n'a pas pu être traitée car elle est en contradiction avec l'état actuel de la ressource cible sur le serveur (ex : la ressource existe déjà).
                //* Early return = 
                //  - retourne du code (ici 409)
                //  - puis sort tôt de la fonction quand une condition particulière est remplie, sans avoir besoin d'un else, et empêche ce qui suit (ici, const userCreated = ... ) de s'exécuter.
            }

            //* Créer le nouvel utilisateur via le service, à partir du body userToAdd :
            const userCreated = await authService.create(userToAdd);

            //* Réponse :
            res.location(`/api/user/${userCreated._id}`);
            res.status(201).json({
                id : userCreated._id,
                firstname : userCreated.firstname,
                lastname : userCreated.lastname
            })

        } catch(err) {
        console.log(err);
        res.sendStatus(500);
    } 
    },

    login : async(req, res) => {
        try {
            //* Récupérer le body de la request et en faire une variable :
            const credentials = req.body;

            //* Tenter de trouver en DB l'utilisateur qui correspond à ces données, via le service :
            const userFound = await authService.findByCredential(credentials);

            //* Si pas d'utilisateur trouvé, on fait un "early return" :
            if(!userFound) {
                return res.status(401).json({statusCode : 401, message : 'Les informations de connexion sont erronées.'})
            } else {
                //* Si utilisateur trouvé, on lui génère un token via jwtUtils :
                const token = await jwtUtils.generate(userFound);
                    // La fonction generate est importée de jwt.utils.js.
                    // Si ça plante, on est renvoyé au catch(err) direct, si ça réussit on continue ici-en-dessous.
                //* ...et on renvoie des infos de l'utilisateur + le token :
                res.status(200).json({
                    id : userFound._id,
                    firstname : userFound.firstname,
                    lastname : userFound.lastname,
                    token : token // ou juste token
                })
            }

        } catch(err) {
            console.log(err);
            
            res.sendStatus(500);
        }
    }
};

module.exports = authController;