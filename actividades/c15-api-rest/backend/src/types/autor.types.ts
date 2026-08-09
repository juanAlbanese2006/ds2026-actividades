export interface Autor {
  id: number;
  nombre: string;
  nacionalidad: string;
  fechaNacimiento?: string; // opcional
}

export type AutorSinId = Omit<Autor, "id">;