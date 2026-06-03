//* Ici, création d'un TOKEN :
// Token = "jeton" d'autorisation, qui permet de savoir qui fait une requête et lui donner, ou non, l'autorisation de faire cette requête.
    // Exemple : Pour pouvoir modifier la page insta de Bob, il faut avoir les accès de Bob (mail et password).
// Lors du login, le controller utilise le service pour essayer de trouver l'utilisateur en DB.
// Si il est trouvé, alors un token sera créé dans le contoller via jwtUtils, puis renvoyé au frontend pour qu'il soit stocké dans un Atom jotai.
// À chaque request vers une route protégée, le frontend renvoie le token dans les headers de la request vers le backend.
// Le back vérifie qui fait la request via ce token et donne ou non le droit d'accéder à la route.

    const jwt = require('jsonwebtoken');

    const { JWT_ISSUER, JWT_AUDIENCE, JWT_SECRET } = process.env;

    const jwtUtils = {
    
    generate : (user) => { 
       
        return new Promise( (resolve, reject) => {
            //* 1) Créer un "playload", un objet qui continet certaines données du user, les Claims, qu'on veut cacher dans le token :
            // Attention, pas d'infos sensibles !
            const playload = {
                id : user._id,
                role : user.role // Pour que le Front puisse faire on ne sait-quoi, peut-être des tartes ?🍰
            }

            //* 2) Paramétrer les options pour créer notre token : = comment va être créé le token :
            const options = { // Tout ce qui est dans 'options' vient de la librairie jwt :

                // Choix de l'algo de hashage du token, par défaut HS256 :
                algorithm: 'HS256',
                // Choix dela date d'expiration du token :
                expiresIn : '3d',
                // À QUI est destiné le token (le site) :   (strings, ou tableaux de strings)
                audience : JWT_AUDIENCE,
                // QUI qui envoie le token (ici, notre API) :   (strings, ou tableaux de strings)
                issuer : JWT_ISSUER
                // audience et issuer : leur variables d'environnement ont été stockées dans .env et importées en haut de ce fichier.
            }

            //* 3) Création du token :
            // Méthode sign(), qui utilise les paramètres suivant :
            // - playload (les infos stockées dans le token, pour savoir qui est le user)
            // - un secret : LE code secret qui va servir à signer (ou encoder) et à décoder le jeton. 
            // - les options : la façon dont va être encodé le token.
            // - (error, token) : la fonction exécutée à la fin de la création du token.

            jwt.sign(playload, JWT_SECRET, options, (error, token) => {
                // Si il y a eu erreur lors de la signature, le param 'error' sera rempli et 'token' sera vide :
                if(error) {
                    reject(error); /* Si erreur, on rejette la promesse*/
                }

                // Si tout s'est bien passé, error est vide et token est rempli :
                resolve(token); /* Si pas d'erreur, on résoud la promesse et on renvoie le token*/

            })
        })

    },

    decode : (token) => {
        return new Promise ((resolve, reject) => {
            //* 1) Si rien dans paramètre token, promese non tenue :
            if(!token) {
                reject(new Error('Pas de token reçu'));
            }
            //* 2) Si il y a bien un token, on peut le décoder :
            const options = {
                audience : JWT_AUDIENCE,
                issuer : JWT_ISSUER
            }

            //* Pour ça, méthode verify qui prend plusieurs paramètres :
            //- Le token à décoder
            //- Le secret
            //- les options
            //- la fonction qui sera lancée à la fin de la vérification :
            jwt.verify(token, JWT_SECRET, options, (error, playload) => {
                // Si il y a eu erreur pendant le décodage, 'error' est rempli et 'playload' est vide :
                if(error) {
                    reject(error); /* Si erreur, on rejette la promesse*/
                }

                // Si pas d'erreur pendant le décodage, 'error' est vide et 'playload' est rempli :
                resolve(playload);/* Si pas d'erreur, on résoud la promesse et on renvoie le token*/
            })
        })
    }
}

module.exports = jwtUtils;