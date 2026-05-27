import { useState } from "react";

const fieldsOptions = {
    "categories": [
        {key :"fleur", label : "À fleurs"},
        {key : "sans_fleur", label : "Sans fleur"},
        {key : "medicinale", label : "Médicinale"},
        {key : "mellifere", label : "Mellifère"},
        {key : "aromatique", label : "Aromatique"},
        {key : "arbuste", label : "Arbuste"},
        {key : "arbre", label : "Arbre"},
        {key : "plante_berge", label : "Plante de berge"},
        {key : "plante_aquatique", label : "Plante aquatique"}
    ],
    "sol": [
        {key : "argileux", label : "Argileux"},
        {key : "limoneux", label : "Limoneux"},
        {key : "sableux", label : "Sableux" },
        {key : "calcaire", label : "Calcaire"} ,
        {key : "humifere", label : "Humifère"},
        {key : "acide", label : "Acide"},
        {key : "tourbeux", label : "Tourbeux"},
        {key : "rocailleux", label : "Rocailleux"},
        {key : "vase", label : "Vase"},
        {key : "graviers", label : "Graviers"}
    ],
    "lumiere": [
        {key : "plein_soleil", label : "Plein soleil"},
        {key : "mi_ombre", label : "Mi-ombre"},
        {key : "ombre", label : "Ombre"}
    ],
    "humidite": [
        {key : "sec", label : "Sec"},
        {key : "tres_sec", label : "Très sec"},
        {key : "moyen", label : "Moyen"},
        {key : "humide", label : "Humide"},
        {key : "tres_humide", label : "Très humide"},
        {key : "aquatique_emergent", label : "Partiellement immergée"},
        {key : "aquatique_immerse", label : "Totalement immergée"}
    ],
    "floraison": [
        {key : "janvier", label : "Janvier"},
        {key : "fevrier", label : "Fevrier"},
        {key : "mars", label : "Mars"},
        {key : "avril", label : "Avril"},
        {key : "mai", label : "Mai"},
        {key : "juin", label : "Juin"},
        {key : "juillet", label : "Juillet"},
        {key : "aout", label : "Août"},
        {key : "septembre", label : "Septembre"},
        {key : "octobre", label : "Octobre"},
        {key : "novembre", label : "Novembre"},
        {key : "decembre", label : "Décembre"}
    ],
    "plantation": [
        {key : "janvier", label : "Janvier"},
        {key : "fevrier", label : "Fevrier"},
        {key : "mars", label : "Mars"},
        {key : "avril", label : "Avril"},
        {key : "mai", label : "Mai"},
        {key : "juin", label : "Juin"},
        {key : "juillet", label : "Juillet"},
        {key : "aout", label : "Août"},
        {key : "septembre", label : "Septembre"},
        {key : "octobre", label : "Octobre"},
        {key : "novembre", label : "Novembre"},
        {key : "decembre", label : "Décembre"}
    ],
    "cycle": [
        {key : "vivace", label : "Vivace"},
        {key : "annuelle", label : "Annuelle"},
        {key : "bisannuelle", label : "Bisannuelle"}
    ],
    "toxicite.niveau": [
        {key : "non_toxique", label : "Non toxique"},
        {key : "faible", label : "Faible"},
        {key : "modere", label : "Modérée"},
        {key : "eleve", label : "Élevée"}
    ]
};

export const OptionsPanel = ({selectedField, onSetFilters, onReturn}) => {

    //* State pour conserver les options cochées :
    const [selectedOptions, setSelectedOptions] = useState([]);

    //* Mise à jour du state au clic (= au changement de valeur) d'un input :
    const handleOptionClick = (option) =>{
        // Cette fonction gère 2 choses : 
            // - La mise à jour du state selectedOptions
            // - L'envoi des options choisies au parent Explorer.jsx via onsetFilters.
        
        //* Créer une variable vide pour y stocker les changements du state avant de les envoyer à Explorer :
        let newSelectedOptions

        // Si selectedOptions inclut déjà l'une des clefs du tableau fieldOptions :
        if (selectedOptions.includes(option.key)) {
            // => Créer un nouveau tableau qui n'inclut pas cette clef :
            newSelectedOptions = selectedOptions.filter(selectOption => selectOption !== option.key);
            
        } // Sinon:
          else {
            // => Créer un nouveau tableau qui inclut cette clef :
            newSelectedOptions = [...selectedOptions, option.key];
        };

        //* Mettre à jour le state avec le nouveau tableau créé (pas de [] nécessaire puisque le tableau lui-même n'est pas dans un tableau) :
        setSelectedOptions(newSelectedOptions);
    };

    //* Transmettre les options cochées à Explorer.jsx via onSetFilters :
    const handleSubmit = () => {
         onSetFilters( { [selectedField.key]: selectedOptions } );
            // = équivalent de { sol : ["calcaire", "argileux"]}
            // = Objet { [clef dynamique] : nom_tableau }
            // Le state selectOptions a été mis à jour à la fin de la fonction précédente => pas besoin ici d'appeler newSelectedOptions.
    }


    return (
        <div className="">
            <button
            type="button"
            aria-label="Revenir au menu des filtres"
            onClick={onReturn}>
                <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M201.4 297.4C188.9 309.9 188.9 330.2 201.4 342.7L361.4 502.7C373.9 515.2 394.2 515.2 406.7 502.7C419.2 490.2 419.2 469.9 406.7 457.4L269.3 320L406.6 182.6C419.1 170.1 419.1 149.8 406.6 137.3C394.1 124.8 373.8 124.8 361.3 137.3L201.3 297.3z"/></svg>
            </button>

            <div>
                <h3>{selectedField.label}</h3>
                
                <ul>
                    {fieldsOptions[selectedField.key].map(option => (
                        // = dans l'objet fieldsOptions, on cible le champ sélectionné qu'on identifie avec sa key, et on fait un map dessus.
                        // [selectedField] = clef DYNAMIQUE donc mise entre [], car elle change selon ce que l'utilisateur a cliqué.
                        <li key={option.key}>
                          <input
                            type="checkbox"
                            id={option.key}
                            name={selectedField.key}
                            onChange={() => handleOptionClick(option)}
                            checked={selectedOptions.includes(option.key)}
                              // .includes() retourne déjà un booléen => si la clef est dans le tableau selectedOptions, checked vaut true, sinon il vaut false.
                          ></input>
                          <label htmlFor={option.key}>
                            {option.label}
                          </label>
                        </li>
                    ))}
                </ul>
            </div>
            <button className="btn-1" type="submit" onClick={handleSubmit}>
                    Enregistrer mes choix
            </button>
        </div>
    )

}