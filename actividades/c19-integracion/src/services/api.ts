const BASE = import.meta.env.VITE_API_URL;

// Obtener token del localStorage
const obtenerToken = (): string | null => {
  return localStorage.getItem("token");
};

// Guardar token
export const guardarToken = (token: string): void => {
  localStorage.setItem("token", token);
};

// Eliminar token (logout)
export const borrarToken = (): void => {
  localStorage.removeItem("token");
};

// Obtener usuario del token
export const obtenerUsuario = (): { id: number; rol: string } | null => {
  const token = obtenerToken();
  if (!token) return null;
  
  try {
    const payload = token.split('.')[1];
    const decoded = atob(payload);
    return JSON.parse(decoded);
  } catch {
    return null;
  }
};

// apiFetch: la única puerta de salida
export async function apiFetch<T>(
  ruta: string,
  opciones: RequestInit = {}
): Promise<T> {
  const token = obtenerToken();

  // ⚠️ Usar Record<string, string> para evitar el error de tipo
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  // Agregar headers adicionales si existen
  if (opciones.headers) {
    Object.assign(headers, opciones.headers);
  }

  // Agregar token si existe
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(`${BASE}${ruta}`, {
    ...opciones,
    headers,
  });

  // Intentar parsear JSON, si falla, usar null
  const cuerpo = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(cuerpo?.error ?? `Error ${res.status}`);
  }

  return cuerpo as T;
}