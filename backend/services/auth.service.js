const argon2 = require('argon2');
const User = require('../models/user.model');

const authService = {

    emailAlreadyExists : async(email)=> {
        try {
            //* Trouver l'utilisateur dont le mail est = à celui reçu en paramètres depuis le controller  :
            const userFound = await User.findOne({email : email});
                // {email : email} : le premier 'email' = celui du model User. Le second = celui reçu en paramètres.

            //* Si l'utilisateur est trouvé ( = si l'email existe déjà) :
            if(userFound) {
                return true;
            } else {
                return false;
            }

        } catch(err) {
            console.log(err);
            throw new Error(err);
        }
    },

    create : async(user) => {
        // C'est ici qu'on va hasher les mots de passe :
        try {
            //* 1) AVANT d'ajouter le user en DB, on va hasher et modifier son mdp reçu en paramètres depuis le controller pour ajouter la version hashée en DB :
            const hashedPassword = await argon2.hash(user.password);

            //* 2) On remplace le mdp reçu en params par le mdp hashé :
            user.password = hashedPassword;

            //* 3) Et on sauve le user en DB :
            const userToCreate = User(user);
            await userToCreate.save();

            return userToCreate;

        } catch(err) {
            console.log(err);
            throw new Error(err);
        }
    },
        
    // findByCredentials : Va permettre le login, en comparant l'email reçu en paramètre de la request a un email existant en DB. Si il existe, alors un token sera créé dans le contoller via jwtUtils, puis renvoyé au frontend pour qu'il soit stocké dans un Atom jotai. À chaque request vers une route protégée, le frontend renvoie le token dans les headers de la request vers le backend. Le back vérifie qui fait la request via ce token et donne ou non le droit d'accéder à la route.
    findByCredential : async(credentials) => {
        try {

            //* Trouver l'utilisateur dont le mail est = à celui reçu en paramètres depuis le controller  :
            const userFound = await User.findOne({email : credentials.email});
                // {email : credentials.email} : le premier 'email' = celui du model User. Le second 'credentials.email' = celui reçu en paramètres.

            //* Si pas d'utilisateur trouvé, on sort avec un "early return" :
            if(!userFound) {
                return undefined;
            }

            //* Si utilisateur trouvé, on vérifie si le mdp entré correspond à celui de la DB, grâce à un Booléen True or False dans verify() :
            const checkPassword = await argon2.verify(userFound.password, credentials.password);

            //* Si les mdp ne correspondent pas, on sort :
            if(!checkPassword) {
                return undefined;
            } else {
                //* Si les mdp correspondent, alors on peut renvoyer l'utilisateur trouvé :
                return userFound;
            }
        } catch(err) {
            console.log(err);
            throw new Error(err);
        };
    }
};

module.exports = authService;