import App from "./App";
import { Home } from "./layout/pages/Home";
import { Explore } from "./features/explorer/Explorer";
import { PlantDetails } from "./features/plant/PlantDetails";


/**
 * @type { import( react-router ).RouteObject}
*/

export const routes = [
    {
        path : '/',
        element : <App/>,
        children : [
            {
                index:true,
                element: <Home/>

            },
            {
                path : 'plants',
                element : <Explore/>
            },
            {
                path:'plants/:id',
                element : <PlantDetails/>
            }
        ]
    }
]