import { z } from "zod";

// Schema para CREAR un libro
export const libroCreateSchema = z.object({
  titulo: z.string().trim().min(1, "El título es obligatorio").max(200),
  precio: z.number().int().positive("El precio debe ser mayor a 0"),
  imagen: z.string().min(1, "La imagen es obligatoria"),
  disponible: z.boolean().optional(),
  autorId: z.number().int().positive("El autor es obligatorio"),
});

// Schema para ACTUALIZAR (todos los campos opcionales)
export const libroUpdateSchema = libroCreateSchema.partial();

// Schema para validar PARAMS (id en la URL)
export const idParamSchema = z.object({
  id: z.coerce.number().int().positive("El id debe ser un número positivo"),
});

// Tipos inferidos
export type LibroCreate = z.infer<typeof libroCreateSchema>;
export type LibroUpdate = z.infer<typeof libroUpdateSchema>;