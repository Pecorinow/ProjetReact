import { useEffect, useState } from "react";
import { gardenService } from "../../services/gardens.service";
import { GardenCard } from "./components/GardenCard";

export const Gardens = () => {

    //* States pour l'état de chargement, les données récupérées et les erreurs :
    const [isLoading, setIsLoading] = useState(true);
    const [gardens, setGardens] = useState(null);
    const [error, setError] = useState(null);

    //* Charger la liste des pjardins via l'API (en passant par pgardenService) :
        useEffect( () => {
            // Restauration des valeurs par défaut :
                // (surtout utile si on n'avait pas un tableau vide [] au bout du useEffect, et qu'il fallait rétablir les valeurs de base après chaque déclenchement du useEffect)
            setIsLoading(true);
            setGardens(null);
            setError(null);
    
            // Appel au gardenService pour envoyer la requête :
            gardenService.getAllGardens()
                .then((data) => { // data = les données récupérées depuis l'API dans gardenService
                    console.log(data);
                    // Stocker les données de data dans le state gardens :
                    setGardens(data)
                    setIsLoading(false);
                })
                .catch((error) => {
                    console.log(error);
                    setError(error);
                    setIsLoading(false);         
                });
        }, []); // => À chaque fois que l'état de filters va changer, le useEffect se réenclenche et va rechercher de nouvelles data dans l'API.

        // Fonction pour supprimer un jardin au clic du bouton qui se trouve dans GardenCard :
        const handleSetGardens = (gardenId) => {

            gardenService.deleteGarden(gardenId)
                .then(() => {
                    const newGardens = gardens.filter(garden => garden._id !== gardenId)

                    setGardens(newGardens);
                })
                .catch((error) => {
                    console.log(error);
                    setError(error);
                })
        }

        return (
            <>
            <section className="">
                        <h1>Mes jardins</h1>
            
                        {isLoading ? (
                            <p>Chargement en cours...</p>
                            
                            ) :
                            // Vérifier que le state plants a bien été rempli :
                            (gardens !== null) ? (
                                <ul>
                                    {gardens.map(garden => (<GardenCard key={garden._id} garden={garden} onDelete={handleSetGardens}/>))}
                                    
                                </ul>
                                
                            ) : (
                                <p>Il semblerait qu'il y ait un bug, impossible de charger les jardins pour l'instant.</p>
                            )
                        }
            
                    </section>
            </>
        )
    
}