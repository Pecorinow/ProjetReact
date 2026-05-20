import { useEffect, useState } from "react";
import { plantService } from "../../services/plant.service";
import { PlantCard } from "../../components/PlantCard";
import { FiltersPanel } from "./Components/FiltersPanel";

export const Explore = () => {

    // Charger la liste des plantes via l'API (en passant par plantService) :
    const [isLoading, setIsLoading] = useState(true);
    const [plants, setPlants] = useState(null);
    const [error, setError] = useState(null);

    // Initialiser un state pour sauvegarder les filtres sélectionnés qiu vont influencer le useEffect :
    const [filters, setFilters] = useState({});
        // Par défaut, un objet vide qui se remplira des data de plants, importées de l'API.
    
    // Initialiser un state pour savoir si le panneau des filtres est ouvert ou fermé :
    const [isFiltersOpen, setIsFiltersOpen] = useState(false);

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
    }, [filters]); // => À chaque fois que l'état de filters va changer, le useEffect se réenclenche et va rechercher de nouvelles data dans l'API.


    return (
        <>

        <section className=''>
            <h2>Trouve ta plante</h2>
            <div className='search&filters'>
                <input type='text'></input>
                <button type="button" onClick={() => setIsFiltersOpen(true)}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M96 128C83.1 128 71.4 135.8 66.4 147.8C61.4 159.8 64.2 173.5 73.4 182.6L256 365.3L256 480C256 488.5 259.4 496.6 265.4 502.6L329.4 566.6C338.6 575.8 352.3 578.5 364.3 573.5C376.3 568.5 384 556.9 384 544L384 365.3L566.6 182.7C575.8 173.5 578.5 159.8 573.5 147.8C568.5 135.8 556.9 128 544 128L96 128z"/></svg>
                    Filtres
                </button>
            </div>

            <FiltersPanel
                onClose={() => setIsFiltersOpen(false)}
                isFOpen= {isFiltersOpen}
                onSetFilters = {setFilters}
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
                    <p>Il semblrait qu'il y ait un bug.</p>
                )
            }

        </section>
        
        </>
    )
}