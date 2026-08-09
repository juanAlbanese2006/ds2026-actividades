import { Request, Response } from "express";
import * as autorService from "../services/autor.service";

// GET /api/autores
export function getAll(req: Request, res: Response) {
  const autores = autorService.findAll();
  res.json(autores);
}

// GET /api/autores/:id
export function getById(req: Request, res: Response) {
  const id = Number(req.params.id);
  const autor = autorService.findById(id);

  if (!autor) {
    return res.status(404).json({ error: "Autor no encontrado" });
  }

  res.json(autor);
}

// POST /api/autores
export function create(req: Request, res: Response) {
  const nuevo = autorService.create(req.body);
  res.status(201).json(nuevo);
}

// PUT /api/autores/:id
export function update(req: Request, res: Response) {
  const id = Number(req.params.id);
  const actualizado = autorService.update(id, req.body);

  if (!actualizado) {
    return res.status(404).json({ error: "Autor no encontrado" });
  }

  res.json(actualizado);
}

// DELETE /api/autores/:id
export function remove(req: Request, res: Response) {
  const id = Number(req.params.id);
  const eliminado = autorService.remove(id);

  if (!eliminado) {
    return res.status(404).json({ error: "Autor no encontrado" });
  }

  res.status(204).send();
}