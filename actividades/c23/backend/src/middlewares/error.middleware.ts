import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { Prisma } from "../generated/prisma/client";

export const errorHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  // Error de Zod (validación falló)
  if (err instanceof ZodError) {
    return res.status(400).json({
      error: "Datos inválidos",
      detalles: err.issues.map((i) => ({
        campo: i.path.join("."),
        mensaje: i.message,
      })),
    });
  }

  // Error conocido de Prisma
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    // P2002: Violación de @unique (ej: autor duplicado)
    if (err.code === "P2002") {
      return res.status(409).json({
        error: "Ya existe un registro con ese valor",
      });
    }

    // P2025: Registro no encontrado
    if (err.code === "P2025") {
      return res.status(404).json({
        error: "No encontrado",
      });
    }

    // P2003: Violación de FK (autorId inexistente o hijos)
    if (err.code === "P2003") {
      return res.status(409).json({
        error: "Hay registros relacionados",
      });
    }
  }

  // Error desconocido (500)
  console.error("Error no manejado:", err);
  return res.status(500).json({
    error: "Error interno del servidor",
  });
};