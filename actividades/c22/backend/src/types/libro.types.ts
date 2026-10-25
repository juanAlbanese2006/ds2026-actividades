import type { Libro } from "../generated/prisma/client";
export type { Libro };
export type LibroSinId = Omit<Libro, "id">;