import express from "express";
import libroRoutes from "./routes/libro.routes";
import autorRoutes from "./routes/autor.routes";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON (¡IMPORTANTE!)
app.use(express.json());

// Montar las rutas
app.use("/api/libros", libroRoutes);
app.use("/api/autores", autorRoutes);

// Health check
app.get("/", (req, res) => {
  res.json({ mensaje: "API de la Librería 🚀" });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});