import { NavLink } from "react-router";
import { useAtom } from "jotai";
import {tokenAtom} from '../../atoms/auth.atom';
import { BtnLogout } from "../../features/auth/components/BtnLogout";

export const Header = () => {

    //* Lire l'atom dans le Header :
    const [token] = useAtom(tokenAtom);
        // tokenAtom possède la valeur de l'atom, à savoir soit null, soit response.date.token.

    return (
        <header className='flex flex-row justify-between py-4 px-8 bg-main-00'>
            <div>
                <img className="w-10" src="/images/logo.png" alt="Logo du site - Fleur bleue"></img>
                <p className='font-averia-r text-main-600 text-2xl'>Garden <span className='text-secondary-500'>Pal</span></p>
            </div>
            <div>
                <nav className='flex items-center'>
                    <ul className='flex flex-row justify-between gap-4'>
                        <li>
                            <NavLink to="">Accueil</NavLink>
                        </li>
                        <li>
                            <NavLink to="/plants">Explorer</NavLink>
                        </li>
                        
                        {!token &&
                        // Si pas de token stocké => afficher les boutons de connexion :
                        <>
                            <li>
                                <NavLink className="btn" to="/auth/login">Me Connecter</NavLink>
                            </li>
                            <li>
                                <NavLink className="btn-2" to="/auth/register">Créer un compte</NavLink>
                            </li>
                        </>
                    }

                    
                    {token &&
                        // Si token stocké => bouton déconnexion :
                        <BtnLogout/> // Sous forme de composant pour ne faire le re-rendu que de ce composant-là.
                    }

                    </ul>
                </nav>
                <button></button>
            </div>
        </header>
    )
}