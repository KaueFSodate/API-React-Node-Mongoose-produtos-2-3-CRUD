import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'

// Componentes
import Input from '../../form/Input'

// utils
import api from '../../../utils/api'

// Hooks
import useFlashMessage from '../../../hooks/useFlashMessage'

  

function EditarProduto() {

    const [produto, setProduto] = useState({})
    const [preview, setPreview] = useState([])
    const { id } = useParams()
    const [token] = useState(localStorage.getItem('token'))
    const navigate = useNavigate()

    // Usar as mensagens
    const {setFlashMessage} = useFlashMessage()

    useEffect(() => {
        api.get(`/produtos/ProdutosCadastrados/${id}`, {
            headers: {
              Authorization: `Bearer ${JSON.parse(token)}`,
            },
          })
          .then((response) => {
            setProduto(response.data)
          })
      }, [token, id])


    // Pegar os valores dos inputs file
    function handleFIleChange(e){
        setPreview(Array.from(e.target.files))
        setProduto({ ...produto, imagens: [...e.target.files] })
    }

    // Pegar os valores dos inputs
    function handleChange(e) {
        setProduto({...produto, [e.target.name]: e.target.value})
    }

    // Função para editar o produto
    async function handleEdit(e){
        e.preventDefault()
        let msgType = 'success'
        
        const formData = new FormData()

        const produtoFormData = await Object.keys(produto).forEach((key) => {
            if (key === 'imagens') {
              for (let i = 0; i < produto[key].length; i++) {
                formData.append(`imagens`, produto[key][i])
              }
            } else {
              formData.append(key, produto[key])
            }
          })
        
          formData.append('produtos', produtoFormData)

          const data = await api.patch(`produtos/editar/${produto._id}`, formData, {
                headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
                'Content-Type': 'multipart/form-data',
                },
            })
            .then((response) => {
                console.log(response.data)
                return response.data
            })
            .catch((err) => {
                console.log(err)
                msgType = 'error'
                return err.response.data
            })
        setFlashMessage(data.message, msgType)
        navigate('/produtos/meusprodutos')
        console.log(produto)

    }
  return (
    <form onSubmit={handleEdit}>
              <div>
                <h1>{produto.nome}</h1>
                  {preview.length > 0
                    ? preview.map((image, index) => (
                        <img
                          src={URL.createObjectURL(image)}
                          alt={produto.nome}
                          key={`${produto.nome}+${index}`}
                        />
                      ))
                      : produto.imagens &&
                      produto.imagens.map((image, index) => (
                        <img
                          src={`${process.env.REACT_APP_API}/images/produtos/${image}`}
                          alt={produto.nome}
                          key={`${produto.nome}+${index}`}
                        />
                      ))}
                </div>
                <Input
                text="Imagem: "
                type="file"
                name="imagens"
                handleOnChange={handleFIleChange}
                multiple={true}
                />
                <Input
                text="Produto: "
                type="text"
                name="nome"
                placeholder="Digite o nome do produto"
                handleOnChange={handleChange}
                value={produto.nome || ""}
                />
                <Input
                text="Descrição: "
                type="text"
                name="descricao"
                placeholder="Digite a descrição do produto"
                handleOnChange={handleChange}
                value={produto.descricao || ""}
                />
                <Input
                text="Valor: "
                type="number"
                name="valor"
                placeholder="Digite o valor do produto"
                handleOnChange={handleChange}
                value={produto.valor || ""}
                />
                <button type="submit">Editar produto</button>
              </form>
  )
}

export default EditarProduto