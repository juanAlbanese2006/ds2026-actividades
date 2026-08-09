export interface Libro {
  id: number;
  titulo: string;
  autor: string;
  precio: number;
  imagen: string;
  disponible: boolean;
}

// Para crear un libro sin ID (el servidor lo genera)
export type LibroSinId = Omit<Libro, "id">;