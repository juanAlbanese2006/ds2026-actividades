import type { Autor } from "../generated/prisma/client";
export type { Autor };
export type AutorSinId = Omit<Autor, "id">;