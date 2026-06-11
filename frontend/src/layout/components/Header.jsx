import { NavLink } from "react-router";
import { useAtomValue } from "jotai";
import {isConnectAtom} from '../../atoms/auth.atom';

import { BtnLogout } from "../../features/auth/components/BtnLogout";

export const Header = () => {

    //* Lire l'atom dans le Header :
    const isConnected = useAtomValue(isConnectAtom);
        // useAtomValue : lis juste la valeur de l'atom sans la modifier (car ici on veut juste lire l'atom).
        // >< useAtom : qui renvoie [valeur, setter], donc la valeur de l'atom ET son setter pour pouvoir la modifier.
        // >< useSetAtom : qui renvoie juste le setter (utilisé dans BtnLogout).

    return (
        <header className="flex flex-row justify-between py-4 px-8 w-9/10 m-auto rounded-2xl bg-main-00 outline-main-100 outline-3 fixed top-6 right-0.5 left-0.5 z-100">
            <div  className="flex items-center gap-2">
                <img className="w-12" src="/images/logo.png" alt="Logo du site - Fleur bleue"></img>
                <p className='font-averia-r text-main-600 text-3xl'>Garden <span className='text-secondary-500'>Pal</span></p>
            </div>

            <nav className='flex items-center'>
                <ul className='flex items-center justify-between gap-8 font-averia-r text-xl'>
                    <li>
                        <NavLink to="">Accueil</NavLink>
                    </li>
                    <li>
                        <NavLink to="/plants">Explorer</NavLink>
                    </li>

                    {isConnected &&
                        <li>
                            <NavLink to="/gardens">Mes jardins</NavLink>
                        </li>
                    }

                    {!isConnected &&
                        // Si pas de token stocké => afficher les boutons de connexion :
                        <>
                            <li>
                                <NavLink className="btn-1" to="/auth/login">Me Connecter</NavLink>
                            </li>
                            <li>
                                <NavLink className="btn-2" to="/auth/register">Créer un compte</NavLink>
                            </li>
                        </>
                    }

                    {isConnected &&
                        // Si token stocké => bouton déconnexion :
                        <BtnLogout /> // Sous forme de composant pour ne faire le re-rendu que de ce composant-là.
                    }
                </ul>

                    

                

                
            </nav>
        </header>
    )
}