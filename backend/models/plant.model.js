const { Schema, model, Types } = require('mongoose'); // Importer Mongoose pour créer des Schemas, des models, des Types.

//* 1) Créer un nouveau schema pour décrire à quoi ressemble une plante :
const plantSchema = new Schema(
    {
        slug : {
            type : String,
            required : true,
            unique : true,
            trim: true
        },
        nom_commun : {
            type : String,
            required : true,
            unique : true,
            trim: true
        },

        nom_latin : {
            type : String,
            required: true,
            unique: true,
            trim: true
        },

        image : String,

        categories : [String],
            // = type : tableau de strings. Peut aussi s'écrire : categories : { type : [Strings]}

        description : {
            type: String,
            trim: true
        },

        cycle : {
            type: String,
            trim: true
        },

        hauteur_cm : [Number],

        sol: [String],

        lumiere : [String],

        humidite : [String],

        floraison : [String],

        plantation : [String],

        toxicite : {
            niveau : String,
            details : String

        },

        associations : [{type : Types.ObjectId,
            ref: 'Plant'}]
    }
);

//* 2) Créer un model à partir de ce schema :
const Plant = model('Plant', plantSchema);

module.exports = Plant;