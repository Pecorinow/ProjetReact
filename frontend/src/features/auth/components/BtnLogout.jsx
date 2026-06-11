import { useSetAtom } from "jotai";
import { tokenAtom } from "../../../atoms/auth.atom";

export const BtnLogout = () => {

    // Récupérer le setter de l'atom :
    const setToken = useSetAtom(tokenAtom);
        // useSetAtom : renvoie juste le setter de l'atom pour mettre à jour sa valeur.
        // >< useAtom : qui renvoie [valeur, setter], donc la valeur de l'atom ET son setter pour pouvoir la modifier.
        // useAtomValue : lis juste la valeur de l'atom sans la modifier (utilisé dans Header et PlantDetails où on veut juste la lire).
        
        

    // Supprimer le token en cas de déconnexion => valeur null
    const handleLogOut = () => {
        localStorage.removeItem('token');
        setToken(null);
    }

    // On pourrait mettre un navigate ici vers la page d'accueil, c'est conseillé sur les sites où toutes les pages nécessitent d'être connecté pour être consultées.
    // Mais ici il n'y a que la page Mes Tâches qui nécessite une connexion => pour évite une redirection et donc un re-rendu juste pour éviter une seule page, on ne le mets pas.

    return (
        <li>
            <button className="btn-2" onClick={handleLogOut}>Déconnexion</button>
        </li>
    )
}