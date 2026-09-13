import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import  LibrosCatalogo  from './Pages/Catalogo';
import  LibroDetalle  from './Pages/LibroDetalle';
import  LibroNuevo  from './Pages/LibroNuevo';
import { Login } from './Pages/Login';  // ← NUEVO

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Catálogo</Link>
        <Link to="/libros/nuevo">Nuevo Libro</Link>
        <Link to="/login">Login</Link>  {/* ← NUEVO */}
      </nav>
      <Routes>
        <Route path="/" element={<LibrosCatalogo />} />
        <Route path="/libros/:id" element={<LibroDetalle />} />
        <Route path="/libros/nuevo" element={<LibroNuevo />} />
        <Route path="/login" element={<Login />} />  {/* ← NUEVO */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;