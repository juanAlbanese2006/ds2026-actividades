export type { Libro } from "../generated/prisma/client";
export type LibroSinId = Omit<Libro, "id">;