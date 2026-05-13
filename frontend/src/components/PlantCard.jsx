

export const PlantCard = (props) => {
    const {plant} = props;

    return (
        
        <li className=''>
            <img src={plant.image}></img>
            <div>
                <p>{plant.nom_latin}</p>
                <p>{plant.nom_commun}</p>
            </div>
        </li>
    )
}
// <ul>
//     {data.map(plant =>(
//         <li key={plant._id} className=''>
//             <img></img>
//             <div>
//                 <p>{plant.nom_latin}</p>
//                 <p>{plant.nom_commun}</p>
//             </div>
//         </li>
//     ))

//     }
// </ul>