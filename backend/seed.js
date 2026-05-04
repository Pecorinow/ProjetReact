const mongoose = require('mongoose'); // pour connexion à la DB => Importer Mongoose
const Plant = require('./models/plant.model'); // Import du model Plant (lié à la collection Plant en DB)
const plantApi = require('./API.json'); // Import de l'API
const { DB_CONNEXION } = process.env; // Import de l'url de connexion à la DB depuis les variables d'environnement

// Fonction pour vider et remplir la DB en une fois avec notre API :
const seed = async() => {
    try {
        //* Connexion à la DB :
        await mongoose.connect(DB_CONNEXION, {dbName: 'GardenManager' });

        //* Vider la DB :
        await Plant.deleteMany();

        // Problème : dans "associations", ce ne sont pas des ObjectId qui sont renseignés mais des "slugs", or dans le plant.model, "associations" a besoin d'un ObjectId, pas d'un slug. => On entre d'abord l'API dans la DB sans le champs "associations", Mongo attribuera un ObjectId à chaque plante, ensuite pour chaque ObjectId on ira changer chaque slug du tableau "associations" en DB en l'ObjectId de la plante correspondante !
        //* Pour retirer le champs "associations" du json inséré => Créer un nouveau tableau à partir de plantApi :
        const plantsWithoutAssociations = plantApi.map(plant => {
            // Comme dans l'API JSON, les id ont la propriété "id", mais que dans la DB ils sont appelés "slugs", on en profite pour changer "id" en "slug" en créant le nouveau tableau :
            const { associations, id : slug, ...plantWithoutAssociations } = plant;
                // id: slug = on crée une variable locale appelée slug, qui contient la valeur de id. Elle est séparée de plantWithoutAssociations parce qu'on l'a explicitement extraite grâce au spread operator.
            return {...plantWithoutAssociations, slug}; // = On retourne un nouveau tableau qui contient tous les champs de plantWithoutAssociations, plus le champ "slug"
        });

        //* Remplir la DB avec le nouveau tableau :
        const addedPlants = await Plant.insertMany(plantsWithoutAssociations);
            // le const n'est pas indispensable, on aurait pu écrire "await Plant.insertMany(plantApi)" tout seul, mais on le fait car on compte utiliser les données dans le console.log() ci-dessous :

        // Vérifier que les plantes ont bien été ajoutées à la DB :
        console.log(`${addedPlants.length} plantes sont bien été ajoutées à la DB`);

        //* Faire passer "associations d'un tableau de slugs à un tableau d'ObjectId :
        // 1) On parcourt chaque plante du JSON. Pour chaque plante dans l'API :
        // 2) - on cherche celle dont l'id correspond à un slug dans le modèle en DB.
        // 3) - on crée un nouveau tableau "associationIds"
        // 4) Dans ce tableau, pour chaque élément de "associations" appelé ici slug, on va trouver la plante en DB qui a un champs "slug" qui lui correspond.
        // 5) Ensuite on retourne l'ObjectId (_id) que cette plante a en DB
            // => Donc "associationIds" contient à la fin un tableau d'ObjectId, pas de slugs. La "traduction" se fait à l'étape 4-5 : on entre avec un slug, on ressort avec un ObjectId
        // 6) On met à jour le modèle Plant en DB : pour chaque _id, on remplace "associations" par "associationsIds" => le tabelau de slugs devient un tableau d'ObjectIds => Le modèle peut fonctionner.
        for (const plant of plantApi) {
            const plantToFindInDB = await Plant.findOne({slug : plant.id});
            const associationIds = await Promise.all(
                plant.associations.map(async (slug) => {
                    const foundPlant = await Plant.findOne({ slug: slug });
                    if (foundPlant)
                        return foundPlant._id;
                        else console.log(`Slug introuvable : ${slug}`);
                })
            );
            await Plant.findByIdAndUpdate(plantToFindInDB._id, { associations: associationIds });
        };

        //* Se déconnecter de la DB quand c'est fait :
        await mongoose.disconnect();

    } catch(err) {
        console.log(`Connexion échouée : ${err}`);
    }
};

// Renvoyer la fonction :
seed();