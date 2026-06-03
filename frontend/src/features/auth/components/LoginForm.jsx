import {useId} from 'react';
import { useNavigate } from 'react-router';
import { authService } from '../../../services/auth.service';
import { useAtom } from "jotai";
import {tokenAtom} from '../../../atoms/auth.atom';

export const LoginForm = () => {

    const id = useId();

    const navigate = useNavigate();

    // * State management :
    // Pour que le header affiche ou non les boutons de connexion, il doit savoir si on est déjà connecté ou non. Pour ça, on va utiliser le token récupéré dans auth.service.js, le stocker le temps de la connexion, et s'en débarrasser lors de la déconnexion. Donc :
        // Si le token est stocké => la valeur de tokenAtom est celle du token de connexion => on est connecté, pas de bouton de connexion nécesaire.
        // Si pas de token stocké => la valeur de tokenatom est null => on est déconnecté, afficher les boutons de connexion.
    //* 1. Stocker le token (récupéré dans auth.service.js) lors du login dans le LoginForm.jsx :
    const [token, setToken] = useAtom(tokenAtom);
    // Ou :
    // const setToken = useAtom(tokenAtom);

    const handleRegisterSubmit = async (formData) => {
        console.log(formData);

        // Convertir les données entrées par l'utilisateur en un objet JS :
        const dataSentByUser = Object.fromEntries(formData.entries());

        console.log('Data sent by user', dataSentByUser);

        //* Récupérer le token de l'utilisateur : 
        // Appeler l'API en back via authService, en envoyant les infos rentrées par l'utilisateur :
        const dataFromBack = await authService.login(dataSentByUser);
            // dataFromBack : correspond au contenu de response.data {id, firstname, lastname, token}, retourné depuis le back dans authService.

        // Récupérer le token parmi les données renvoyées :
        const token = dataFromBack.token;

        console.log(token);
        
        //* 2. On stocke le token dans le localstorage, pour rester connecté en cas de refresh :
        localStorage.setItem('token', token);

        //* 3. Le useAtom est mis à jour, et sa valeur passe de (null) à (response.data.token) :
        setToken(token);
            // = stocke le token dans l'atom.

        navigate('/');
    }

    return (
        <form action={handleRegisterSubmit}>
            {/* ATTENTION : pour le login, changer le action de RegisterForm.jsx en onSubmit POURQUOI ?? */}
             <div>
                <div className='flex flex-col justify-center gap-1'>
                    <label htmlFor={id + 'email'}>Email</label>
                    <input id={id + 'email'} type='text' name="email" className='input-form'></input>
                </div>


                <div className='flex flex-col justify-center gap-1'>
                    <label htmlFor={id + 'password'}>Mot de passe</label>
                    <input id={id + 'password'} type='password' name="password" className='input-form'></input>
                </div>

                <div>
                    <button type="submit" className='btn-2'>Se connecter 🐸</button>
                </div>

                
            </div>
        </form>
    )
}