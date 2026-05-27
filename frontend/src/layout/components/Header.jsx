import { NavLink } from "react-router";

export const Header = () => {
    return (
        <header className='flex flex-row justify-between py-4 px-8 bg-main-00'>
            <div>
                <img className="w-10" src="/images/logo.png" alt="Logo du site - Fleur bleue"></img>
                <p className='font-averia-r text-main-600 text-2xl'>Garden <span className='text-secondary-500'>Pal</span></p>
            </div>
            <div>
                <nav className='flex items-center'>
                    <ul className='flex flex-row justify-between gap-4'>
                        <li>
                            <NavLink to="">Accueil</NavLink>
                        </li>
                        <li>
                            <NavLink to="/plants">Explorer</NavLink>
                        </li>
                    </ul>
                </nav>
                <button></button>
            </div>
        </header>
    )
}