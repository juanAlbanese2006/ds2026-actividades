import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Layout/Header';
import Catalogo from './Pages/Catalogo';
import LibroDetalle from './Pages/LibroDetalle';
import LibroNuevo from './Pages/LibroNuevo';
import Login from './Pages/Login';
import SinPermiso from './Pages/SinPermiso';
import { PrivateRoute } from './components/PrivateRoute';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Header />
        <Routes>
          {/* Rutas públicas */}
          <Route path="/" element={<Catalogo />} />
          <Route path="/libros/:id" element={<LibroDetalle />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sin-permiso" element={<SinPermiso />} />

          {/* Rutas protegidas (solo ADMIN) */}
          <Route element={<PrivateRoute rol="ADMIN" />}>
            <Route path="/libros/nuevo" element={<LibroNuevo />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;