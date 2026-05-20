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


    return (
        <div className={isFOpen ? "" : ""}>
            <button
            type="button"
            aria-label="Fermer le panneau des filtres"
            onClick={onClose}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M96 128C78.3 128 64 142.3 64 160C64 177.7 78.3 192 96 192L182.7 192C195 220.3 223.2 240 256 240C288.8 240 317 220.3 329.3 192L544 192C561.7 192 576 177.7 576 160C576 142.3 561.7 128 544 128L329.3 128C317 99.7 288.8 80 256 80C223.2 80 195 99.7 182.7 128L96 128zM96 288C78.3 288 64 302.3 64 320C64 337.7 78.3 352 96 352L342.7 352C355 380.3 383.2 400 416 400C448.8 400 477 380.3 489.3 352L544 352C561.7 352 576 337.7 576 320C576 302.3 561.7 288 544 288L489.3 288C477 259.7 448.8 240 416 240C383.2 240 355 259.7 342.7 288L96 288zM96 448C78.3 448 64 462.3 64 480C64 497.7 78.3 512 96 512L150.7 512C163 540.3 191.2 560 224 560C256.8 560 285 540.3 297.3 512L544 512C561.7 512 576 497.7 576 480C576 462.3 561.7 448 544 448L297.3 448C285 419.7 256.8 400 224 400C191.2 400 163 419.7 150.7 448L96 448z"/></svg>
            </button>

            {selectedField === null ? (
                
                <ul>
                    {filterableFields.map(field => (
                        <li key={field.key} className="" >
                            <button type="button" onClick={() => handleFieldClick(field)}>

                                <p>{field.label}</p>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M471.1 297.4C483.6 309.9 483.6 330.2 471.1 342.7L279.1 534.7C266.6 547.2 246.3 547.2 233.8 534.7C221.3 522.2 221.3 501.9 233.8 489.4L403.2 320L233.9 150.6C221.4 138.1 221.4 117.8 233.9 105.3C246.4 92.8 266.7 92.8 279.2 105.3L471.2 297.3z"/></svg>
                                
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
    )
};
                        