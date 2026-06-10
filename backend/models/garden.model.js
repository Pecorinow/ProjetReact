const { Schema, model, Types } = require('mongoose');

const gardenSchema = new Schema(
    {
        nom : {
            type : String,
            required : true,
            unique : true,
            trim: true
        },
        description : {
            type: String,
            trim: true
        },
        image: { 
            type: String, 
            default: "url_de_l_image_par_defaut" 
        },
        user_id : {
            type:Types.ObjectId, 
            ref:'User',
            required:true
        },
        plants : [{
            type : Types.ObjectId,
            ref: 'Plant'
        }]

    },
    {
        timestamps : true
        // Pour ajouter 2 champs automatiquement :
    // createAt : date -> date de création de la catégorie
    // updateAt : date -> date de dernière modification
    }
);

const Garden = model('Garden', gardenSchema);

module.exports = Garden;