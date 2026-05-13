import { NavLink } from "react-router";

export const Header = () => {
    return (
        <header>
            <div>
                <img className="w-16" src="/images/logo.png" alt="Logo du site - Fleur bleue"></img>
                <p>Garden <span>Pal</span></p>
            </div>
            <div>
                <nav>
                    <li>
                        <NavLink to="">Accueil</NavLink>
                    </li>
                    <li>
                        <NavLink to="/plants">Explorer</NavLink>
                    </li>
                </nav>
                <btn></btn>
            </div>
        </header>
    )
}