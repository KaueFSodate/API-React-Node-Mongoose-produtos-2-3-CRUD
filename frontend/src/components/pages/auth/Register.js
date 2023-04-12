import { useContext, useState } from "react";
import Input from "../../form/Input";

// Contexto
import { Context } from "../../../context/UsuarioContext";  // Acesso aos metodos como inserir e etc

function Register() {
    const [usuario, setUsuario] = useState({})
    const {register} = useContext(Context)

    function handleChange(e){
        setUsuario({...usuario, [e.target.name]: e.target.value})
    }

    function handleSubmit(e){
        e.preventDefault()
        register(usuario)
    }

    return (  
        <section>
            <h1>Registro</h1>
            <form onSubmit={handleSubmit}>
                <Input
                text="Nome: "
                type="text"
                name="nome"
                placeholder="Digite o seu nome"
                handleOnChange={handleChange}
                />
                <Input
                text="E-mail: "
                type="text"
                name="email"
                placeholder="Digite o seu e-mail"
                handleOnChange={handleChange}
                />
                <Input
                text="Telefone: "
                type="text"
                name="telefone"
                placeholder="Digite o seu telefone"
                handleOnChange={handleChange}
                />
                <Input
                text="Senha: "
                type="password"
                name="senha"
                placeholder="Digite a sua senha"
                handleOnChange={handleChange}
                />
                <Input
                text="Confirmar sua senha: "
                type="password"
                name="confirmSenha"
                placeholder="Confirme a sua senha"
                handleOnChange={handleChange}
                />
                <button type="submit">Registrar</button>
            </form>
        </section>
    );
}

export default Register;