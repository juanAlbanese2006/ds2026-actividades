import express from "express";
import libroRoutes from "./routes/libro.routes";
import autorRoutes from "./routes/autor.routes";
import { errorHandler } from "./middlewares/error.middleware";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/libros", libroRoutes);
app.use("/api/autores", autorRoutes);

// Health check
app.get("/", (req, res) => {
  res.json({ mensaje: "API de la Librería 🚀" });
});

// ⚠️ EL ERRORHANDLER VA AL FINAL, DESPUÉS DE TODAS LAS RUTAS
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});