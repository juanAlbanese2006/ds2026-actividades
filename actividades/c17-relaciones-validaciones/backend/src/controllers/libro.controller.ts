import { Request, Response } from "express";
import * as libroService from "../services/libro.service";

export async function getAll(req: Request, res: Response) {
  const disponible = req.query.disponible as string | undefined;
  const libros = await libroService.findAll(disponible);
  res.json(libros);
}

export async function getById(req: Request, res: Response) {
  const id = Number(req.params.id);
  const libro = await libroService.findById(id);
  if (!libro) {
    return res.status(404).json({ error: "Libro no encontrado" });
  }
  res.json(libro);
}

export async function create(req: Request, res: Response) {
  const nuevo = await libroService.create(req.body);
  res.status(201).json(nuevo);
}

export async function update(req: Request, res: Response) {
  const id = Number(req.params.id);
  const actualizado = await libroService.update(id, req.body);
  if (!actualizado) {
    return res.status(404).json({ error: "Libro no encontrado" });
  }
  res.json(actualizado);
}

export async function remove(req: Request, res: Response) {
  const id = Number(req.params.id);
  const eliminado = await libroService.remove(id);
  if (!eliminado) {
    return res.status(404).json({ error: "Libro no encontrado" });
  }
  res.status(204).send();
}