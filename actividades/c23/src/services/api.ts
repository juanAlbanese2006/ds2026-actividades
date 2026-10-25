const BASE = import.meta.env.VITE_API_URL;

// Clase de error personalizada
export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.name = "ApiError";
  }
}

export const obtenerToken = (): string | null => {
  return localStorage.getItem("token");
};

export const guardarToken = (token: string): void => {
  localStorage.setItem("token", token);
};

export const borrarToken = (): void => {
  localStorage.removeItem("token");
};

export async function apiFetch<T>(
  ruta: string,
  opciones: RequestInit = {}
): Promise<T> {
  const token = obtenerToken();

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (opciones.headers) {
    Object.assign(headers, opciones.headers);
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(`${BASE}${ruta}`, {
    ...opciones,
    headers,
  });

  const cuerpo = await res.json().catch(() => null);

  // Si es 401 Y mandamos token → sesión vencida
  if (res.status === 401 && token) {
    window.dispatchEvent(new Event('sesion-expirada'));
  }

  if (!res.ok) {
    throw new ApiError(res.status, cuerpo?.error ?? `Error ${res.status}`);
  }

  return cuerpo as T;
}