import { atom } from "jotai";
//* Un atom Jotai, c'est simplement un bout d'état global (ou state global), comme un useState mais accessible depuis n'importe quel composant, sans avoir besoin de passer des props (c'est pour ça qu'il est global).
//On crée un état initial avec : atom(valeurInitiale).

// Cet atom sera réutilisable partout dans l'app.
// -> Ici, on va l'utiliser dans LoginForm pour créer un useAtom(tokenAtom) :

// Au chargement de l'app :
// - Si le token existe déjà dans le localStorage (ex : si on est connecté mais qu'on refresh la page) => le récupérer et le mettre dans un atom().
// - Si pas de token = pas connecté => atom(null) d'office.
export const tokenAtom = atom(localStorage.getItem('token')); 
    // tokenAtom = atom(localStorage.getItem('token')) :
    // = état global dont la valeur initiale est le token stocké dans le localStorage par le LoginForm.

 
//Et on va rajouter ça  :
//* un "atom dérivé", en passant une fonction au lieu d'une valeur, qui représente, non pas le token mais l'état de connexion (ici, non-null par défaut) => Renvoie un Booléen true/connecté ou false/déconnecté :

export const isConnectAtom = atom((get) => {
    // atom((get) = {...})  = atom qui passe une fonction => Jotai comprend que c'est un atom dérivé.
    // get = fonction Jotai qui permet de lire la valeur d'un autre atom dans un atom dérivé. Équivalent Jotai de tokenAtom.value.

    //* On lit et stocke la valeur actuelle de tokenAtom dans une variable 'token' :
    const token = get(tokenAtom);
    
    //* Si tokenAtom n'est pas null ( = si le token existe), token vaut true, sinon token vaut false :
    return token !== null;
});
    // => Là, pas besoin de faire le test pour savoir si tokenAtom est null ou non, s'il est périmé ou non...
    // Sans isConnectAtom, dans chaque composant qui a besoin d'une connexion, il faudrait refaire un test pour savoir si on est connecté, si le token est toujours valide...Avec un atom dérivé, la logique est CENTRALISÉE et il faut juste écrire le même useAtom partout où c'est nécessaire, qui changera de valeur en fonction de ce qu'on écrira ici.