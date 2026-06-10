import { NavLink } from "react-router";

export const PlantCard = (props) => {
    const {plant} = props;

    return (
        <NavLink to={`/plants/${plant._id}`}>
            <li className=''>
                <img src={plant.image}></img>
                <div>
                    <p>{plant.nom_latin}</p>
                    <p>{plant.nom_commun}</p>
                </div>
            </li>
        </NavLink>
        
    )
}