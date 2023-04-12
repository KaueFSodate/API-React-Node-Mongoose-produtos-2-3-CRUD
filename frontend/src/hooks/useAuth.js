import api from '../utils/api'
import useFlashMessage from './useFlashMessage'

import {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';


export default function useAuth(){
    const [autenticado, setAutenticado] = useState(false)
    const {setFlashMessage} = useFlashMessage()
    const navigate = useNavigate()

    // Verifica se o usuário está logado assim que a página for carregada
    useEffect(() => {

        const token = localStorage.getItem('token')

        // Se tiver token ira colocar no headers authorization automaticamente
        if(token){
            api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`
            setAutenticado(true)
        }

    },[])

    async function register(usuario){

        let msg = 'Cadastro realizado comusuario sucesso!'
        let type = 'sucess'
    
        try {
            const data = await api.post('/usuarios/registrar', usuario).then((response) => {
                return response.data
            })
            // Executa a função de autenticar
            await authUser(data)
        } catch (error) {
            msg = error.response.data.message
            type = 'error'
        }

        setFlashMessage(msg, type)
    }

    // Vai receber os dados do login
    async function authUser(data){
        setAutenticado(true)

        // Salva token no local storage
        localStorage.setItem('token', JSON.stringify(data.token))

        // Após usuário logado ira ser mandado para a home
        navigate('/')
    }

    // Vai logar os usuários
    async function loginUser(usuario){
        let msg = 'Bem vindo'
        let type = 'sucess'


        try {
            const data = await api.post('/usuarios/login', usuario).then((response) => {
                return response.data
            })
            // Executa a função de autenticar
            await authUser(data)
        } catch (error) {
            msg = error.response.data.message
            type = 'error'
        }

        setFlashMessage(msg, type)

    }

    // Vai deslogar os usuários
    async function logoutUser(){
        const msgText = 'Usuário deslogado'
        const msgType = 'sucess'

        setAutenticado(false)

        // Remover o token
        localStorage.removeItem('token')

        // Remover token do headers authorization
        api.defaults.headers.Authorization = undefined

        // Após usuário deslogado ira ser mandado para o login
        navigate('/login')

        setFlashMessage(msgText, msgType)
    }

    return {autenticado, register, logoutUser, loginUser}
}

