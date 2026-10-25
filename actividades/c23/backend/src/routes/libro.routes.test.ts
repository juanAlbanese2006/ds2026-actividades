import { describe, it, expect } from "vitest";
import request from "supertest";
import jwt from "jsonwebtoken";
import app from "../app";
import { JWT_SECRET } from "../config/env";

const tokenCliente = jwt.sign(
  { id: 2, rol: "CLIENTE" },
  JWT_SECRET,
  { expiresIn: "1h" }
);
const tokenAdmin = jwt.sign(
  { id: 1, rol: "ADMIN" },
  JWT_SECRET,
  { expiresIn: "1h" }
);

describe("POST /api/libros (sin DB)", () => {
  it("sin token → 401", async () => {
    const res = await request(app)
      .post("/api/libros")
      .send({ titulo: "Rayuela", precio: 7000, imagen: "x", autorId: 1 });
    expect(res.status).toBe(401);
  });

  it("con token de CLIENTE → 403", async () => {
    const res = await request(app)
      .post("/api/libros")
      .set("Authorization", `Bearer ${tokenCliente}`)
      .send({ titulo: "Rayuela", precio: 7000, imagen: "x", autorId: 1 });
    expect(res.status).toBe(403);
  });

  it("ADMIN con body inválido → 400 (no 403)", async () => {
    const res = await request(app)
      .post("/api/libros")
      .set("Authorization", `Bearer ${tokenAdmin}`)
      .send({ precio: -5 });
    expect(res.status).toBe(400);
  });

  it("token adulterado → 401", async () => {
    const res = await request(app)
      .post("/api/libros")
      .set("Authorization", "Bearer token-adulterado")
      .send({ titulo: "X", precio: 100, imagen: "x", autorId: 1 });
    expect(res.status).toBe(401);
  });

  it("DELETE /api/libros/1 con CLIENTE → 403", async () => {
    const res = await request(app)
      .delete("/api/libros/1")
      .set("Authorization", `Bearer ${tokenCliente}`);
    expect(res.status).toBe(403);
  });

  it("GET /api/no-existe → 404", async () => {
    const res = await request(app).get("/api/no-existe");
    expect(res.status).toBe(404);
    expect(res.body).toEqual({ error: "Ruta no encontrada" });
  });
});