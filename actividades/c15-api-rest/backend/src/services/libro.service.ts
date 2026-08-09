import { Libro, LibroSinId } from "../types/libro.types";

// Datos hardcodeados (como los tenías en C14)
const libros: Libro[] = [
  {
    id: 1,
    titulo: "El principito",
    autor: "Antoine de Saint-Exupéry",
    precio: 4500,
    imagen: "https://images.cdn3.buscalibre.com/fit-in/300x300/6b/9f/6b9f6f0e3c7b8c4d8e4f6a7b8c9d0e1f.jpg",
    disponible: true,
  },
  {
    id: 2,
    titulo: "Cien años de soledad",
    autor: "Gabriel García Márquez",
    precio: 5200,
    imagen: "https://images.cdn3.buscalibre.com/fit-in/300x300/1a/2b/1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d.jpg",
    disponible: true,
  },
  {
    id: 3,
    titulo: "1984",
    autor: "George Orwell",
    precio: 3800,
    imagen: "https://images.cdn3.buscalibre.com/fit-in/300x300/2b/3c/2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e.jpg",
    disponible: false,
  },
];

let proximoId = 4;

// Obtener todos los libros (opcionalmente filtrados por disponibilidad)
export function findAll(disponible?: string): Libro[] {
  if (disponible === undefined) return libros;
  const esDisponible = disponible === "true";
  return libros.filter((l) => l.disponible === esDisponible);
}

// Obtener un libro por ID
export function findById(id: number): Libro | undefined {
  return libros.find((l) => l.id === id);
}

// Crear un nuevo libro
export function create(datos: LibroSinId): Libro {
  const nuevo: Libro = {
    id: proximoId++,
    ...datos,
  };
  libros.push(nuevo);
  return nuevo;
}

// Actualizar un libro existente
export function update(id: number, datos: LibroSinId): Libro | undefined {
  const index = libros.findIndex((l) => l.id === id);
  if (index === -1) return undefined;

  const actualizado: Libro = {
    id,
    ...datos,
  };
  libros[index] = actualizado;
  return actualizado;
}

// Eliminar un libro
export function remove(id: number): boolean {
  const index = libros.findIndex((l) => l.id === id);
  if (index === -1) return false;
  libros.splice(index, 1);
  return true;
}