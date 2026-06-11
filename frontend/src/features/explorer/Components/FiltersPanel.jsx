import { useState, useEffect } from "react";
import { OptionsPanel } from "./OptionsPanel"

const filterableFields = [
        { key: 'categories', label: 'Catégorie' },
        { key: 'sol', label: 'Type de sol' },
        { key: 'lumiere', label: 'Luminosité' },
        { key: 'humidite', label: 'Degré d\'humidité' },
        { key: 'floraison', label: 'Période de floraison' },
        { key: 'plantation', label: 'Période de plantation' },
        { key: 'cycle', label: 'Cycle de vie' },
        { key: 'toxicite.niveau', label: 'Toxicité' }
    ]

export const FiltersPanel = ({isFOpen, onClose, onSetFilters}) => {
    // Attention, dans les parenthèses () on passe un OBJET props => sans les accolades {}, isFOpen vaudra l'objet props entier, et onClose et onSetFilters seront undefined !
    // isFOpen : utilisé dans le useEffect pour conditionner l'ouverture de FiltersPanel. Variable qui contient le state isFiltersOpen de Explorer.jsx.
    // onClose : utilisé dans le return pour qu'au clic sur le bouton de la croix, le state isFiltersOpen passe à false et le panneau se ferme.
    // onSetFilters : onSetFilters (vide de base {} ) doit être passé à OptionsPanel dans le return, pour y recevoir les options cochées pour pouvoir les repasser à FiltersPanel, qui lui-même doit les passer à setFilters dans le Explorer.jsx.

    //* Gérer l'affichage de FiltersPanel :
    useEffect(() => {
        if (isFOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = ""
        }

        return () => {
            document.body.style.overflow = ""
        }
    }, [isFOpen]);

    //* State pour sauvegarder localement le champ sélectionné :
    const [selectedField, setSelectedField] = useState(null);
        // null car, par défaut, au chargement de la page, aucun champ n'est sélectionné.
    
    //* Mise à jour du state selectedField pour conditionner l'ouverture du panneau OptionsPanel au clic sur le bouton :
    const handleFieldClick = (field) => {
        setSelectedField(field);
            // "field" peut s'écrire n'importe comment, c'est juste le nom de la valeur qu'on va définir pour chaque élément de FiltrableField dans le .map() qu'on va faire dans le return.
    }

     if (!isFOpen) return null;
     
    return (
        <>
        <div
            className={`fixed inset-0 bg-black/40 z-70 transition-opacity duration-300 ${
            isFOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            }`}
            onClick={onClose}
        />
        
        <div className={`fixed top-[90px] right-0 w-[700px] h-[calc(100dvh-90px)] overflow-y-auto bg-main-00 px-16 pt-16 pb-28 z-[80] transition-transform duration-300 ease-in-out ${
          isFOpen ? "translate-x-0" : "translate-x-full"
        }`}
        inert={!isFOpen}>
            <button
            type="button"
            className="ml-auto block bg-main-00 border-none"
            aria-label="Fermer le panneau des filtres"
            onClick={onClose}>
                <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M183.1 137.4C170.6 124.9 150.3 124.9 137.8 137.4C125.3 149.9 125.3 170.2 137.8 182.7L275.2 320L137.9 457.4C125.4 469.9 125.4 490.2 137.9 502.7C150.4 515.2 170.7 515.2 183.2 502.7L320.5 365.3L457.9 502.6C470.4 515.1 490.7 515.1 503.2 502.6C515.7 490.1 515.7 469.8 503.2 457.3L365.8 320L503.1 182.6C515.6 170.1 515.6 149.8 503.1 137.3C490.6 124.8 470.3 124.8 457.8 137.3L320.5 274.7L183.1 137.4z"/></svg>
            </button>

            {selectedField === null ? (
                
                <ul className="flex flex-col gap-3">
                    {filterableFields.map(field => (
                        <li key={field.key} className="w-full " >
                            <button className="flex flex-row items-center justify-between w-full" type="button" onClick={() => handleFieldClick(field)}>

                                <p>{field.label}</p>
                                <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M471.1 297.4C483.6 309.9 483.6 330.2 471.1 342.7L279.1 534.7C266.6 547.2 246.3 547.2 233.8 534.7C221.3 522.2 221.3 501.9 233.8 489.4L403.2 320L233.9 150.6C221.4 138.1 221.4 117.8 233.9 105.3C246.4 92.8 266.7 92.8 279.2 105.3L471.2 297.3z"/></svg>
                                
                            </button>

                        </li>
                    ))}
                </ul>

            ) : (
                <OptionsPanel
                onReturn={() => setSelectedField(null)}
                selectedField={selectedField}
                onSetFilters={onSetFilters}/>
            )}

        </div>
        </>
    )
};
                        