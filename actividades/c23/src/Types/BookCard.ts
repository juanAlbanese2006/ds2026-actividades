export interface Autor {
  id: number;
  nombre: string;
  nacionalidad: string;
}

export interface LibroCardProps {
  id: number;
  titulo: string;
  autor: Autor;  // ← Ahora es un objeto, no string
  precio: number;
  imagen: string;
  disponible: boolean;
}