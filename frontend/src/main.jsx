import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router'
import { routes } from './routes.jsx'

// Création d'un router à partir du fichier routes.jsx :
const router = createBrowserRouter(routes);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* Création d'un composant Router Provider qui utilise le router qu'on a créé au-dessus : */}
    <RouterProvider router={router}>
      
    </RouterProvider>
  </StrictMode>,
)
