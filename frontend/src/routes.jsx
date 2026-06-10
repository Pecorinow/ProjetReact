import App from "./App";
import { Home } from "./layout/pages/Home";
import { Explore } from "./features/explorer/Explorer";
import { PlantDetails } from "./features/plant/PlantDetails";
import { Register } from './features/auth/pages/Register.jsx';
import { Login} from './features/auth/pages/Login.jsx';
import { ProtectedPage } from "./components/ProtectedPage.jsx";
import { Gardens } from "./features/gardens/Gardens.jsx";
// import { Garden } from "./features/garden/Garden.jsx";



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
            },
            {
                path:'gardens',
                element : <ProtectedPage> <Gardens/> </ProtectedPage>
            },
            // {
            //     path: 'gardens/:id',
            //     element : </Garden>
            // },
            {
                path: 'auth',
                children : [
                    {
                        path: 'register',
                        element: <Register/>
                    },
                    {
                        path: 'login',
                        element: <Login/>
                    }
                ]
            }
        ]
    }
]