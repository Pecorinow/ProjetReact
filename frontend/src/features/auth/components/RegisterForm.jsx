import {useId} from 'react';
import { useNavigate } from 'react-router';
import { authService } from '../../../services/auth.service';

export const RegisterForm = () => {

    const id = useId(); // + id d'accessibilité, le même partout mais qu'on rend unique en y ajoutant plus bas les chaines de caractères correspondant à leur champ (username, firstname...)

    const navigate = useNavigate(); // = méthode qui permet une redirection après l'enregistrement ou le login (vers la page d'accueil en général)

    //* Les données sont récupérées sous forme d'un formData (=> Ajouter un name dans les inputs ) :
    const handleRegisterSubmit = async (formData) => {
        // handleRegisterSubmit = méthode qui fait un handleSubmit mais ???
        // async => permet d'utiliser une fonction asynchrone, sans utiliser de useEffect ???
        
        console.log(formData);

        //* Conversion des données en un objet JS, pour récupérer les données nécessaires :
            // Attention : se base sur la value des champs, donc si on a des checkbox, cette value est "on" ou undefined
        const dataSentByUser = Object.fromEntries(formData.entries());
            // .fromEntries = convertit des entrées de formulaires en objet JS
        console.log('Data', dataSentByUser);
            // Dans notre cas, on transforme le formData en objet JS car le webApi ne s'attend pas à recevoir des données de type formData.

        //* Utiliser le service qui permet de contacter la WebApi Demo_Express :

        const response = await authService.register(dataSentByUser);

        console.log(response);
            // => Response contient les infos de l'user tels que présentés dans la DB dans Insomnia, dans Auth -> Register : id, firstname, lastname.

        //* Redirection vers la page d'accueil :
        navigate('/'); // = redirige l'utilisateur vers la page d'accueil après qu'il se soit inscrit
    }
    

    return (

        <form action={handleRegisterSubmit}>
            {/* action = désactive automatiquement le comportement par défaut de la page (le refresh) et met automatiquement les infos du formulaire dans formData. Inconvénient : on ne peut pas y ajouter des states, donc pas de messages d'erreur. => On peut faire quelque-chose pour quand-même y ajouter un state  : ... */}
            <div>
                <div className='flex flex-col justify-center gap-1'>
                    <label htmlFor={id + 'email'}>Email</label>
                    <input id={id + 'email'} type='text' name="email" className='outline-2 p-1 rounded-md outline-secondary-600 hover:bg-secondary-50 target:bg-secondary-50'></input>
                </div>

                <div className='flex flex-col justify-center gap-1'>
                    <label htmlFor={id + 'firstname'}>Prénom</label>
                    <input id={id + 'firstname'} type='text' name="firstname" className='outline-1 p-1 rounded-md'></input>
                </div>

                <div className='flex flex-col justify-center gap-1'>
                    <label htmlFor={id + 'lastname'}>Nom</label>
                    <input id={id + 'lastname'} type='text' name="lastname" className='outline-1 p-1 rounded-md'></input>
                </div>

                <div className='flex flex-col justify-center gap-1'>
                    <label htmlFor={id + 'password'}>Mot de passe</label>
                    <input id={id + 'password'} type='password' name="password" className='outline-1 p-1 rounded-md'></input>
                </div>

                <div>
                    <button type="submit" className='btn-2'>S'enregistrer 🐸</button>
                </div>

                
            </div>
        </form>
    )

}