import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env";

type PayloadToken = {
  id: number;
  rol: "ADMIN" | "CLIENTE";
  iat: number;
  exp: number;
};

// AUTENTICAR: ¿Quién sos?
export function authenticate(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Falta el token" });
  }

  const token = authHeader.slice(7);

  try {
    const payload = jwt.verify(token, JWT_SECRET) as PayloadToken;
    req.usuario = { id: payload.id, rol: payload.rol };
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ error: "Token expirado" });
    }
    return res.status(401).json({ error: "Token inválido" });
  }
}

// AUTORIZAR: ¿Qué podés hacer?
export function authorize(...roles: Array<"ADMIN" | "CLIENTE">) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.usuario) {
      return res.status(401).json({ error: "No autenticado" });
    }

    if (!roles.includes(req.usuario.rol)) {
      return res.status(403).json({ error: "No tenés permiso para esta operación" });
    }

    next();
  };
}