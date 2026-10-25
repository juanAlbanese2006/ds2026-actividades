import { prisma } from "../config/prisma";
import { Prisma } from "../generated/prisma/client";

// Tipos con las relaciones incluidas
export type LibroConAutor = Prisma.LibroGetPayload<{
  include: { autor: true };
}>;

export type LibroDetalle = Prisma.LibroGetPayload<{
  include: { autor: true; categorias: true };
}>;

// Listado: incluye autor
export async function findAll(disponible?: string): Promise<LibroConAutor[]> {
  const where = disponible !== undefined
    ? { disponible: disponible === "true" }
    : {};

  return await prisma.libro.findMany({
    where,
    include: { autor: true },
    orderBy: { id: "asc" },
  });
}

// Detalle: incluye autor y categorías
export async function findById(id: number): Promise<LibroDetalle | null> {
  return await prisma.libro.findUnique({
    where: { id },
    include: {
      autor: true,
      categorias: true,
    },
  });
}

// Crear: recibe autorId
export async function create(data: {
  titulo: string;
  precio: number;
  imagen: string;
  disponible?: boolean;
  autorId: number;
}) {
  return await prisma.libro.create({
    data: {
      titulo: data.titulo,
      precio: data.precio,
      imagen: data.imagen,
      disponible: data.disponible ?? true,
      autor: { connect: { id: data.autorId } },
    },
    include: { autor: true },
  });
}

// Actualizar
export async function update(
  id: number,
  data: Partial<{
    titulo: string;
    precio: number;
    imagen: string;
    disponible: boolean;
    autorId: number;
  }>
) {
  const existe = await prisma.libro.findUnique({ where: { id } });
  if (!existe) return null;

  const updateData: any = { ...data };
  if (data.autorId) {
    updateData.autor = { connect: { id: data.autorId } };
    delete updateData.autorId;
  }

  return await prisma.libro.update({
    where: { id },
    data: updateData,
    include: { autor: true },
  });
}

// Eliminar
export async function remove(id: number): Promise<boolean> {
  const existe = await prisma.libro.findUnique({ where: { id } });
  if (!existe) return false;

  await prisma.libro.delete({ where: { id } });
  return true;
}