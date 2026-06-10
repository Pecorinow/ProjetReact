import axios from 'axios';
import { getDefaultStore } from 'jotai';
import { tokenAtom } from '../atoms/auth.atom';


export const gardenService = {

    getAllGardens : async() => {
        const token = getDefaultStore().get(tokenAtom);

         // Jotai permet un accès au contenu de l'atom en dehors de React, via getDefaultStore() :
            // Pourquoi on fait ça ? Parce que le token est sauvegardé dans un atom de Jotai, qui fonctionne sur React 
            // Or, ici, on est en JS, pas en JSX, donc pas en React => on ne peut pas utiliser useAtomValue.
            // => getDefaultStore() donne accès au "store" de Jotai, qui contient la valeur de l'atom, même hors de React.
        const response = await axios.get("http://localhost:3000/api/gardens", {
            headers : {
                Authorization : `Bearer ${token}`
            }
        })

        return response.data.gardens;
    },

    getGardenById : async(gardenId) => {

        const token = getDefaultStore().get(tokenAtom);

        const response = await axios.get(`http://localhost:3000/api/gardens/${gardenId}`, {
            headers : {
                Authorization : `Bearer ${token}`
            }
        });

        // Comment gardenId est relié à :id en backend ?
        // => La connexion se fait naturellement :
            // 1) Le back a une route GET /api/gardens/:id => il attend un id dans l'URL après gardens/ .
            // 2) Le front construit l'URL avec le gardenId : http://localhost:3000/api/gardens/64a1b2c3...
            // 3) => Express voit l'id dans l'URL après /gardens et le met dans req.params.id
        // Donc, le front met l'id dans l'URL, le back le récupère depuis l'URL.

        return response.data;
        // Pourquoi pas response.data.gardens.id ?
        // Parce qu'en back, la route GET /api/gardens/:id renvoie directement l'objet garden, reçu du controller qui renvoyait res.status(200).json(garden) => en front, on récupère d'office l'objet entier avec response.data, pas besoin de préciser .gardens.id puisque c'est déjà garden qu'on reçoit !
        // Or, pour GetAll, on renvoyait res.status(200).json(dataToSend), qui contenait { length, gardens } => Il fallait préciser qu'on voulait gardens parmi les data renvoyées.
    },

    deleteGarden : async(gardenId) => {
        const token = getDefaultStore().get(tokenAtom);

        const response = await axios.delete(`http://localhost:3000/api/gardens/${gardenId}`, {
            headers : {
                Authorization : `Bearer ${token}`
            }
        });
        
        // Pas de return ici vu qu'on supprime une donnée, on n'a rien à retourner.
    }         
    
}

