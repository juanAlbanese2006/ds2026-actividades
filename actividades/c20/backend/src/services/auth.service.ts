import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../config/prisma";
import { JWT_SECRET, JWT_EXPIRES_IN, SALT_ROUNDS } from "../config/env";
import { RegistroInput, LoginInput } from "../validations/auth.validation";

// Quita el passwordHash del tipo Usuario
type UsuarioPublico = {
  id: number;
  email: string;
  nombre: string;
  rol: "ADMIN" | "CLIENTE";
};

// REGISTRO
export async function registrar(datos: RegistroInput): Promise<UsuarioPublico> {
  const hash = await bcrypt.hash(datos.password, SALT_ROUNDS);

  const usuario = await prisma.usuario.create({
    data: {
      email: datos.email,
      nombre: datos.nombre,
      passwordHash: hash,
    },
    // ⚠️ omit global ya esconde passwordHash, pero lo explicitamos
    select: {
      id: true,
      email: true,
      nombre: true,
      rol: true,
    },
  });

  return usuario;
}

// LOGIN
export async function login(datos: LoginInput): Promise<{
  token: string;
  usuario: UsuarioPublico;
} | null> {
  // Buscar usuario (explicitamente pedimos passwordHash)
  const usuario = await prisma.usuario.findUnique({
    where: { email: datos.email },
    // ⚠️ Necesitamos el hash para comparar
    omit: { passwordHash: false },
  });

  // Usuario no existe → mensaje genérico
  if (!usuario) return null;

  // Verificar contraseña
  const coincide = await bcrypt.compare(datos.password, usuario.passwordHash);
  if (!coincide) return null;

  // Generar token
  const payload = { id: usuario.id, rol: usuario.rol };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

  return {
    token,
    usuario: {
      id: usuario.id,
      email: usuario.email,
      nombre: usuario.nombre,
      rol: usuario.rol as "ADMIN" | "CLIENTE",
    },
  };
}