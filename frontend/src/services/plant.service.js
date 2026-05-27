import axios from 'axios';
import qs from 'qs';

export const plantService = {

    getAllPlants : async (filters) => {

        const response = await axios.get('http://localhost:3000/api/plants', {
            params : filters,
                // En méthode GET, on indique quels sont les paramètres à envoyer avec l'url (= les query params) comme ceci :
                    // {params : params-à-envoyer}
                // Ici, params reçoit filters depuis Explorer.jsx, qui le lui a passé avec plantService.getAllPlants(filters)
            paramsSerializer: params => qs.stringify(params, {arrayFormat: 'repeat'})
                // paramSerializer = option d'Axios qui permet de personnaliser comment les params sont convertis en chaîne URL => remplace le comportement par défaut d'Axios (qui veut transformer les params en "categories[]" ou "sol[]" dans l'URL) par une uatre fonction.
                // qs = librairie Axios de "sérialisation" de query strings : converit des objets JS en paramètres URL.
                    // Si on ne l'utilise pas, par défaut Axios va voir par exemple { categories: ['arbre', 'fleur'] } et va sérialiser le tableau categories dans l'URL comme ceci :
                    // /plants?categories[]=arbre&categories[]=fleur
                    // Or, nous on veut /plants?categories=arbre, sans les [] => on utilise qs pour dire à Axios comment écrire l'URL.
                // stringify(params) = convertit l'objet params { categories: ["arbre", "fleur"] }, en string URL categories=arbre&categories=fleur.
                // ArrayFormat: 'repeat' = "Répéter l'opératojn pour chaque tableau reçu".
        });
            

        return response.data;
    },

    getPlantById : async (plantId) => {

        const response = await axios.get(`http://localhost:3000/api/plants/${plantId}`);

        // Comment plantId est relié à :id en backend ?
        // => La connexion se fait naturellement :
            // 1) Le back a une route GET /api/plants/:id => il attend un id dans l'URL après plants/.
            // 2) Le front construit l'URL avec le plantId : http://localhost:3000/api/plants/64a1b2c3...
            // 3) => Express voit l'id dans l'URL et le met dans req.params.id
        // Donc, le front met l'id dans l'URL, le back le récupère depuis l'URL.

        return response.data;
    }
}

// src 
//     |_ atoms 
//         |_ auth.atoms.js
//     |_ features
//         |_ dossier_page1
//              |_Page1.jsx
//         |_ dossier_page2
//              |_Page2.jsx
//              |_Page2Child.jsx
//          ...
//     |_ layout
//          |_ components
//              |_ Footer.jsx
//              |_ Header.jsx
//          |_ pages
//              |_ Home.jsx
//              |_ PageNotFound.jsx
//     |_ services
//              |_ auth.service.jsx
//              |_ user.service.jsx 