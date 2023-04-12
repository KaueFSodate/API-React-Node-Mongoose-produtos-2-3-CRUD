import api from "../../utils/api";

import styles from './Home.module.css'

import {useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Home() {
    const [produtos, setProdutos] = useState([])
    useEffect(() => {
        api.get('/produtos/ProdutosCadastrados').then((response) => {
          setProdutos(response.data)
        })
      }, [])

    return (  
        <section>
            <div className={styles.produto_home_header}>
                <h1>Compre um produto</h1>
                <p>Veja os detalhes de cada um</p>
            </div>
            <div className={styles.produto_container}> 
                {produtos.length > 0 &&
                produtos.map((produto) => (
                    <div className={styles.produto_card} key={produto._id}>
                    <div style={{
                        backgroundImage: `url(${process.env.REACT_APP_API}/images/produtos/${produto.imagens[0]})`,
                        }} className={styles.produto_card_image}
                    ></div>
                    <h3>{produto.nome}</h3>
                    <p>
                        <span className="bold">Valor:</span> {produto.valor}
                    </p>
                    {produto.available ? (
                        <Link to={`/produto/${produto._id}`}>Mais detalhes</Link>
                    ) : (
                        <p className={styles.adopted_text}>Comprado!</p>
                    )}
                    </div>
                ))}
                {produtos.length === 0 && (
                <p>Não há produtos cadastrados ou disponíveis para compra!</p>
                )}
            </div>
        </section>
    );
}

export default Home;