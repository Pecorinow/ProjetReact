import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { plantService } from "../../services/plant.service";
import { NavLink } from "react-router"
import { useAtom, useAtomValue } from "jotai";
import {isConnectAtom} from '../../atoms/auth.atom';

const plantFields = [
        { key: 'categories', label: 'Catégorie', type: 'array' },
        { key: 'description', label: 'Description', type: 'string' },
        { key: 'cycle', label: 'Cycle de vie', type: 'string' },
        { key: 'hauteur_cm', label: 'Hauteur', type: 'height' },
        { key: 'sol', label: 'Type de sol', type: 'array' },
        { key: 'lumiere', label: 'Luminosité', type: 'array' },
        { key: 'humidite', label: 'Degré d\'humidité', type: 'array' },
        { key: 'floraison', label: 'Période de floraison', type: 'array' },
        { key: 'plantation', label: 'Période de plantation', type: 'array' },
        { key: 'toxicite', label: 'Toxicité', type: 'toxicite' }
        
        // { key: 'associations', label: 'Associations', type: 'array'}
    ]

export const PlantDetails = () => {
    
    //* States pour l'état de chargement, les données récupérées et les erreurs :
    const [isLoading, setIsLoading] = useState(true);
    const [plant, setPlant] = useState(null);
    const [error, setError] = useState(null);

    //* Récupérer l'id de la plante à partir de sa route grâce à useParams() :
    const { id } = useParams();
        // useParams() = hook de React qui permet de lire les paramètres dynamiques d'une URL (ex : un id qui change), et renvoie un OBJET contenant tous les paramètres de la route correspondante.
        // On doit en extraire le param qui nous intéresse via le nom dynamique qu'on lui a donné après les ":" dans notre fichier routes.
            //  Ex : si la route est définie dans routes.js comme /plants/:id (tout ce qui se trouve après les ':' étant dynamique), et que l'URL où on se trouve est /plants/123, alors useParams retourne un objet correspondant aux paramètres dynamiques après les ':'.
        
    
    //* Charger la plante depuis l'API (en passant par plantService), selon son id récupéré par useParams :
    useEffect( () => {
        // Restauration des valeurs par défaut au chargement de la plante :
        setIsLoading(true);
        setPlant(null);
        setError(null);

        // Appel au plantService pour envoyer la requête , avec id en paramètre :
        plantService.getPlantById(id)
            .then((data) => {
                console.log(data);

                setPlant(data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setError(error);
                setIsLoading(false);
            });

        console.log(id);

    }, [id]);

    //* Lire l'atom dans PlantDetails :
    const isConnected = useAtomValue(isConnectAtom);
        // useAtomValue : lis juste la valeur de l'atom sans la modifier (car ici on veut juste lire l'atom).
        // >< useAtom : qui renvoie [valeur, setter], donc la valeur de l'atom ET son setter pour pouvoir la modifier.
        // >< useSetAtom : qui renvoie juste le setter (utilisé dans BtnLogout).

    return (
        <>

        <nav>
            <NavLink to="/plants" className="btn-1">
                {/* <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M201.4 297.4C188.9 309.9 188.9 330.2 201.4 342.7L361.4 502.7C373.9 515.2 394.2 515.2 406.7 502.7C419.2 490.2 419.2 469.9 406.7 457.4L269.3 320L406.6 182.6C419.1 170.1 419.1 149.8 406.6 137.3C394.1 124.8 373.8 124.8 361.3 137.3L201.3 297.3z"/></svg> */}
                <p>Retour</p>
            </NavLink>
        </nav>



        { isLoading ? (
            <p>Chargement en cours...</p>
            ) :

            (plant !== null) ? (
            <section className="flex flex-col">
                <div className="flex flex-row">
                    <img src={plant.image}></img>

                    <div className="flex flex-col">
                        <h1>{plant.nom_commun}</h1>
                        <h2>{plant.nom_latin}</h2>
                    </div>

                    {isConnected &&
                        <button>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M320 576C461.4 576 576 461.4 576 320C576 178.6 461.4 64 320 64C178.6 64 64 178.6 64 320C64 461.4 178.6 576 320 576zM296 408L296 344L232 344C218.7 344 208 333.3 208 320C208 306.7 218.7 296 232 296L296 296L296 232C296 218.7 306.7 208 320 208C333.3 208 344 218.7 344 232L344 296L408 296C421.3 296 432 306.7 432 320C432 333.3 421.3 344 408 344L344 344L344 408C344 421.3 333.3 432 320 432C306.7 432 296 421.3 296 408z"/></svg>
                            <span>Ajouter à un jardin</span>
                        </button>
                    }
                </div>

                <ul className="flex flex-col">

                    {/* Affichage des champs et de leurs options : */}
                    {/*
                    1) map() sur plantFields pour afficher le nom des champs (// FiltersPanel).
                    2) Affichage conditionnel selon le type de valeurs (options) à afficher, string ou array (// Explorer).
                    3) Si type = array, map() sur plant[field.key] pour accéder aux valeurs du tableau.
                    */}

                    {plantFields.map(field => (

                        <li key={field.key}>

                            <p>{field.label}</p>

                            { field.type === 'string' ? (

                                <p>{plant[field.key]}</p>

                                ) : field.type === 'array' ?
                                (
                                    <ul>
                                    {plant[field.key].map(value => (
                                        <li key={value}>
                                            {value}
                                        </li>
                                    ))}

                                    {/* Ici, plant[field.key] équivaut à 
                                        - plant.categories
                                        - ou à plant["categories"] 
                                    Comme dans OptionsPanel avec [selectedField.key], c'est une clef dynamique, donc entre [].
                                    Sans les [], ça chercherait une string littérale "key" dans l'un des field de l'objet plant, et on obtiendrait undefined.
                                    NOTATION POINTÉE plant.field = cherche le nom LITTERAL de ce qui est écrit après le point.
                                    CROCHETS plant[field] = cherche ce qui est CONTENU dans la string 'field', pas la string en elle-même. */}
                                    </ul>
                                ) : field.type === 'height' ? (
                                    <p>Entre {plant.hauteur_cm[0]} et {plant.hauteur_cm[1]} cm.</p>
                                ) : (
                                    <ul>
                                        <li> Niveau : {plant[field.key].niveau} </li>
                                        <li> {plant[field.key].details} </li>
                                    </ul>
                                )
                            }

                        </li>
                    ))}                    

                </ul>

            </section>
            ) : (
                <p>Il semblerait qu'il y ait un bug, impossible de charger les informations de cette plante pour l'instant.</p>
            )
        }

        </>
    )
}