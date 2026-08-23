import { prisma } from "../src/config/prisma.ts";

const libros = [
  {
    titulo: "El principito",
    autor: "Antoine de Saint-Exupéry",
    precio: 4500,
    imagen: "https://images.cdn3.buscalibre.com/fit-in/300x300/el-principito.jpg",
    disponible: true,
  },
  {
    titulo: "Cien años de soledad",
    autor: "Gabriel García Márquez",
    precio: 5200,
    imagen: "https://images.cdn3.buscalibre.com/fit-in/300x300/cien-anios.jpg",
    disponible: true,
  },
  {
    titulo: "1984",
    autor: "George Orwell",
    precio: 3800,
    imagen: "https://images.cdn3.buscalibre.com/fit-in/300x300/1984.jpg",
    disponible: false,
  },
  {
    titulo: "Rayuela",
    autor: "Julio Cortázar",
    precio: 7000,
    imagen: "https://images.cdn3.buscalibre.com/fit-in/300x300/rayuela.jpg",
    disponible: true,
  },
  {
    titulo: "El amor en los tiempos del cólera",
    autor: "Gabriel García Márquez",
    precio: 4800,
    imagen: "https://images.cdn3.buscalibre.com/fit-in/300x300/amor-colera.jpg",
    disponible: true,
  },
];

const autores = [
  { nombre: "Antoine de Saint-Exupéry", nacionalidad: "Francia" },
  { nombre: "Gabriel García Márquez", nacionalidad: "Colombia" },
  { nombre: "George Orwell", nacionalidad: "Reino Unido" },
  { nombre: "Julio Cortázar", nacionalidad: "Argentina" },
];

async function main() {
  console.log("🌱 Sembrando datos...");
  
  // Limpiar datos existentes
  await prisma.libro.deleteMany();
  await prisma.autor.deleteMany();
  
  // Insertar datos
  await prisma.libro.createMany({ data: libros });
  await prisma.autor.createMany({ data: autores });
  
  console.log("✅ Datos sembrados correctamente!");
}

main()
  .catch((e) => {
    console.error("❌ Error en el seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });