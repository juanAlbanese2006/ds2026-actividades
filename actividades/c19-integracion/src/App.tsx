import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Catalogo from './Pages/Catalogo';
import LibroDetalle from './Pages/LibroDetalle';
import LibroNuevo from './Pages/LibroNuevo';
import {Login} from './Pages/Login';

function App() {
  return (
    <BrowserRouter>  {/* ⚠️ El <BrowserRouter> va SOLO acá */}
      <nav>
        <Link to="/">Catálogo</Link>
        <Link to="/libros/nuevo">Nuevo Libro</Link>
        <Link to="/login">Login</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Catalogo />} />
        <Route path="/libros/:id" element={<LibroDetalle />} />
        <Route path="/libros/nuevo" element={<LibroNuevo />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;