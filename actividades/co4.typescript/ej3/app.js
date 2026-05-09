"use strict";
let catalogo = [];
function renderizar(libros) {
    const listado = document.getElementById("listado");
    const stats = document.getElementById("stats");
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
function precioPromedio(libros) {
    if (libros.length === 0)
        return 0;
    return libros.reduce((acumulador, libro) => acumulador + libro.precio, 0) / libros.length;
}
function agregarLibro(libro) {
    catalogo.push(libro);
    renderizar(catalogo);
}
function eliminarLibro(isbn) {
    catalogo = catalogo.filter(libro => libro.isbn !== isbn);
    renderizar(catalogo);
}
function validarFormulario() {
    const titulo = document.getElementById("titulo").value.trim();
    const autor = document.getElementById("autor").value.trim();
    const precio = parseFloat(document.getElementById("precio").value);
    const disponible = document.getElementById("disponible").checked;
    const genero = document.getElementById("genero").value.trim();
    const errorDiv = document.getElementById("errorForm");
    errorDiv.textContent = "";
    if (!titulo || !autor || isNaN(precio) || precio <= 0) {
        errorDiv.textContent = "Todos los campos son obligatorios y el precio debe ser mayor a 0.";
        return null;
    }
    const nuevoLibro = {
        isbn: "AUTO-",
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
        document.getElementById("formLibro").reset();
    }
});
// Mostrar inicial
renderizar(catalogo);
