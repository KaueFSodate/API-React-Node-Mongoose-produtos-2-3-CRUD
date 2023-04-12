import { createContext } from "react";

import useAuth from "../hooks/useAuth";

const Context = createContext()

function UsuarioProvider({children}){

    const {autenticado, register, logoutUser, loginUser} = useAuth()

    return (
        <Context.Provider value={{autenticado, register, logoutUser, loginUser}}>
            {children}
        </Context.Provider>
    )

}

export {Context, UsuarioProvider}