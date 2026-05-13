const Plant = require('../models/plant.model');

const plantService = {

    find : async(query) => {

        try {
            const filtrableFields = ['categories', 'sol', 'lumiere', 'humidite', 'floraison', 'plantation', 'cycle'];
            
            let filter = {};
            
            // Pour chaque champ de filtrable fields :
            for (const field of filtrableFields) {

                if(query[field] !== undefined) { // Si la propriété correspondant à field dans la query n'est PAS undefined = Si le champs a été coché :
                    // Si Express voit plusieurs paramètres avec le même nom (ex : categories=aromatique&categories=mellifere), il les met automatiquement dans un tableau ; s'il ne voit qu'un seul param avec ce nom, il en fait une string ("aromatique")
                    // Si query[field] est un tableau = Si il y a plusieurs cases cochées dans un des champs (ex : plusieurs catégories) :
                    if (Array.isArray(query[field])) {
                        // Ajouter à l'objet filter la propriété contenue dans field, si cette propriété correspond au contenu de field dans l'objet query :
                        filter[field] = {$all : query[field]}
                            // revient à faire filter.categories = { $in: query.categories }
                            // [field] est entre crochets car la variale field est ici utilisée comme une clé dynamique : si on l'écrit sans, il est interprété comme un objet litéral 'field'.
                    }
                    // Si par contre query[field] n'est pas un tableau mais une string (= une seule case cochée pour ce champ), alors il faut le transformer manuellement en tableau, car $all ne peut chercher que dans un tableau => query[field] devient [query[field]] :
                    else {
                        filter[field] = {$all : [query[field]]}
                    }
                //  else {
                    // Pas de else, ici on n'écrit rien : si on ajoute un filter = {} ça va réinitialiser filter comme un objet vide, or on veut qu'il conserve les autres propriétés => On n'écrit pas de else !
                // }
                }
                    
                
            };       
            // let categoryFilter = {categories : {$all : categories}};

            if (query['toxicite.niveau'] !== undefined) { 
                filter['toxicite.niveau'] = query['toxicite.niveau']
                    // Ici, pas de $all, car on ne cherche pas une valeur parmi d'autres dans un tableau (categories, sol...) mais bien une correspondance directe : 
                        // { $all: query[field] } = "cherche parmi dans la query la valeur qui correspond à ce field".
                        // query['toxicite.niveau'] = "cherche exactement cette valeur dans la query".
            };

            if (query.search !== undefined) {
                filter.$or = [
                    {nom_commun : { $regex: query.search, $options: "i" }},
                    {nom_latin : { $regex: query.search, $options: "i" }},
                ] 
            };
            
            
            console.log(filter);

            const plants = await Plant.find(filter)
                                      .populate( {
                                                path : 'associations',
                                                select : {slug : 1,
                                                nom_commun : 1,
                                                nom_latin : 1}
                                             })
                                    //   .and(categoryFilter);
            return plants;

        } catch(err) {
            console.log(err);

            // Le service parle à la DB => Si ça plante, le service renvoie l'erreur au controller, qui l'attrapera à son tour dans osn catch :
            throw new Error(err);
        }     
    },

    findById : async(id) => {
        try {
            const searchedPlant = await Plant.findById(id)
                                             .populate( {
                                                path : 'associations',
                                                select : {slug : 1,
                                                nom_commun : 1,
                                                nom_latin : 1}
                                             })
                                             // À quoi sert populate() ?
                                             // .populate() sert ajouter manuellement des informations d'un autre model associé, parce qu'en No-SQL les différentes entités ne sont pas naturellement liées entre elles comme en SQL.
                                             // => Dans ce cas-ci, à chaque fois qu'on va cherche une plante, .populate va permettre d'y insérer les infos choisies ici dans le champ "associations" (et pas juste les ObjectId des plantes associées).
            return searchedPlant;
        }
        catch(err){
            console.log(err);
            throw new Error(err);
        }
    },
}

module.exports = plantService;