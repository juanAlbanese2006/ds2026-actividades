import express from "express";
import cors from "cors";
import libroRoutes from "./routes/libro.routes";
import autorRoutes from "./routes/autor.routes";
import authRoutes from "./routes/auth.routes";
import { errorHandler } from "./middlewares/error.middleware";

const app = express();

const corsOptions = {
  origin: [process.env.FRONTEND_URL ?? "http://localhost:5173"],
};
app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/libros", libroRoutes);
app.use("/api/autores", autorRoutes);

app.get("/", (req, res) => {
  res.json({ mensaje: "API de la Librería 🚀" });
});

// 404 en JSON
app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

// ErrorHandler al final
app.use(errorHandler);

export default app;