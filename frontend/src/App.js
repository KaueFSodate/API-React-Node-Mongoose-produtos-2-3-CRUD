import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

// Componentes
import NavBar from './components/layout/NavBar'
import Footer from './components/layout/Footer'
import Container from './components/layout/Container'
import Message from "./components/layout/Message";


// Pages
import Home from './components/pages/Home'
import Login from './components/pages/auth/Login'
import Register from './components/pages/auth/Register'
import Profile from "./components/pages/usuarios/Profile";
import MyProdutos from "./components/pages/produtos/MyProdutos";
import CadastrarProdutos from "./components/pages/produtos/CadastrarProdutos";
import EditarProduto from "./components/pages/produtos/EditarProduto";

// Context
import { UsuarioProvider } from "./context/UsuarioContext";

function App() {
  return (
    
      <Router>
        <UsuarioProvider>
          <NavBar/>
          <Message/>
          <Container>
            <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/register" element={<Register/>}/>
              <Route path="/usuario/perfil" element={<Profile/>}/>
              <Route path="/produtos/meusprodutos" element={<MyProdutos/>}/>
              <Route path="/produtos/cadastrar" element={<CadastrarProdutos/>}/>
              <Route path="/produto/editar/:id" element={<EditarProduto/>}/>
            </Routes>
          </Container>
          <Footer/>
        </UsuarioProvider>
    </Router>
    
  );
}

export default App;
