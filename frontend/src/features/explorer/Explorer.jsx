import { useEffect, useState } from "react";
import { plantService } from "../../services/plant.service";
import { PlantCard } from "../../components/PlantCard";
import { FiltersPanel } from "./Components/FiltersPanel";

export const Explore = () => {

    //* States pour l'état de chargement, les données récupérées et les erreurs :
    const [isLoading, setIsLoading] = useState(true);
    const [plants, setPlants] = useState(null);
    const [error, setError] = useState(null);

    //* Initialiser un state pour sauvegarder les filtres sélectionnés qui vont influencer le useEffect :
    const [filters, setFilters] = useState({});
        // Par défaut, un objet vide qui se remplira des data de plants, importées de l'API.
    
    //* Initialiser un state pour savoir si le panneau des filtres est ouvert ou fermé :
    const [isFiltersOpen, setIsFiltersOpen] = useState(false);

     //* Charger la liste des plantes via l'API (en passant par plantService) :
    useEffect( () => {
        // Restauration des valeurs par défaut :
            // (surtout utile si on n'avait pas un tableau vide [] au bout du useEffect, et qu'il fallait rétablir les valeurs de base après chaque déclenchement du useEffect)
        setIsLoading(true);
        setPlants(null);
        setError(null);

        // Appel au plantService pour envoyer la requête, avec filters en paramètres :
        plantService.getAllPlants(filters)
            .then((data) => { // data = les données récupérées depuis l'API dans plantService
                console.log(data);
                // Stocker les données de data dans le state plants :
                setPlants(data)
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setError(error);
                setIsLoading(false);         
            });

        console.log(filters);
        
    }, [filters]); // => À chaque fois que l'état de filters va changer, le useEffect se réenclenche et va rechercher de nouvelles data dans l'API.

    //* Fonction pour mettre à jour le state filters en y fusionnant les filtres déjà cochés avec chaque nouveau filtre sélectionné :
    const handleSetFilters = (newFilter) => {
        setFilters({...filters, ...newFilter});
    }
        // filters = le state qui contient les filtres existant.
        // newFilter = le nouveau filtre, l'OBJET PASSÉ EN PARAMÈTRE à OptionsPanel via onSetFilters dans le return.
            // Dans OptionsPanel, onSetFilters reçoit la valeur du nouveau filtre sélectionné (ex : {sol : "argileux", "calcaire"), puis remonte jusqu'à Explorer et passe cette valeur comme argument de newFilter, le paramètre de la fonction initiale.
        // => Sans cette fonction, si on envoyait juste setFilters au lieu de la fonction handleSetFilters, chaque nouveau filtre écraserait le précédent.
    
    //* Fonction pour vider le state filters :
    const handleEmptyFilters = () => {
        setFilters({});
    }

    return (
        <>

        <section className=''>
            <h2>Trouve ta plante</h2>
            <div className='search&filters'>
                <input type='text'></input>
                <button type="button" onClick={() => setIsFiltersOpen(true)}>
                    <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M96 128C78.3 128 64 142.3 64 160C64 177.7 78.3 192 96 192L182.7 192C195 220.3 223.2 240 256 240C288.8 240 317 220.3 329.3 192L544 192C561.7 192 576 177.7 576 160C576 142.3 561.7 128 544 128L329.3 128C317 99.7 288.8 80 256 80C223.2 80 195 99.7 182.7 128L96 128zM96 288C78.3 288 64 302.3 64 320C64 337.7 78.3 352 96 352L342.7 352C355 380.3 383.2 400 416 400C448.8 400 477 380.3 489.3 352L544 352C561.7 352 576 337.7 576 320C576 302.3 561.7 288 544 288L489.3 288C477 259.7 448.8 240 416 240C383.2 240 355 259.7 342.7 288L96 288zM96 448C78.3 448 64 462.3 64 480C64 497.7 78.3 512 96 512L150.7 512C163 540.3 191.2 560 224 560C256.8 560 285 540.3 297.3 512L544 512C561.7 512 576 497.7 576 480C576 462.3 561.7 448 544 448L297.3 448C285 419.7 256.8 400 224 400C191.2 400 163 419.7 150.7 448L96 448z"/></svg>
                    Filtres
                </button>
                
                {/* Affichage conditionnel du bouton de reset des filtres : */}
                {Object.keys(filters).length > 0 &&
                    //* Object.keys : retourne un tableau des clefs/propriétés de l'objet filters.
                    // Si ce tableau est plus long que 0, alors on retourne le bouton de reset, sinon rien.
                    <button type="button" onClick={() => handleEmptyFilters()}>
                        <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M320 128C263.2 128 212.1 152.7 176.9 192L224 192C241.7 192 256 206.3 256 224C256 241.7 241.7 256 224 256L96 256C78.3 256 64 241.7 64 224L64 96C64 78.3 78.3 64 96 64C113.7 64 128 78.3 128 96L128 150.7C174.9 97.6 243.5 64 320 64C461.4 64 576 178.6 576 320C576 461.4 461.4 576 320 576C233 576 156.1 532.6 109.9 466.3C99.8 451.8 103.3 431.9 117.8 421.7C132.3 411.5 152.2 415.1 162.4 429.6C197.2 479.4 254.8 511.9 320 511.9C426 511.9 512 425.9 512 319.9C512 213.9 426 128 320 128z"/></svg>
                        Réinitialiser les filtres
                    </button>
                 }
            </div>

            <FiltersPanel
                onClose={() => setIsFiltersOpen(false)}
                isFOpen= {isFiltersOpen}
                onSetFilters = {handleSetFilters}
                    // Rappel : Si on envoyait juste setFilters au lieu de la fonction handleSetFilters, chaque nouveau filtre écraserait le précédent.
            />

            {isLoading ? (
                <p>Chargement en cours...</p>
                
                ) :
                // Vérifier que le state plants a bien été rempli :
                (plants !== null) ? (
                    <ul>
                        {plants.map(plant => (<PlantCard key={plant._id} plant={plant}/>))}
                        
                    </ul>
                    
                ) : (
                    <p>Il semblerait qu'il y ait un bug.</p>
                )
            }

        </section>
        
        </>
    )
}