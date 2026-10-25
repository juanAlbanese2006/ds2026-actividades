import { Navigate, Outlet } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import type { Rol } from '../Types/sesionType';

interface PrivateRouteProps {
  rol?: Rol;
}

export function PrivateRoute({ rol }: PrivateRouteProps) {
  const { usuario, cargando } = useAuth();

  // 1. ¿Ya sé quién sos?
  if (cargando) {
    return (
      <div className="d-flex justify-content-center py-5">
        <Spinner animation="border" />
      </div>
    );
  }

  // 2. ¿Sos alguien? (401)
  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  // 3. ¿Podés? (403)
  if (rol && usuario.rol !== rol) {
    return <Navigate to="/sin-permiso" replace />;
  }

  // Si pasó todo: renderizá la ruta hija
  return <Outlet />;
}