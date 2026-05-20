import { useState } from "react";

const FieldsOptions = {
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
}

export const OptionsPanel = ({selectedField, onSetFilters, onReturn}) => {
    
    const [selectedOptions, setSelectedOptions] = useState([]);

    return (
        <div className="">
            <button
            type="button"
            aria-label="Revenir au menu des filtres"
            onClick={onReturn}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M96 128C78.3 128 64 142.3 64 160C64 177.7 78.3 192 96 192L182.7 192C195 220.3 223.2 240 256 240C288.8 240 317 220.3 329.3 192L544 192C561.7 192 576 177.7 576 160C576 142.3 561.7 128 544 128L329.3 128C317 99.7 288.8 80 256 80C223.2 80 195 99.7 182.7 128L96 128zM96 288C78.3 288 64 302.3 64 320C64 337.7 78.3 352 96 352L342.7 352C355 380.3 383.2 400 416 400C448.8 400 477 380.3 489.3 352L544 352C561.7 352 576 337.7 576 320C576 302.3 561.7 288 544 288L489.3 288C477 259.7 448.8 240 416 240C383.2 240 355 259.7 342.7 288L96 288zM96 448C78.3 448 64 462.3 64 480C64 497.7 78.3 512 96 512L150.7 512C163 540.3 191.2 560 224 560C256.8 560 285 540.3 297.3 512L544 512C561.7 512 576 497.7 576 480C576 462.3 561.7 448 544 448L297.3 448C285 419.7 256.8 400 224 400C191.2 400 163 419.7 150.7 448L96 448z"/></svg>
            </button>

            <div>
                <h3>{selectedField.label}</h3>

                <ul>
                    
                </ul>
            </div>
        </div>
    )

}