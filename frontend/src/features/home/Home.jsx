import { NavLink } from "react-router"

export const Home = () => {
    return (
        <>
        <section className="min-h-screen flex flex-col items-center gap-13 pt-45 px-20 bg-main-100 relative">
                <h1 className="text-main-600 text-7xl font-averia-r">
                    Plantez <span className="text-secondary-500">malin</span>, plantez <span className="text-secondary-500">local</span>
                </h1>
                <div className="flex flex-col items-center gap-0.5 text-2xl text-secondary-500">
                    <p>Vous avez envie de jardiner, mais aucune idée ce qui pousserait bien chez vous ?</p>
                    <p>Vous voulez nourir les abeilles, mais aussi éviter d’empoisonner votre chat ?</p>
                    <p>Vous aimez les belles plantes, mais pas trop les invasives ?</p>
                    <p>En quelques clics, Garden Pal trouve la plante la mieux adaptée à vos besoins !</p>
                </div>
                <div className="flex flex-row justify-between gap-5">
                    <a className="btn-2">
                        Comment ça marche ?
                    </a>
                    <NavLink to="/plants" className="btn-3">
                        Parcourir les plantes
                    </NavLink>
                </div>

                <img src="/images/Home-1.png" alt="Illustration d'un massif de plantes" className="w-80 absolute bottom-0 right-0"></img>
                <img src="/images/Home-2.png" alt="Illustration d'un massif de plantes" className="w-110 absolute bottom-0 left-0"></img>

        </section>
        <section>

        </section>
        </>
    )
}