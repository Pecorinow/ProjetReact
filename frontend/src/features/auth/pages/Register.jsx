import { RegisterForm } from "../components/RegisterForm"

export const Register = () => {
    return (
        <>
            <section className="py-6 px-12 flex items-center gap-6">
                <h1 className="text-4xl text-secondary-800">Créer un compte</h1>
            </section>

            <section className="py-6 px-12 flex items-center gap-6">
                <RegisterForm/>
            </section>
        </>
    )
}