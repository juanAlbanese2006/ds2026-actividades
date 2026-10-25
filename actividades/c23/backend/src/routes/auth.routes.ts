import { Router } from "express";
import * as authController from "../controllers/auth.controller";
import { validate } from "../middlewares/validate.middleware";
import { authenticate } from "../middlewares/auth.middleware";
import { registroSchema, loginSchema } from "../validations/auth.validation";

const router = Router();

// Rutas públicas
router.post("/registro", validate(registroSchema), authController.registrar);
router.post("/login", validate(loginSchema), authController.login);

// Ruta protegida (necesita token)
router.get("/yo", authenticate, authController.yo);

export default router;