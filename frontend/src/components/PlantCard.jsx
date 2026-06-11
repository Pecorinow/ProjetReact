import { NavLink } from "react-router";

export const PlantCard = (props) => {
    const {plant} = props;

    return (
        <NavLink to={`/plants/${plant._id}`}className="flex flex-col justify-center items-start w-70 h-60">
            <li className="flex flex-col justify-center gap-2">
                <img src={plant.image} className="object-cover w-70 h-40 rounded-md"></img>
                <div>
                    <p>{plant.nom_latin}</p>
                    <p className="font-anaheim-b">{plant.nom_commun}</p>
                </div>
            </li>
        </NavLink>
        
    )
}