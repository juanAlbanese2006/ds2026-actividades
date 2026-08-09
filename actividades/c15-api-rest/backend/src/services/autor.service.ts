import { Autor, AutorSinId } from "../types/autor.types";

const autores: Autor[] = [
  {
    id: 1,
    nombre: "Gabriel García Márquez",
    nacionalidad: "Colombiana",
    fechaNacimiento: "1927-03-06",
  },
  {
    id: 2,
    nombre: "George Orwell",
    nacionalidad: "Británica",
    fechaNacimiento: "1903-06-25",
  },
  {
    id: 3,
    nombre: "Antoine de Saint-Exupéry",
    nacionalidad: "Francesa",
    fechaNacimiento: "1900-06-29",
  },
];

let proximoId = 4;

export function findAll(): Autor[] {
  return autores;
}

export function findById(id: number): Autor | undefined {
  return autores.find((a) => a.id === id);
}

export function create(datos: AutorSinId): Autor {
  const nuevo: Autor = { id: proximoId++, ...datos };
  autores.push(nuevo);
  return nuevo;
}

export function update(id: number, datos: AutorSinId): Autor | undefined {
  const index = autores.findIndex((a) => a.id === id);
  if (index === -1) return undefined;

  const actualizado: Autor = { id, ...datos };
  autores[index] = actualizado;
  return actualizado;
}

export function remove(id: number): boolean {
  const index = autores.findIndex((a) => a.id === id);
  if (index === -1) return false;
  autores.splice(index, 1);
  return true;
}