import { LoginForm } from "../components/LoginForm"

export const Login = () => {
    return (
        <>
            <section className="py-6 px-12 flex items-center gap-6">
                            <h1 className="text-4xl text-main-800">Créer un compte</h1>
                        </section>
            
                        <section className="py-6 px-12 flex items-center gap-6">
                            <LoginForm/>
                        </section>
        </>
    )
}