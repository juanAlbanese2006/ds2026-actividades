import express from "express";

const app = express();
const PORT = 3000;

// 1. Definí la interfaz de tu libro (¡igual que en el frontend!)
interface Libro {
  id:number
  title: string;
  author: string;
  precio: number;
  disponible?: boolean;
}

// 2. Hardcodeá tus libros (copia los que usabas en el frontend)
const libros: Libro[] = [
  {
    id: 1,
    title: "El principito",
    author: "Antoine de Saint-Exupéry",
    precio: 4500,
    disponible: true
  },
  {
    id: 2,
    title: "Cien años de soledad",
    author: "Gabriel García Márquez",
    precio: 5200,
    disponible: true
  },
  {
    id: 3,
    title: "1984",
    author: "George Orwell",
    precio: 3800,
    disponible: false
  }
  // Agregá más libros si querés
];

// 3. Endpoint de prueba (hello)
app.get("/", (req, res) => {
  res.json({ mensaje: "API de la Librería 🚀" });
});

// 4. ¡TU ENDPOINT PRINCIPAL! GET /libros
app.get("/libros", (req, res) => {
  res.json(libros);
});

// 5. Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});