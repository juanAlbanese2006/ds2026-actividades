interface Libro {
  isbn: string;
  titulo: string;
  autor: string;
  precio: number;
  disponible: boolean;
  genero?: string;
}

let catalogo: Libro[] = [];

function renderizar(libros: Libro[]): void {
  const listado = document.getElementById("listado") as HTMLUListElement;
  const stats = document.getElementById("stats") as HTMLParagraphElement;

  listado.innerHTML = "";
  libros.forEach(libro => {
    const li = document.createElement("li");
    li.textContent = `${libro.titulo} - ${libro.autor} (${libro.precio} ARS) ${libro.disponible ? "✔️" : "❌"}`;

    const btnEliminar = document.createElement("button");
    btnEliminar.textContent = "Eliminar";
    btnEliminar.addEventListener("click", () => eliminarLibro(libro.isbn));
    li.appendChild(btnEliminar);

    listado.appendChild(li);
  });

  const promedio = precioPromedio(libros);
  stats.textContent = `Cantidad: ${libros.length} | Precio promedio: ${promedio} `;
}

function precioPromedio(libros: Libro[]): number {
  if (libros.length === 0) return 0;
  return libros.reduce((acumulador, libro) => acumulador + libro.precio, 0) / libros.length;
}

function agregarLibro(libro: Libro): void {
  catalogo.push(libro);
  renderizar(catalogo);
}

function eliminarLibro(isbn: string): void {
  catalogo = catalogo.filter(libro => libro.isbn !== isbn);
  renderizar(catalogo);
}

function validarFormulario(): Libro | null {
  const titulo = (document.getElementById("titulo") as HTMLInputElement).value.trim();
  const autor = (document.getElementById("autor") as HTMLInputElement).value.trim();
  const precio = parseFloat((document.getElementById("precio") as HTMLInputElement).value);
  const disponible = (document.getElementById("disponible") as HTMLInputElement).checked;
  const genero = (document.getElementById("genero") as HTMLInputElement).value.trim();

  const errorDiv = document.getElementById("errorForm") as HTMLDivElement;
  errorDiv.textContent = "";

  if (!titulo || !autor || isNaN(precio) || precio <= 0) {
    errorDiv.textContent = "Todos los campos son obligatorios y el precio debe ser mayor a 0.";
    return null;
  }

  const nuevoLibro: Libro = {
    isbn: "AUTO-" ,
    titulo,
    autor,
    precio,
    disponible,
    genero,
  };

  return nuevoLibro;
}

// Handler del formulario
document.getElementById("formLibro")?.addEventListener("submit", (e) => {
  e.preventDefault();
  const libro = validarFormulario();
  if (libro) {
    agregarLibro(libro);
    (document.getElementById("formLibro") as HTMLFormElement).reset();
  }
});

// Mostrar inicial
renderizar(catalogo);
