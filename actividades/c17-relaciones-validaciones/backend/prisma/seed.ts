import { prisma } from "../src/config/prisma";

const autores = [
  { nombre: "Antoine de Saint-Exupéry", nacionalidad: "Francia" },
  { nombre: "Gabriel García Márquez", nacionalidad: "Colombia" },
  { nombre: "George Orwell", nacionalidad: "Reino Unido" },
  { nombre: "Julio Cortázar", nacionalidad: "Argentina" },
  { nombre: "Jorge Luis Borges", nacionalidad: "Argentina" },
];

const categorias = [
  { nombre: "Novela" },
  { nombre: "Ensayo" },
  { nombre: "Ficción" },
  { nombre: "Clásico" },
  { nombre: "Ciencia Ficción" },
];

const libros = [
  {
    titulo: "El principito",
    precio: 4500,
    imagen: "https://images.cdn3.buscalibre.com/fit-in/300x300/el-principito.jpg",
    disponible: true,
    autorNombre: "Antoine de Saint-Exupéry",
    categoriasNombres: ["Novela", "Ficción", "Clásico"],
  },
  {
    titulo: "Cien años de soledad",
    precio: 5200,
    imagen: "https://images.cdn3.buscalibre.com/fit-in/300x300/cien-anios.jpg",
    disponible: true,
    autorNombre: "Gabriel García Márquez",
    categoriasNombres: ["Novela", "Clásico"],
  },
  {
    titulo: "1984",
    precio: 3800,
    imagen: "https://images.cdn3.buscalibre.com/fit-in/300x300/1984.jpg",
    disponible: false,
    autorNombre: "George Orwell",
    categoriasNombres: ["Novela", "Ciencia Ficción", "Clásico"],
  },
  {
    titulo: "Rayuela",
    precio: 7000,
    imagen: "https://images.cdn3.buscalibre.com/fit-in/300x300/rayuela.jpg",
    disponible: true,
    autorNombre: "Julio Cortázar",
    categoriasNombres: ["Novela", "Ensayo"],
  },
  {
    titulo: "Ficciones",
    precio: 6500,
    imagen: "https://images.cdn3.buscalibre.com/fit-in/300x300/ficciones.jpg",
    disponible: true,
    autorNombre: "Jorge Luis Borges",
    categoriasNombres: ["Ficción", "Ensayo", "Clásico"],
  },
];

async function main() {
  console.log("🌱 Sembrando datos...");

  // 1. LIMPIAR TODO (respetando el orden por las FK)
  console.log("🧹 Limpiando datos existentes...");
  await prisma.libro.deleteMany();
  await prisma.categoria.deleteMany();
  await prisma.autor.deleteMany();

  // 2. CREAR AUTORES
  console.log("📝 Creando autores...");
  await prisma.autor.createMany({ data: autores });

  // 3. CREAR CATEGORÍAS
  console.log("📝 Creando categorías...");
  await prisma.categoria.createMany({ data: categorias });

  // 4. CREAR LIBROS (UNO POR UNO, con connect)
  console.log("📝 Creando libros...");
  for (const libro of libros) {
    await prisma.libro.create({
      data: {
        titulo: libro.titulo,
        precio: libro.precio,
        imagen: libro.imagen,
        disponible: libro.disponible,
        autor: {
          connect: { nombre: libro.autorNombre },
        },
        categorias: {
          connect: libro.categoriasNombres.map((nombre) => ({ nombre })),
        },
      },
    });
  }

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