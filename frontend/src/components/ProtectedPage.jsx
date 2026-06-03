import { useAtomValue } from "jotai";
import { isConnectAtom } from "../atoms/auth.atom";
import { Navigate } from "react-router";

//* Composant qui va servir à "protéger" les pages qui ne peuvent être consultée qu'en étant connecté :
// Ce composant va faire de la délégation de contenu, avec une balise ouvrante et fermante <>{children}</> à la fin :

export const ProtectedPage = ({children}) => {
    // children = le contenu "enfant" de la balise :

    
    // Si on n'avait pas utilisé l'ato dérivé dans auth.atom.js :
        // const token = useAtomValue(tokenAtom);

        // if(!token) {
        //     return <Navigate to='/auth/login'/>
        // }

    // Mais comme on a utilisé l'atom dérivé :
    const isConnect = useAtomValue(isConnectAtom);
        // = On récupère l'état de connexion depuis auth.atom.js.

    // Si l'état de connexion est null, <Navigate/> nous renvoie à la page de connexion :
    if(!isConnect) {
        return <Navigate to='/auth/login'/>
    }

    return children;
    // équivalent de return <>{children}</>
}