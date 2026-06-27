import Catalogo from "./Catalogo.tsx"
import { Routes, Route } from 'react-router-dom';
import Navbar from '../components/Navbar.tsx';
import Footer from '../components/Footer.tsx';



function Home() {
  return (
    <>
      <div>
    <h1>📚 Mi Librería</h1>
    <p>
      Un espacio donde encontrarás tus libros favoritos, desde clásicos hasta las últimas novedades.
    </p>
    
    <button>Explorar Catálogo</button>
  </div>
    </>
  );
}

export default Home;
