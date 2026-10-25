// ⚠️ ESTE ARCHIVO NECESITA DB: docker compose up -d db
import { describe, it, expect, afterAll } from "vitest";
import request from "supertest";
import app from "../app";
import { prisma } from "../config/prisma";

afterAll(async () => {
  await prisma.$disconnect();
});

describe("POST /api/auth/login (necesita DB)", () => {
  it("credenciales del seed → 200 con token, sin passwordHash", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "cliente@libreria.test",
      password: "Cliente1234",
    });
    expect(res.status).toBe(200);
    expect(res.body.token).toEqual(expect.any(String));
    expect(res.body.usuario).toMatchObject({
      email: "cliente@libreria.test",
      rol: "CLIENTE",
    });
    expect(res.body.usuario).not.toHaveProperty("passwordHash");
  });

  it("mail que no existe → mismo 401 genérico", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "nadie@libreria.test",
      password: "Cliente1234",
    });
    expect(res.status).toBe(401);
    expect(res.body).toEqual({ error: "Credenciales inválidas" });
  });
});