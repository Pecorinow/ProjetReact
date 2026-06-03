import App from "./App";
import { Home } from "./layout/pages/Home";
import { Explore } from "./features/explorer/Explorer";
import { PlantDetails } from "./features/plant/PlantDetails";
import { Register } from './features/auth/pages/Register.jsx'
import { ProtectedPage } from "./components/ProtectedPage.jsx";


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
            {
                path: 'auth',
                children : [
                    {
                        path: 'register',
                        element: <Register/>
                    }
                    // {
                    //     path: 'login',
                    //     element: <Login/>
                    // }
                ]
            }
        ]
    }
]