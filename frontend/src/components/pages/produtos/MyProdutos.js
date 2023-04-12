import React from 'react'
import { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'

// utils
import api from '../../../utils/api'

// Hooks
import useFlashMessage from '../../../hooks/useFlashMessage'

function MyProdutos() {
    const [produtos, setProdutos] = useState([])
    const [token] = useState(localStorage.getItem('token'))

    // Usar as mensagens
    const {setFlashMessage} = useFlashMessage()

    useEffect(() => {
      api.get('/produtos/MeusProdutosCadastrados', {
        // Mandar o token para o headers
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`
          }
      }).then((response) => {
        setProdutos(response.data)
      })
    }, [token])

    async function removeProduto(id) {

      let msgType = 'success'

      const data = await api.delete(`/produtos/deletar/${id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        const updatedProdutos = produtos.filter((produto) => produto._id != id)
        setProdutos(updatedProdutos)
        return response.data
      })
      .catch((err) => {
        console.log(err)
        msgType = 'error'
        return err.response.data
      })

      setFlashMessage(data.message, msgType)

    }

    async function concluirCompra(id) {}


  return (
    <section>
        <h1>Meus Produtos</h1>
        <Link to= '/produtos/cadastrar'>Cadastrar produto</Link>
      
            {produtos.length > 0 &&
              produtos.map((produto) => (
                  <div key={produto._id}>
                    <img
                      src={`${process.env.REACT_APP_API}/images/produtos/${produto.imagens[0]}`}
                      alt={produto.nome}
                    />
                    <p>Nome: {produto.nome}</p>
                    <p>Descrição: {produto.descricao}</p>
                    <p>Valor: {produto.valor}</p>
                    <div>
                    {produto.available ? (
                      <>
                      {produto.comprador && (
                        <button
                          onClick={() => {
                            concluirCompra(produto._id)
                          }}
                        >
                        Concluir adoção
                        </button>
                      )}

                      <Link to={`/produto/editar/${produto._id}`}>Editar</Link>
                      <button
                        onClick={() => {
                          removeProduto(produto._id)
                        }}
                      >
                      Excluir
                    </button>
                  </> 
                  ) : (
                    <p>Produto já comprado</p>
                    )}
                    </div><br></br>
                  </div>
                )
              )
            }
            {produtos.length === 0 && <p>Não há produtos cadastrados</p>}
    </section>
    
  )
}

export default MyProdutos