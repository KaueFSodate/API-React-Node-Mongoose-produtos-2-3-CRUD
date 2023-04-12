import { Link } from "react-router-dom";
import styles from './NavBar.module.css'
import { useContext } from "react";

// Context
import { Context } from "../../context/UsuarioContext";



function NavBar() {
    const {autenticado, logoutUser} = useContext(Context)

    return (  
        <nav className={styles.navBar}>
            <ul>
                <li>
                    <Link to='/'>Home</Link>
                </li>
                {
                    //Se estiver autenticado
                    autenticado ?(
                        <>
                            <li>
                                <Link to='/produtos/meusprodutos'>Meus produtos</Link>
                            </li>
                            <li>
                                <Link to='/usuario/perfil'>Perfil</Link>
                            </li>
                            <li onClick={logoutUser}>Sair</li>
                        </>
                    )
                    
                    // Se não
                    :( <><li>
                        <Link to='/login'>Entrar</Link>
                    </li>
                    <li>
                        <Link to='/register'>Cadastrar</Link>
                    </li></>)
                }
            </ul>
        </nav>
    );
}

export default NavBar;