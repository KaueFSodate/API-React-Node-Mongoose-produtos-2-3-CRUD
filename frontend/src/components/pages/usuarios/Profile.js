import api from '../../../utils/api';
//import styles from './Profile.module.css'
import Input from '../../form/Input'
import {useState, useEffect } from "react";
import useFlashMessage from '../../../hooks/useFlashMessage'

function Profile() {
    const [usuario, setUsuario] = useState({})
    const {setFlashMessage} = useFlashMessage()
    const [preview, setPreview] = useState("")

    // Pegar o token
    const [token] = useState(localStorage.getItem('token')|| "")

    useEffect(() => {

        // Pegar usuários pelo token
        api.get('/usuarios/checarUsuario',{
        headers:{
            Authorization: `Bearer ${JSON.parse(token)}`
        }
    }).then(response => {
        setUsuario(response.data.currentUser)
    })

    },[token])

    // Pegar os valores dos inputs
    function handleFIleChange(e){
      setPreview(e.target.files[0])
      setUsuario({...usuario, [e.target.name]: e.target.files[0]})
    }

    // Pegar os valores dos inputs
    function handleChange(e){
        setUsuario({...usuario, [e.target.name]: e.target.value})
    }

    // Função para editar o usuário
    async function handleSubmit(e){
        e.preventDefault()
        let msgType = 'success'

            try {
              const formData = new FormData();
              formData.append('image', usuario.image);
              formData.append('nome', usuario.nome);
              formData.append('email', usuario.email);
              formData.append('telefone', usuario.telefone);
              formData.append('senha', usuario.senha);
          
              const response = await api.patch(`/usuarios/editar/${usuario._id}`, formData, {
                headers: {
                  Authorization: `Bearer ${JSON.parse(token)}`,
                  'Content-Type': 'multipart/form-data'
                }
              });
          
              setFlashMessage(response.data.message, msgType);
            } catch (error) {
              setFlashMessage(error.response.data.message || error.message, 'error');
            }
          
                
    }
    
  return (
    <section>
            <h1>Perfil</h1>
            {(usuario.image || preview) && (
              <img src={preview ? URL.createObjectURL(preview) : `${process.env.REACT_APP_API}/images/usuarios/${usuario.image}`} alt={usuario.nome}/>
            )}
            <form onSubmit={handleSubmit}>
                <Input
                text="Imagem: "
                type="file"
                name="image"
                handleOnChange={handleFIleChange}
                />
                <Input
                text="Nome: "
                type="text"
                name="nome"
                placeholder="Digite o seu nome"
                handleOnChange={handleChange}
                value={usuario.nome || ""}
                />
                <Input
                text="E-mail: "
                type="text"
                name="email"
                placeholder="Digite o seu e-mail"
                handleOnChange={handleChange}
                value={usuario.email || ""}
                />
                <Input
                text="Telefone: "
                type="text"
                name="telefone"
                placeholder="Digite o seu telefone"
                handleOnChange={handleChange}
                value={usuario.telefone || ""}
                />
                <Input
                text="Senha: "
                type="password"
                name="senha"
                placeholder="Digite a sua senha"
                handleOnChange={handleChange}
                value={usuario.senha || ""}
                />
                <button type="submit">Registrar</button>
            </form>
        </section>
  )
}

export default Profile