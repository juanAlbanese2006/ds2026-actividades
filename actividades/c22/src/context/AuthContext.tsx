import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';
import { apiFetch, guardarToken, borrarToken, obtenerToken } from '../services/api';
import type { Usuario, Credenciales, Rol } from '../Types/sesionType';

interface AuthContextType {
  usuario: Usuario | null;
  cargando: boolean;
  estaAutenticado: boolean;
  tieneRol: (rol: Rol) => boolean;
  login: (credenciales: Credenciales) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [cargando, setCargando] = useState(obtenerToken() !== null);

  // Rehidratación: al montar, si hay token, preguntar quién soy
  useEffect(() => {
    if (!obtenerToken()) return;

    apiFetch<Usuario>('/auth/yo')
      .then(setUsuario)
      .catch(() => borrarToken())
      .finally(() => setCargando(false));
  }, []);

  // Login
  const login = useCallback(async (credenciales: Credenciales) => {
    const sesion = await apiFetch<{ token: string; usuario: Usuario }>(
      '/auth/login',
      {
        method: 'POST',
        body: JSON.stringify(credenciales),
      }
    );
    guardarToken(sesion.token);
    setUsuario(sesion.usuario);
  }, []);

  // Logout
  const logout = useCallback(() => {
    borrarToken();
    setUsuario(null);
  }, []);

  // Escuchar el evento de sesión expirada
  useEffect(() => {
    window.addEventListener('sesion-expirada', logout);
    return () => window.removeEventListener('sesion-expirada', logout);
  }, [logout]);

  const estaAutenticado = usuario !== null;
  const tieneRol = (rol: Rol) => usuario?.rol === rol;

  return (
    <AuthContext.Provider
      value={{
        usuario,
        cargando,
        estaAutenticado,
        tieneRol,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de <AuthProvider>');
  }
  return context;
}