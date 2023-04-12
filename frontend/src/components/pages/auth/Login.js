import { useContext, useState } from "react";
import Input from "../../form/Input";
import { Link } from "react-router-dom";

// Contexto
import { Context } from "../../../context/UsuarioContext";  // Acesso aos metodos como inserir e etc

function Login() {
    const [usuario, setUsuario] = useState({})
    const {loginUser} = useContext(Context)

    function handleChange(e){
        setUsuario({...usuario, [e.target.name]: e.target.value})
    }

    function handleSubmit(e){
        e.preventDefault()
        loginUser(usuario)
    }

    return (  
        <section>
            <h1>Registro</h1>
            <form onSubmit={handleSubmit}>
                <Input
                text="E-mail: "
                type="text"
                name="email"
                placeholder="Digite o seu e-mail"
                handleOnChange={handleChange}
                />
                <Input
                text="Senha: "
                type="password"
                name="senha"
                placeholder="Digite a sua senha"
                handleOnChange={handleChange}
                />
                <button type="submit">Login</button>
                <p>Não tem conta? <Link to='/register'>Cadastrar</Link></p>
            </form>
        </section>
    );
}

export default Login;