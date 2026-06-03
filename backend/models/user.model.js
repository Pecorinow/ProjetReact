const { Schema, model } = require ('mongoose'); // Importer Mongoose pour créer des Schemas.

//* 1) Créer un nouveau schema pour décrire à quoi ressemble un user :
const userSchema = new Schema(
    {
        firstname : {
            type : String,
            required : true,
            trim : true
        },
        lastname : {
            type : String,
            required : true,
            trim : true
        },
        email : {
            type : String,
            required : true,
            trim : true,
            unique : true
        },
        password : {
            type : String,
            required : true
        },
        role : {
            type : String,
            required : true,
            enum : ['User', 'Admin'], // permet de donner une liste de strings autorisées. Si on encode autre chose => erreur.
            default : 'User' // donne à l'utilisateur le rôle User par défaut si on ne renseigne pas de rôle, ce sera User qui sera inséré.
        }
    },{
        timestamps : true
        // Pour ajouter 2 champs automatiquement :
    // createAt : date -> date de création de la catégorie
    // updateAt : date -> date de dernière modification
    }
);

//* 2) Créer un model à partir de ce schema :
// Premier paramètre : le nom du model ;
// Deuxième paramètre : le schéma de ce model :
const User = model('User', userSchema);

// Export du model (pas du Schema) :
module.exports = User;