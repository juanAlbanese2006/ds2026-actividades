import { Request, Response } from "express";
import * as libroService from "../services/libro.service";

// GET /api/libros
export function getAll(req: Request, res: Response) {
  const disponible = req.query.disponible as string | undefined;
  const libros = libroService.findAll(disponible);
  res.json(libros);
}

// GET /api/libros/:id
export function getById(req: Request, res: Response) {
  const id = Number(req.params.id);
  const libro = libroService.findById(id);

  if (!libro) {
    return res.status(404).json({ error: "Libro no encontrado" });
  }

  res.json(libro);
}

// POST /api/libros
export function create(req: Request, res: Response) {
  // TODO: validar datos (C17)
  const nuevo = libroService.create(req.body);
  res.status(201).json(nuevo);
}

// PUT /api/libros/:id
export function update(req: Request, res: Response) {
  const id = Number(req.params.id);
  const actualizado = libroService.update(id, req.body);

  if (!actualizado) {
    return res.status(404).json({ error: "Libro no encontrado" });
  }

  res.json(actualizado);
}

// DELETE /api/libros/:id
export function remove(req: Request, res: Response) {
  const id = Number(req.params.id);
  const eliminado = libroService.remove(id);

  if (!eliminado) {
    return res.status(404).json({ error: "Libro no encontrado" });
  }

  res.status(204).send(); // 204 = sin contenido
}